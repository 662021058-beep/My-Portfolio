<?php

namespace App\Http\Controllers;

use App\Models\PharmacyKnowledgeBase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PharmacyChatController extends Controller
{
    public function index()
    {
        return view('liff.chat');
    }

    public function getAnswer(Request $request)
    {
        $message = $request->query('q') ?? $request->input('message');
        if (!$message) {
            return response()->json(['answer' => '👋 สวัสดีครับ มีอาการไม่สบายตรงไหน หรือต้องการปรึกษาเรื่องยา สอบถามเภสัชกรได้เลยครับ']);
        }

        // --- 1. ตรวจจับกรณีฉุกเฉิน (ปรับโทนให้ดูจริงจังและเร่งด่วน) ---
        $emergencyKeywords = ['แน่นหน้าอก', 'หายใจไม่ออก', 'ปากเบี้ยว', 'แขนขาอ่อนแรง', 'โดนงูกัด', 'กินยาตาย', 'หมดสติ'];
        $foundEmergency = [];
        foreach ($emergencyKeywords as $em) {
            if (mb_stripos($message, $em) !== false) {
                $foundEmergency[] = $em;
            }
        }

        if (!empty($foundEmergency)) {
            $emText = implode(' และ ', $foundEmergency);
            return response()->json([
                'answer' => "🚨 **ประกาศภาวะฉุกเฉินทางการแพทย์!**\n" .
                            "──────────────────\n" .
                            "พบอาการวิกฤต: **$emText**\n\n" .
                            "⚠️ **คำแนะนำเร่งด่วน:**\n" .
                            "1. หยุดกิจกรรมทุกอย่างและนั่งพักในที่อากาศถ่ายเท\n" .
                            "2. **รีบโทรสายด่วน 1669** ทันที\n" .
                            "3. แจ้งพิกัดและอาการให้เจ้าหน้าที่ทราบชัดเจน\n\n" .
                            "*ความปลอดภัยของคุณสำคัญที่สุด โปรดดำเนินการทันทีครับ*"
            ]);
        }

        // --- 2. จัดการคีย์เวิร์ดพิเศษ ---
        if (preg_match('/(หมวดหมู่ยา|ประเภทยา)/u', $message)) {
            return response()->json(['answer' => $this->getCategoryText()]);
        }

        if (mb_stripos($message, 'ยาสามัญ') !== false) {
            return response()->json(['answer' => $this->getHomeRemedyText()]);
        }

        // --- 3. เตรียมข้อมูลจาก Database ---
        $greetings = ['สวัสดี', 'หวัดดี', 'ดีจ้า', 'hello', 'hi', 'สอบถามหน่อย', 'ปรึกษาหน่อย'];
        $actionWords = ['แนะนำยา', 'แนะนำ', 'ขอวิธี', 'รบกวน', 'สอบถาม', 'คืออะไร', 'กินยังไง', 'ยาแก้', 'มียา', 'ช่วยหน่อย', 'บอกหน่อย', 'ตัวไหนดี', 'สรุป'];

        $allData = PharmacyKnowledgeBase::all();
        $masterKeywords = [];

        foreach ($allData as $data) {
            $kws = explode(',', $data->user_questions);
            foreach ($kws as $kw) {
                $kw = trim($kw);
                if ($kw !== '') {
                    $masterKeywords[] = [
                        'keyword' => $kw,
                        'answer'  => $data->pharmacy_answer,
                        'length'  => mb_strlen($kw)
                    ];
                }
            }
        }

        usort($masterKeywords, fn($a, $b) => $b['length'] <=> $a['length']);

        $foundAnswers = [];
        $foundSymptoms = [];
        $tempMessage = $message;

        // --- 4. ค้นหาคำตอบ ---
        foreach ($masterKeywords as $item) {
            $kw = $item['keyword'];
            if (mb_stripos($tempMessage, $kw) !== false) {
                $cleanAnswer = trim(preg_replace('/ID[0-9]+/i', '', $item['answer']));
                if (!in_array($cleanAnswer, $foundAnswers)) {
                    $foundAnswers[] = $cleanAnswer;
                }

                $lowerKw = mb_strtolower($kw);
                if (!in_array($lowerKw, $greetings) && !in_array($lowerKw, $actionWords) && mb_strlen($lowerKw) > 1) {
                    if (!in_array($kw, $foundSymptoms)) {
                        $foundSymptoms[] = $kw;
                    }
                }
                $tempMessage = preg_replace('/' . preg_quote($kw, '/') . '/iu', str_repeat(' ', mb_strlen($kw)), $tempMessage);
            }
        }

        // --- 5. สรุปผลการตอบกลับ (Professional Layout) ---
        if (!empty($foundAnswers)) {
            if (empty($foundSymptoms)) {
                return response()->json(['answer' => "👋 " . $foundAnswers[0]]);
            }

            $symptomsText = implode(' และ ', $foundSymptoms);
            
            // หัวข้อคำตอบ
            $response = "👨‍⚕️ **ผลการวิเคราะห์อาการเบื้องต้น**\n";
            $response .= "──────────────────\n";
            $response .= "📍 อาการที่พบ: **$symptomsText**\n\n";
            $response .= "📋 **คำแนะนำจากเภสัชกร:**\n";

            if (count($foundAnswers) > 1) {
                foreach ($foundAnswers as $index => $ans) {
                    $response .= "• " . $ans . "\n";
                }
            } else {
                $response .= $foundAnswers[0] . "\n";
            }

            $response .= "\n⚠️ **ข้อควรระวัง:**\n";
            $response .= "- หากอาการไม่ดีขึ้นภายใน 2-3 วัน แนะนำให้พบแพทย์\n";
            $response .= "- หากมีอาการแพ้ยา เช่น ผื่นคัน บวม หายใจลำบาก ให้หยุดยาและรีบไปโรงพยาบาลทันทีครับ";

            return response()->json(['answer' => $response]);
        }

        // --- 6. กรณีไม่พบคำตอบ ---
        $this->logUnknownQuestion($message);
        return response()->json([
            'answer' => "🔍 **ขออภัยครับ เภสัชกรยังไม่พบข้อมูลส่วนนี้**\n" .
                        "──────────────────\n" .
                        "เพื่อให้ได้ข้อมูลที่แม่นยำที่สุด รบกวนคุณลูกค้าลองพิมพ์ระบุอาการสั้นๆ เช่น:\n" .
                        "• *'ปวดหัวข้างเดียว'*\n" .
                        "• *'เจ็บคอ มีเสมหะ'*\n" .
                        "• *'ท้องเสีย ยาแก้แพ้'*\n\n" .
                        "หรือแจ้งอาการเพิ่มเติมเพื่อให้ผมช่วยตรวจสอบได้ครับ 🏥"
        ]);
    }

    private function getCategoryText()
    {
        return "💊 **คลังข้อมูลยาและเวชภัณฑ์พื้นฐาน**\n" .
            "──────────────────\n" .
            "1️⃣ **กลุ่มแก้ปวด-ลดไข้**\n   • พาราเซตามอล, ยาคลายกล้ามเนื้อ\n\n" .
            "2️⃣ **กลุ่มทางเดินหายใจ**\n   • ยาแก้แพ้, ยาลดน้ำมูก, ยาแก้ไอ\n\n" .
            "3️⃣ **กลุ่มทางเดินอาหาร**\n   • ยาธาตุน้ำขาว/แดง, ยาลดกรด, ORS\n\n" .
            "4️⃣ **กลุ่มยาใช้ภายนอก**\n   • แอลกอฮอล์, ยาทาแผล, ยาทาเชื้อรา\n\n" .
            "💡 *ท่านสามารถพิมพ์ชื่อกลุ่มยา เพื่อดูรายละเอียดการใช้ยาได้ครับ*";
    }

    private function getHomeRemedyText()
    {
        return "📦 **ยาสามัญประจำบ้านที่ควรมีติดไว้**\n" .
            "──────────────────\n" .
            "✅ **ลดไข้:** พาราเซตามอล\n" .
            "✅ **แก้แพ้:** คลอเฟนิรามีน\n" .
            "✅ **ท้องอืด:** ยาธาตุน้ำแดง\n" .
            "✅ **แก้ไอ:** ยาแก้ไอน้ำดำ\n" .
            "✅ **ทำแผล:** แอลกอฮอล์, เบตาดีน\n\n" .
            "ต้องการทราบวิธีใช้ตัวไหนเป็นพิเศษ สอบถามได้เลยครับ ✨";
    }

    private function logUnknownQuestion($message)
    {
        try {
            DB::table('unmatched_questions_log')->insert([
                'unknown_question_text' => $message,
                'created_at' => now()
            ]);
        } catch (\Exception $e) {}
    }
}