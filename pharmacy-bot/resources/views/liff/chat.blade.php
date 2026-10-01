<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <title>บริการถาม-ตอบร้านยา</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
    <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400;500;600&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --primary: #2563eb;
            --primary-bright: #60a5fa;
            --text-dark: #0f172a;
            --text-dim: #64748b;
            --glass-white: rgba(255, 255, 255, 0.35); 
            --body-bg: #f8fafc;
            --msg-bot-bg: rgba(255, 255, 255, 0.8);
            --blur: 25px;
            --card-border: rgba(255, 255, 255, 0.6);
            --dropdown-bg: rgba(255, 255, 255, 0.4);
        }

        body.dark-mode {
            --primary: #3b82f6;
            --primary-bright: #93c5fd;
            --text-dark: #f1f5f9;
            --text-dim: #94a3b8;
            --glass-white: rgba(15, 23, 42, 0.35);
            --body-bg: #020617;
            --msg-bot-bg: rgba(30, 41, 59, 0.8);
            --card-border: rgba(255, 255, 255, 0.08);
            --dropdown-bg: rgba(15, 23, 42, 0.5);
        }

        * {
            box-sizing: border-box;
            font-family: 'Kanit', sans-serif;
            -webkit-tap-highlight-color: transparent;
        }

        /* คืนค่า Body ให้ยืดหยุ่น เพื่อให้คีย์บอร์ดดันขึ้นได้ปกติ */
        html, body {
            margin: 0; padding: 0;
            width: 100%; height: 100%;
            overflow: hidden; /* ล็อกการไถหน้าจอหลัก */
        }

        body {
            display: flex; flex-direction: column;
            background: var(--body-bg);
            background-image: 
                radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.12) 0px, transparent 50%),
                radial-gradient(at 100% 0%, rgba(96, 165, 250, 0.18) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(37, 99, 235, 0.08) 0px, transparent 50%);
            color: var(--text-dark);
            transition: 0.4s ease;
        }

        /* --- Header --- */
        .header {
            padding: calc(15px + env(safe-area-inset-top)) 24px 15px;
            background: var(--glass-white);
            backdrop-filter: blur(var(--blur));
            -webkit-backdrop-filter: blur(var(--blur));
            display: flex; align-items: center; justify-content: space-between;
            border-bottom: 1px solid var(--card-border);
            z-index: 100;
            flex-shrink: 0;
        }

        .header-title {
            display: flex; align-items: center; gap: 12px;
            font-weight: 600; font-size: 1.15rem; color: var(--primary);
        }

        .header-actions {
            display: flex; gap: 10px; position: relative;
        }

        .glass-btn {
            background: var(--glass-white);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            height: 42px;
            padding: 0 14px;
            border-radius: 14px;
            display: flex; align-items: center; gap: 8px;
            cursor: pointer;
            border: 1px solid var(--card-border);
            box-shadow: 0 4px 12px rgba(0,0,0,0.05), inset 0 0 15px rgba(255,255,255,0.15);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            color: var(--text-dark);
        }
        
        .glass-btn span { font-size: 0.85rem; font-weight: 500; }
        .glass-btn:active { transform: scale(0.92) translateY(1px); }

        .theme-dropdown {
            position: absolute; top: calc(100% + 12px); right: 0;
            background: var(--dropdown-bg);
            backdrop-filter: blur(35px); -webkit-backdrop-filter: blur(35px);
            border: 1px solid var(--card-border);
            border-radius: 20px; min-width: 155px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.12);
            display: none; flex-direction: column; padding: 8px;
            z-index: 1000; animation: glassReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes glassReveal {
            from { opacity: 0; transform: translateY(-8px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .theme-dropdown.show { display: flex; }

        .theme-option {
            padding: 10px 14px; border-radius: 12px;
            display: flex; align-items: center; gap: 12px;
            cursor: pointer; transition: 0.25s; font-size: 0.95rem;
            color: var(--text-dark);
        }

        .theme-option:hover { background: rgba(255, 255, 255, 0.25); }
        .theme-option.active { background: var(--primary); color: white; box-shadow: 0 5px 15px rgba(37, 99, 235, 0.2); }

        /* --- Chat Area --- */
        .chat-container {
            flex: 1; 
            padding: 25px 20px; 
            overflow-y: auto;
            display: flex; flex-direction: column; gap: 24px;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
        }
        .chat-container::-webkit-scrollbar { width: 0px; }

        .msg {
            max-width: 85%; padding: 16px 22px; border-radius: 28px;
            font-size: 1rem; line-height: 1.6; position: relative;
            animation: springIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            word-break: break-word;
        }

        @keyframes springIn {
            from { opacity: 0; transform: translateY(30px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .bot {
            align-self: flex-start; background: var(--msg-bot-bg);
            backdrop-filter: blur(10px); border: 1px solid var(--card-border);
            color: var(--text-dark); border-bottom-left-radius: 6px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
        }

        .user {
            align-self: flex-end;
            background: linear-gradient(135deg, var(--primary) 0%, #1d4ed8 100%);
            color: white; border-bottom-right-radius: 6px;
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25);
        }

        .msg-time { font-size: 0.68rem; margin-top: 10px; opacity: 0.5; font-weight: 300; }

        /* --- Quick Replies --- */
        .quick-replies-wrapper { padding: 10px 0; flex-shrink: 0; }
        .quick-btn-container {
            display: flex; gap: 12px; overflow-x: auto; padding: 5px 24px;
            scrollbar-width: none;
        }
        .quick-btn-container::-webkit-scrollbar { display: none; }

        .quick-btn {
            background: var(--glass-white); backdrop-filter: blur(10px);
            border: 1px solid var(--card-border); color: var(--text-dark);
            padding: 12px 22px; border-radius: 50px; font-size: 0.9rem;
            white-space: nowrap; cursor: pointer; transition: 0.3s;
        }
        .quick-btn:hover { background: var(--primary); color: white; transform: translateY(-3px); }

        /* --- Input Bar --- */
        .input-wrapper { 
            padding: 10px 24px calc(20px + env(safe-area-inset-bottom)); 
            flex-shrink: 0;
            background: transparent;
        }
        .input-area {
            background: var(--glass-white); backdrop-filter: blur(var(--blur));
            -webkit-backdrop-filter: blur(var(--blur));
            border: 1px solid var(--card-border); border-radius: 24px;
            padding: 8px 10px 8px 24px; display: flex; align-items: center; gap: 14px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.05); transition: 0.4s;
        }
        .input-area:focus-within { background: var(--msg-bot-bg); }

        input { flex: 1; border: none; background: transparent; outline: none; font-size: 16px; color: var(--text-dark); }

        .send-btn {
            background: var(--primary); color: white; border: none;
            width: 48px; height: 48px; border-radius: 18px;
            cursor: pointer; display: flex; align-items: center; justify-content: center;
            box-shadow: 0 8px 16px rgba(37, 99, 235, 0.2);
        }

        /* --- Modal --- */
        .modal-backdrop {
            display: none; /* เราจะใช้ JS เปลี่ยนเป็น flex */
            position: fixed; inset: 0;
            background: rgba(15, 23, 42, 0); /* เริ่มต้นที่ใส */
            z-index: 1000;
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
            align-items: center; justify-content: center;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            pointer-events: none; /* กันการกดทับขณะปิด */
        }

        .modal-backdrop.show {
            display: flex;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            opacity: 1;
            pointer-events: auto;
        }
        .qr-modal {
            background: var(--msg-bot-bg); 
            padding: 40px 30px; 
            border-radius: 40px; 
            text-align: center;
            width: 85%; max-width: 360px; 
            border: 1px solid var(--card-border);
            box-shadow: 0 30px 70px rgba(0,0,0,0.2);
            
            /* Animation เริ่มต้น */
            transform: translateY(30px) scale(0.9);
            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .modal-backdrop.show .qr-modal {
            transform: translateY(0) scale(1);
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.4; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.1); }
        }
    </style>
</head>

<body onclick="closeDropdowns(event)">

<div class="header">
    <div class="header-title">
        <div style="width:40px; height:40px; background:white; border-radius:14px; display:grid; place-items:center; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">💎</div>
        <span>| บริการถาม-ตอบร้านยา</span>
    </div>
    <div class="header-actions">
        <div style="position: relative;">
            <div class="glass-btn" style="width: 42px; justify-content: center;" onclick="event.stopPropagation(); toggleThemeDropdown()">
                <span id="currentThemeIcon" style="font-size: 1.2rem;">🌙</span>
            </div>
            <div class="theme-dropdown" id="themeMenu">
                <div class="theme-option" id="opt-light" onclick="setTheme('light')">☀️ โหมดสว่าง</div>
                <div class="theme-option" id="opt-dark" onclick="setTheme('dark')">🌙 โหมดมืด</div>
                <div class="theme-option" id="opt-system" onclick="setTheme('system')">⚙️ โหมดระบบ</div>
            </div>
        </div>

        <div class="glass-btn" onclick="toggleQR(true)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>QR</span>
        </div>
    </div>
</div>

<div class="chat-container" id="chatBox"></div>

<div class="quick-replies-wrapper">
    <div class="quick-btn-container">
        <button class="quick-btn" onclick="quickAsk('หมวดหมู่ยา')">💊 หมวดหมู่ยาแนะนำ</button>
        <button class="quick-btn" onclick="quickAsk('ปวดหัว')">🩹 ปวดหัว</button>
        <button class="quick-btn" onclick="quickAsk('เจ็บคอ')">🤒 เจ็บคอ</button>
        <button class="quick-btn" onclick="quickAsk('ท้องเสีย')">🤢 ท้องเสีย</button>
        <button class="quick-btn" onclick="quickAsk('ยาสามัญประจำบ้าน')">📦 ยาสามัญ</button>
    </div>
</div>

<div class="input-wrapper">
    <div class="input-area">
        <input id="question" autocomplete="off" placeholder="สอบถามอาการเบื้องต้น..." onkeydown="if(event.key==='Enter') ask()">
        <button class="send-btn" onclick="ask()">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
    </div>
</div>

<div class="modal-backdrop" id="qrModal" onclick="toggleQR(false)">
    <div class="qr-modal" onclick="event.stopPropagation()">
        <h2 style="margin:0; font-weight: 600; color: var(--primary);">บริการผ่าน LINE</h2>
        <p style="color: var(--text-dim); margin: 12px 0 30px; font-size: 0.95rem;">สแกนเพื่อเข้าใช้งานบนมือถือ</p>
        <div style="background: #f1f5f9; padding: 25px; border-radius: 35px; border: 2px solid white;">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://liff.line.me/2009030442-wTayELWj" style="width:100%; border-radius:20px; mix-blend-mode: multiply;">
        </div>
        <div style="margin-top: 25px; color: var(--primary); font-weight: 500; cursor: pointer;" onclick="toggleQR(false)">ปิดหน้าต่าง</div>
    </div>
</div>

<script>
    const API_URL = 'https://sci-inno.in/IT/662021058/pharmacy-bot/public/get-answer';

    window.onload = () => {
        const savedTheme = localStorage.getItem('theme') || 'system';
        setTheme(savedTheme);
        appendMessage('**สวัสดีครับ ยินดีต้อนรับสู่บริการถาม-ตอบ ร้านยา** ✨\nยินดีให้คำปรึกษาเรื่องอาการป่วยและยาเบื้องต้นครับ ท่านสามารถถามอาการหรือประเภทของยาได้ทันทีครับ', 'bot');
        
        // แก้ไขปัญหาระดับสูง: คำนวณความสูงหน้าจอตามความสูงของคีย์บอร์ดจริง
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', () => {
                const height = window.visualViewport.height;
                document.body.style.height = height + 'px';
                window.scrollTo(0, 0);
                const chatBox = document.getElementById('chatBox');
                chatBox.scrollTop = chatBox.scrollHeight;
            });
        }
    };

    function toggleThemeDropdown() {
        document.getElementById('themeMenu').classList.toggle('show');
    }

    function closeDropdowns(e) {
        if (!e.target.closest('.header-actions')) {
            document.getElementById('themeMenu').classList.remove('show');
        }
    }

    function setTheme(mode) {
        const body = document.body;
        const icon = document.getElementById('currentThemeIcon');
        const options = document.querySelectorAll('.theme-option');
        
        options.forEach(opt => opt.classList.remove('active'));
        
        if (mode === 'dark') {
            body.classList.add('dark-mode');
            icon.innerText = '🌙';
            document.getElementById('opt-dark').classList.add('active');
        } else if (mode === 'light') {
            body.classList.remove('dark-mode');
            icon.innerText = '☀️';
            document.getElementById('opt-light').classList.add('active');
        } else {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            isDark ? body.classList.add('dark-mode') : body.classList.remove('dark-mode');
            icon.innerText = '⚙️';
            document.getElementById('opt-system').classList.add('active');
        }

        localStorage.setItem('theme', mode);
        document.getElementById('themeMenu').classList.remove('show');
    }

    async function ask() {
        const input = document.getElementById('question');
        const text = input.value.trim();
        if (!text) return;

        appendMessage(text, 'user');
        input.value = '';

        const chatBox = document.getElementById('chatBox');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'msg bot typing';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<div style="display:flex;gap:4px"><div class="dot" style="width:6px;height:6px;background:var(--primary);border-radius:50%;animation:pulse 1s infinite"></div><div class="dot" style="width:6px;height:6px;background:var(--primary);border-radius:50%;animation:pulse 1s infinite 0.2s"></div><div class="dot" style="width:6px;height:6px;background:var(--primary);border-radius:50%;animation:pulse 1s infinite 0.4s"></div></div>';
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            const res = await fetch(`${API_URL}?q=${encodeURIComponent(text)}`);
            const data = await res.json();
            setTimeout(() => {
                document.getElementById('typing-indicator')?.remove();
                appendMessage(data.answer || 'ขออภัยครับ ผมยังไม่พบข้อมูลส่วนนี้ แนะนำให้ปรึกษาเภสัชกรโดยตรงนะครับ', 'bot');
            }, 1000);
        } catch (err) {
            document.getElementById('typing-indicator')?.remove();
            appendMessage('🤖 ระบบขัดข้องชั่วคราว กรุณาลองใหมีกครั้งครับ', 'bot');
        }
    }

    function appendMessage(text, sender) {
        const chatBox = document.getElementById('chatBox');
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg ${sender}`;
        const timeStr = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        msgDiv.innerHTML = `<div>${formattedText}</div><span class="msg-time">${timeStr}</span>`;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
    }

    function quickAsk(text) { document.getElementById('question').value = text; ask(); }
    function toggleQR(show) {
        const modal = document.getElementById('qrModal');
        if (show) {
            modal.style.display = 'flex'; // สั่งให้ปรากฏก่อน
            setTimeout(() => {
                modal.classList.add('show'); // แล้วค่อยใส่ Class เพื่อให้เกิด Transition
            }, 10);
        } else {
            modal.classList.remove('show'); // สั่งจางหาย
            setTimeout(() => {
                modal.style.display = 'none'; // หายไปจริงหลังจาก Animation จบ
            }, 400); // เวลาเท่ากับ transition ใน CSS
        }
    }

    liff.init({ liffId: "2009030442-wTayELWj" }).catch(err => console.error(err));
</script>
</body>
</html>