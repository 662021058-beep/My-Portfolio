// Crops img/hero.png into web-ready assets in public/images.
import sharp from "sharp";

const src = "img/hero.png";

const { data } = await sharp(src).extract({ left: 20, top: 20, width: 40, height: 40 }).raw().toBuffer().then((buf) => ({ data: [...buf.subarray(0, 3)] }));
console.log("background rgb:", data.slice(0, 3).join(","));

await sharp(src)
  .extract({ left: 110, top: 150, width: 780, height: 791 })
  .resize({ width: 1100 })
  .webp({ quality: 85 })
  .toFile("public/images/hero-portrait.webp");

// รูปวงกลม (footer + Quick info) — ครอปจัตุรัสให้ใบหน้าอยู่กลางวงกลม
await sharp("img/person-04.jpeg")
  .extract({ left: 400, top: 430, width: 640, height: 640 })
  .resize(400, 400)
  .webp({ quality: 86 })
  .toFile("public/images/avatar.webp");

// ภาพแนวตั้ง 3:4 ในแถบภาพเลื่อนของหน้า About — ภาพเต็มตัวหน้ากำแพงสีฟ้า
await sharp("img/person-02.jpg")
  .extract({ left: 140, top: 300, width: 1215, height: 1620 })
  .resize({ width: 700 })
  .webp({ quality: 85 })
  .toFile("public/images/about-portrait.webp");

// ภาพคนตัดพื้นหลังแล้ว (โปร่งใส) สำหรับ hero — ตัดขอบโปร่งใสที่เกินออก
await sharp("img/person.png")
  .extract({ left: 140, top: 49, width: 850, height: 1399 })
  .webp({ quality: 86, alphaQuality: 90 })
  .toFile("public/images/hero-person.webp");

// ภาพตอนนำเสนองาน สำหรับหน้า About (ครอป 4:3 ให้คนอยู่ในเฟรม)
await sharp("img/person-03.jpg")
  .extract({ left: 160, top: 165, width: 1400, height: 1050 })
  .resize({ width: 1400 })
  .webp({ quality: 84 })
  .toFile("public/images/about-presenting.webp");

// ภาพผลงาน: img/project/<โฟลเดอร์>/*.png → public/projects/<slug>/*.webp
import { mkdirSync, readdirSync } from "node:fs";
// ชื่อไฟล์ปลายทาง: ตัวพิมพ์เล็ก เว้นวรรค → "-" (ใช้ใน URL ได้)
const slugify = (file) =>
  file
    .replace(/\.(png|jpe?g)$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9ก-๙.]+/g, "-")
    .replace(/^-|-$/g, "");
// เบลอข้อมูลส่วนตัวในภาพก่อนนำขึ้นเว็บ (พิกัดเป็นพิกเซลของไฟล์ต้นฉบับ)
const blurMap = {
  // คอลัมน์ LINE User ID ในหน้ากำหนดสิทธิ์ผู้ใช้
  "img/project/Lalita Pharmacy/04-admin-users.png": [{ left: 2240, top: 390, width: 470, height: 700 }],
};
async function blurRegions(path) {
  const regions = blurMap[path];
  if (!regions) return path;
  const overlays = await Promise.all(
    regions.map(async (r) => ({
      input: await sharp(path).extract(r).blur(18).toBuffer(),
      left: r.left,
      top: r.top,
    })),
  );
  return sharp(path).composite(overlays).toBuffer();
}

const projectImages = {
  "img/project/dashboard": "public/projects/dashboard",
  "img/project/Lalita Pharmacy": "public/projects/lalita-pharmacy",
  "img/project/My Financial System": "public/projects/my-financial",
  "img/project/Pharmacy Chatbot": "public/projects/pharmacy-bot",
};
for (const [from, to] of Object.entries(projectImages)) {
  mkdirSync(to, { recursive: true });
  for (const file of readdirSync(from).filter((f) => /\.(png|jpe?g)$/i.test(f))) {
    const input = await blurRegions(`${from}/${file}`);
    await sharp(input)
      .resize({ width: 1800, withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(`${to}/${slugify(file)}.webp`);
  }
}

console.log("done");
