// ไอคอนของแต่ละเทคโนโลยี (ไฟล์อยู่ใน public/tech — ดาวน์โหลดจาก https://thesvg.org)
// เพิ่มเทคโนโลยีใหม่: ดาวน์โหลด https://thesvg.org/icons/<slug>/default.svg ไปไว้ที่ public/tech/<slug>.svg
// แล้วเพิ่มชื่อ → slug ด้านล่าง
export const techIcons: Record<string, string> = {
  React: "react",
  Vite: "vite",
  "Tailwind CSS": "tailwindcss",
  "Node.js": "nodejs",
  Express: "express",
  "REST API": "openapi",
  MySQL: "mysql",
  Vercel: "vercel",
  Render: "render",
  "Clever Cloud": "clever-cloud",
  Git: "git",
  "Power BI": "microsoft-power-bi",
  "LINE LIFF": "line",
  HTML5: "html5",
  CSS3: "css3",
  JavaScript: "javascript",
  PHP: "php",
  Laravel: "laravel",
  "Google Apps Script": "google-apps-script",
  "Google Sheets": "google-sheets",
  SQL: "sql", // ไอคอนวาดเอง (thesvg ไม่มีไอคอน SQL ทั่วไป)
  Excel: "microsoft-excel",
  Word: "microsoft-word",
  Photoshop: "photoshop",
  Canva: "canva",
};
