// ข้อมูลทั้งหมดของเว็บอยู่ในไฟล์นี้ — แก้ที่นี่ที่เดียว
// รายการที่มี "TODO" คือข้อมูลตัวอย่าง (mockup) ที่ต้องเปลี่ยนเป็นข้อมูลจริง
// คำที่อยู่ใน [วงเล็บเหลี่ยม] จะถูกไฮไลต์เป็นสีเขียว

export const profile = {
  name: "Anaphat Poolnual",
  nameTh: "อนพัทย์ พูลนวล",
  nickname: "Earth",
  nicknameTh: "เอิร์ธ",
  age: 22,
  roles: ["Data Analyst", "System Analyst", "Developer"],
  education: "สาขาเทคโนโลยีสารสนเทศ ชั้นปีที่ 4",
  faculty: "คณะวิทยาศาสตร์และนวัตกรรมดิจิทัล",
  university: "มหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง",
  gpax: "3.73",
  location: "จ.สงขลา", // ไม่ใส่ที่อยู่เต็มบนเว็บสาธารณะ
  timezone: "Asia/Bangkok",
  availability: "2 พ.ย. 69 – 19 ก.พ. 70",
  availabilityFull: "2 พฤศจิกายน 2569 – 19 กุมภาพันธ์ 2570",
  availabilityNote: "สหกิจศึกษา ประมาณ 4 เดือน",
  sideJob: "ฟรีแลนซ์งานออกแบบ",
  photo: "/images/hero-person.webp", // ภาพคนตัดพื้นหลัง (img/person.png)
  portrait: "/images/about-portrait.webp", // ภาพในแถบภาพเลื่อนหน้า About (img/person-02.jpg)
  storyPhoto: "/images/about-presenting.webp", // ภาพตอนนำเสนองาน (img/person-03.jpg) ในหน้า About
  avatar: "/images/avatar.webp",
  // วางไฟล์ resume ไว้ที่ public/resume.pdf แล้วเปลี่ยนเป็น "/resume.pdf"
  resumeUrl: "", // TODO
};

export const contact = {
  email: "earthzaza467123@gmail.com",
  phone: "091-865-8003",
  socials: [
    { label: "GitHub", icon: "github", href: "https://github.com/662021058-beep/My-Portfolio.git" },
    { label: "LINE", icon: "line", href: "https://line.me/ti/p/anaphatxz" }, // TODO
  ] as const,
};

// ---------- หน้า Home ----------
export const home = {
  hero: {
    // บรรทัดแรกวนพิมพ์สลับกัน · บรรทัดสองพิมพ์ครั้งเดียวแล้วคงไว้ (เอฟเฟกต์ TextType)
    rotating: ["Data Analyst", "System Analyst"],
    line2: "& Developer",
    // แบ่งเป็นวลี — แต่ละวลีจะไม่ถูกตัดกลางบรรทัด
    sub: ["นิสิต IT ชั้นปีที่ 4", "กำลังมองหาที่ฝึกสหกิจศึกษา", "ในตำแหน่ง", "Data Analyst,", "System Analyst", "และ Developer"],
  },
  intro: {
    // ตอบ 3 คำถามของคนอ่าน: เป็นใคร → เป็นคนยังไง → เคยทำอะไร และกำลังหาอะไร
    kicker: "สวัสดีครับ ผม[เอิร์ธ] นิสิต IT ปี 4",
    big: "ผมชอบทำงานกับ[ข้อมูล] และสนุกกับการ[พัฒนาระบบ]ที่ช่วยให้คนทำงานง่ายขึ้น",
    pill: "Open for internship",
    // เว้นวรรคระหว่างวลี — แต่ละช่วงจะสว่างขึ้นทีละช่วงและไม่ถูกตัดกลางบรรทัด
    statement:
      "ผมเคยทำ [Dashboard วิเคราะห์ยอดขาย] [ระบบจัดการคลังยา] และ [แชทบอท ถามตอบอาการ] สำหรับร้านยา ตอนนี้กำลังมองหา ที่ฝึกสหกิจศึกษา เพื่อเรียนรู้การทำงานจริง ร่วมกับทีม",
  },
};

// ---------- หน้า About ----------
export const about = {
  heading: "Learning by building real things",
  sub: "นิสิต IT ชั้นปีที่ 4 · มหาวิทยาลัยทักษิณ",
  story: "ผมเรียนสาขาเทคโนโลยีสารสนเทศ ชอบทำงานกับข้อมูล และชอบพัฒนาระบบที่นำไปใช้ได้จริง",
  // เป้าหมายการฝึกงาน
  storySub:
    "อยากนำความรู้ด้านข้อมูลและการพัฒนาระบบมาช่วยงานขององค์กร เช่น จัดทำรายงาน วิเคราะห์ขั้นตอนการทำงาน หรือพัฒนาซอฟต์แวร์ และอยากเรียนรู้วิธีทำงานจริงจากทีมในองค์กร",
  facts: [
    { label: "เกรดเฉลี่ยสะสม", value: profile.gpax },
    { label: "ช่วงสหกิจศึกษา", value: `${profile.availabilityFull} (ประมาณ 4 เดือน)` },
    { label: "คณะ", value: `${profile.faculty} ${profile.university}` },
    { label: "งานอดิเรก", value: profile.sideJob },
  ],
  servicesHeading: "What I can do",
  // ชื่อเครื่องมือที่ตรงกับ data/tech.ts จะแสดงเป็นไอคอน ที่เหลือแสดงเป็นข้อความ
  services: [
    {
      title: "Data Analysis",
      body: "ทำ Dashboard ด้วย Power BI และใช้ SQL / Excel จัดการข้อมูล เพื่อสรุปตัวเลขให้อ่านเข้าใจง่าย",
      tools: ["Power BI", "SQL", "Excel", "MySQL", "Google Sheets"],
    },
    {
      title: "System Analysis",
      body: "วิเคราะห์ขั้นตอนการทำงาน เก็บความต้องการของผู้ใช้ และเขียนเอกสารหรือรายงานประกอบระบบ",
      tools: ["Word", "Excel", "วิเคราะห์ความต้องการ", "วิเคราะห์กระบวนการ"],
    },
    {
      title: "Development",
      body: "พัฒนาเว็บแอปได้ทั้งหน้าบ้านและหลังบ้าน เคยทำทั้งแบบ React + Node.js และ PHP Laravel",
      tools: ["HTML5", "CSS3", "JavaScript", "React", "Vite", "Tailwind CSS", "Node.js", "Express", "PHP", "Laravel", "MySQL", "Google Apps Script", "LINE LIFF", "Git"],
    },
  ],
  design: { label: "งานออกแบบ (ฟรีแลนซ์)", tools: ["Photoshop", "Canva"] },
  // ผลงานและกิจกรรม — เรียงจากล่าสุด
  activities: [
    {
      year: "2569",
      title: "รางวัลระดับดี การนำเสนอผลงานแบบโปสเตอร์ (Poster Presentation)",
      detail:
        "ผลงาน “ระบบถาม–ตอบสุขภาพอัจฉริยะสำหรับร้านยาโดยใช้ Rule-based บน LINE LIFF” ในงานประชุมวิชาการระดับชาติวิทยาศาสตร์วิจัย ครั้งที่ 17 ณ มหาวิทยาลัยศรีนครินทรวิโรฒ",
    },
    { year: "2568", title: "รางวัลเชิดชูเกียรตินิสิตดีเด่น ด้านการเรียนดีเด่น", detail: "ประจำปีการศึกษา 2567" },
    { year: "2568", title: "เจ้าภาพจัดกิจกรรมแข่งขันกีฬา ITM Network Games ครั้งที่ 22" },
    { year: "2567", title: "สโมสรนิสิตคณะวิทยาศาสตร์", detail: "ตำแหน่งหัวหน้าฝ่ายกีฬาและนันทนาการ" },
    { year: "2566", title: "อนุกรรมการสโมสรนิสิตคณะวิทยาศาสตร์" }, // TODO: ตรวจสอบชื่อตำแหน่ง (ในเรซูเม่เขียนว่า "อนุโมสรนิสิต")
  ],
  approach: "ผมชอบ[ลองทำ]และ[เรียนรู้]สิ่งใหม่ ถ้ายังไม่เข้าใจ จะถามและหาข้อมูล จนกว่าจะทำได้",
  // วิธีทำงาน (หัวข้อ "How I work")
  values: [
    "ฟัง[ความต้องการของผู้ใช้] ให้เข้าใจก่อนเริ่มทำ",
    "ทำงานเป็นขั้นตอน และ[สื่อสารกับทีม]อย่างสม่ำเสมอ",
    "[รับผิดชอบ]งานที่ได้รับมอบหมาย ให้เสร็จตามเวลา",
    "เปิดรับ[คำแนะนำ] แล้วนำไปปรับปรุง งานให้ดีขึ้น",
  ],
};

// ---------- ผลงาน ----------
export type CoverKind = "inventory" | "chat" | "finance" | "dashboard";

// ภาพในหน้ารายละเอียด:
//   "path"                          → ภาพเดียวเต็มความกว้าง
//   { src, caption }                → ภาพเดียวพร้อมคำบรรยาย
//   { row: ["a", "b"], caption }    → ภาพหลายภาพวางคู่กันในแถวเดียว (เหมาะกับหน้าจอมือถือ)
export type ProjectImage = string | { src: string; caption?: string } | { row: string[]; caption?: string };
export const imageSrc = (img: ProjectImage) => (typeof img === "string" ? img : "row" in img ? img.row[0] : img.src);

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  role: string; // แสดงใต้การ์ดด้านขวา
  category: string;
  year?: string;
  cover: { kind: CoverKind; bg: string; accent: string };
  coverImage?: string; // ภาพปกบนการ์ด (ไม่แสดงในหน้ารายละเอียด) — ถ้าไม่ใส่จะใช้ images[0]
  images?: ProjectImage[]; // ภาพที่แสดงเรียงในหน้ารายละเอียด (ใส่เป็น path หรือ { src, caption })
  problem: string;
  solution: string;
  features?: string[];
  tech: string[]; // ชื่อต้องตรงกับ data/tech.ts เพื่อแสดงไอคอน
  award?: string; // รางวัลที่ได้รับจากผลงานนี้
  demoUrl?: string;
  demoNote?: string;
  githubUrl?: string;
  placeholder?: boolean; // true = ยังไม่มีข้อมูลจริง
};

const repo = "https://github.com/662021058-beep/My-Portfolio/tree/main";

export const projects: Project[] = [
  {
    slug: "lalita-pharmacy",
    title: "Lalita Pharmacy",
    subtitle: "ระบบบริหารจัดการคลังยาและสต็อกสินค้า",
    role: "Full-stack · ออกแบบระบบ",
    category: "เว็บแอปพลิเคชันแบบ Full-stack",
    cover: { kind: "inventory", bg: "#bfdb39", accent: "#1a5241" },
    // ต้นฉบับ: img/project/Lalita Pharmacy/ (แปลงด้วย npm run images)
    coverImage: "/projects/lalita-pharmacy/cover.webp",
    // เรียงตามการใช้งาน: เข้าสู่ระบบ → ผู้ดูแลคลัง (Admin) → เภสัชกรหน้าร้าน
    images: [
      { src: "/projects/lalita-pharmacy/01-login.webp", caption: "หน้าเข้าสู่ระบบ — แยกสิทธิ์ผู้ดูแลคลังกับเภสัชกร" },
      { src: "/projects/lalita-pharmacy/02-admin-dashboard.webp", caption: "แดชบอร์ดภาพรวมคลังยา — มูลค่ายาหมดอายุ ยาใกล้หมดอายุ และยาที่ต้องสั่งเพิ่ม (Admin)" },
      { src: "/projects/lalita-pharmacy/03-admin-inventory.webp", caption: "บริหารจัดการคลังยา — รับยาเข้าสต็อกแยกตามล็อต และตารางสต็อกพร้อมเกณฑ์เตือนสต็อกต่ำ (Admin)" },
      { src: "/projects/lalita-pharmacy/04-admin-users.webp", caption: "กำหนดสิทธิ์ผู้ใช้งาน และผูก LINE User ID เพื่อรับแจ้งเตือน (Admin)" },
      { src: "/projects/lalita-pharmacy/05-dispense.webp", caption: "เบิกจ่ายยาหน้าร้าน — ระบบเลือกล็อตตามหลัก FEFO ให้อัตโนมัติ (เภสัชกร)" },
      { src: "/projects/lalita-pharmacy/06-dispense-success.webp", caption: "เบิกจ่ายสำเร็จ — ตัดสต็อกของล็อตนั้นทันที" },
      { src: "/projects/lalita-pharmacy/07-chat-assistant.webp", caption: "แชทบอทถามตอบข้อมูลคลังยา สำหรับเภสัชกร" },
    ],
    problem:
      "ร้านขายยาและคลินิกขนาดเล็ก–กลางมักเช็กสต็อกได้ยาก ยาหมดอายุโดยไม่รู้ตัว หรือสินค้าขาดมือ เพราะไม่มีระบบแจ้งเตือน",
    solution:
      "ผมพัฒนาเว็บแอปแบบ Full-stack ให้เภสัชกรและเจ้าของร้านเช็กสต็อก ค้นหายา และดูรายการยาใกล้หมดอายุได้ผ่านเว็บเบราว์เซอร์ โดยไม่ต้องติดตั้งโปรแกรมเพิ่ม",
    features: [
      "จัดการคลังยา — เพิ่ม แก้ไข และจัดการรายการยา",
      "ค้นหาและกรองรายการยาตามชื่อ หมวดหมู่ หรือประเภทได้อย่างรวดเร็ว",
      "แจ้งเตือนเมื่อยาใกล้หมดอายุหรือสต็อกเหลือน้อย",
      "เบิกจ่ายยาตามหลัก FEFO (First Expired, First Out) — ระบบเลือกล็อตที่หมดอายุก่อนให้อัตโนมัติ และระงับการเบิกยาล็อตที่หมดอายุแล้ว",
      "รับแจ้งเตือนอัตโนมัติผ่าน LINE โดยผูก LINE User ID กับบัญชีผู้ใช้งาน",
      "แดชบอร์ดสรุปจำนวนยาและสถานะคลังแบบเรียลไทม์",
      "แยกสิทธิ์ผู้ดูแลคลังกับเภสัชกร และกรองข้อมูลเพื่อป้องกันช่องโหว่",
      "รองรับมือถือ แท็บเล็ต และคอมพิวเตอร์ (Responsive)",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "REST API", "MySQL", "Vercel", "Render", "Clever Cloud", "Git"],
    demoUrl: "https://my-portfolio-pharmacytest.vercel.app",
    demoNote: "บัญชีทดลอง — ผู้ดูแลคลัง: admin / 123456 · เภสัชกร: pharmacy01 / 123456",
    githubUrl: `${repo}/lalita-pharmacy`,
  },
  {
    slug: "sales-dashboard",
    title: "Sales Analysis Dashboard",
    subtitle: "แดชบอร์ดวิเคราะห์ยอดขายร้านยาลลิตาเภสัช",
    role: "Data analysis · Visualisation",
    category: "แดชบอร์ดวิเคราะห์ข้อมูล (ข้อมูลปี 2567–2568)",
    cover: { kind: "dashboard", bg: "#6c847f", accent: "#bfdb39" },
    // ต้นฉบับ: img/project/dashboard/ (แปลงด้วย npm run images)
    coverImage: "/projects/dashboard/cover.webp",
    images: [
      { src: "/projects/dashboard/01-main-menu.webp", caption: "หน้าเมนูหลัก — เข้าถึงรายงานย่อยทั้ง 5 ส่วน" },
      { src: "/projects/dashboard/02-sales-overview.webp", caption: "ภาพรวมยอดขาย — ยอดขาย กำไร ยอดขายตามช่วงเวลา ประเภทลูกค้า และแนวโน้มรายเดือน พร้อมตัวกรองปี / เดือน / หมวดหมู่" },
      { src: "/projects/dashboard/03-category-sales.webp", caption: "ยอดขายแยกตามหมวดหมู่ยาและเวชภัณฑ์ (Treemap)" },
      { src: "/projects/dashboard/04-top10-bestsellers.webp", caption: "10 อันดับสินค้าขายดี" },
      { src: "/projects/dashboard/05-top10-margin.webp", caption: "10 อันดับสินค้าที่กำไรเฉลี่ยต่อชิ้นสูงสุด — ใช้วางแผนโปรโมชัน" },
      { src: "/projects/dashboard/06-basket-analysis.webp", caption: "สินค้าที่ลูกค้านิยมซื้อร่วมกัน (Market Basket Analysis)" },
    ],
    problem:
      "ร้านยาลลิตาเภสัชมีข้อมูลการขายจำนวนมาก แต่ยังไม่ได้นำมาใช้ช่วยวางแผนสต็อก จัดโปรโมชัน หรือดูว่าสินค้าไหนทำกำไร",
    solution:
      "ผมนำข้อมูลการขายปี 2567–2568 มาทำเป็นแดชบอร์ดใน Power BI เพื่อดูยอดขาย กำไร สินค้าขายดี ช่วงเวลาที่ลูกค้าซื้อ และสินค้าที่ลูกค้ามักซื้อคู่กัน",
    features: [
      "หน้าเมนูหลักสำหรับเข้าถึงรายงานย่อยทั้ง 5 ส่วน",
      "ภาพรวมยอดขาย กำไรสุทธิ ยอดขายตามช่วงเวลา สัดส่วนกลุ่มลูกค้า และแนวโน้มรายเดือน",
      "กรองข้อมูลตามปี เดือน ช่วงเวลา หมวดหมู่สินค้า และประเภทลูกค้า",
      "สัดส่วนรายได้แยกตามหมวดหมู่ยาและเวชภัณฑ์ (Treemap)",
      "10 อันดับสินค้าขายดี และ 10 อันดับสินค้าที่กำไรต่อชิ้นสูงสุด",
      "วิเคราะห์สินค้าที่นิยมซื้อร่วมกัน (Market Basket Analysis) เพื่อจัดชุดสินค้าและวางตำแหน่งบนชั้นวาง",
    ],
    tech: ["Power BI"],
    githubUrl: `${repo}/Dashboard`,
  },
  {
    slug: "pharmacy-bot",
    title: "Pharmacy Chatbot",
    subtitle: "แชทบอทถาม–ตอบอาการเบื้องต้นบน LINE",
    role: "Full-stack · Chatbot",
    category: "แชทบอทบน LINE LIFF",
    cover: { kind: "chat", bg: "#1a5241", accent: "#bfdb39" },
    // ต้นฉบับ: img/project/Pharmacy Chatbot/ (แปลงด้วย npm run images)
    coverImage: "/projects/pharmacy-bot/cover.webp",
    images: [
      {
        src: "/projects/pharmacy-bot/01-chat-desktop.webp",
        caption: "หน้าแชทบนคอมพิวเตอร์ — พิมพ์อาการแล้วได้ผลวิเคราะห์ คำแนะนำจากเภสัชกร และข้อควรระวัง",
      },
      {
        row: ["/projects/pharmacy-bot/02-mobile-categories.webp", "/projects/pharmacy-bot/03-mobile-dark-mode.webp"],
        caption: "หน้าจอมือถือผ่าน LINE LIFF — ปุ่มลัดหมวดหมู่ยาแนะนำ (ซ้าย) และโหมดมืด (ขวา)",
      },
      { src: "/projects/pharmacy-bot/04-line-qr.webp", caption: "QR Code สำหรับสแกนเปิดใช้งานผ่าน LINE บนมือถือ" },
    ],
    problem:
      "ร้านยาในชุมชนมีเภสัชกรน้อย แต่ต้องตอบคำถามเรื่องอาการพื้นฐานซ้ำ ๆ ทำให้ผู้ป่วยที่อาการหนักกว่าอาจต้องรอนาน",
    solution:
      "ผมพัฒนาแชทบอทบน LINE ให้ผู้ใช้พิมพ์อาการเป็นประโยคสั้น ๆ แล้วได้คำแนะนำยาสามัญประจำบ้านเบื้องต้น ถ้าเป็นอาการฉุกเฉิน ระบบจะแนะนำให้ไปพบแพทย์ทันที",
    features: [
      "ใช้งานผ่าน LINE ได้ทันทีด้วย LIFF โดยไม่ต้องติดตั้งแอปเพิ่ม",
      "วิเคราะห์คำสำคัญจากข้อความด้วยระบบ Rule-based Keyword Matching เพื่อประเมินอาการและแนะนำยาเบื้องต้น",
      "คัดกรองอาการฉุกเฉิน เช่น เจ็บแน่นหน้าอก หายใจไม่ออก และแจ้งให้พบแพทย์ทันที",
      "แสดงผลได้ดีทั้งบนมือถือและคอมพิวเตอร์",
      "ระบบหลังบ้านสำหรับจัดการข้อมูลยา อาการ และเกณฑ์การคัดกรอง",
    ],
    tech: ["LINE LIFF", "HTML5", "CSS3", "JavaScript", "PHP", "Laravel", "MySQL"],
    award:
      "รางวัลระดับดี การนำเสนอแบบโปสเตอร์ งานประชุมวิชาการระดับชาติวิทยาศาสตร์วิจัย ครั้งที่ 17 (2569) ณ มหาวิทยาลัยศรีนครินทรวิโรฒ",
    demoUrl: "https://sci-inno.in/IT/662021058/pharmacy-bot/public/liff",
    demoNote: "แนะนำให้เปิดผ่านแอป LINE บนมือถือ",
    githubUrl: `${repo}/pharmacy-bot`,
  },
  {
    slug: "my-financial",
    title: "My Financial System",
    subtitle: "ระบบคำนวณราคางานและติดตามรายรับส่วนตัว",
    role: "ออกแบบและพัฒนา · เครื่องมือส่วนตัว",
    category: "เว็บแอปส่วนตัว",
    cover: { kind: "finance", bg: "#f6f6f4", accent: "#1a5241" },
    // ต้นฉบับ: img/project/My Financial System/ (แปลงด้วย npm run images)
    coverImage: "/projects/my-financial/cover.webp",
    images: [
      { src: "/projects/my-financial/01-welcome.webp", caption: "หน้าต้อนรับ — สรุปความสามารถหลักของระบบ" },
      { src: "/projects/my-financial/02-home.webp", caption: "หน้าแรก — ภาพรวมรายได้ พร้อมตัวกรองวันนี้ / เดือนนี้ / ปีนี้ / ทั้งหมด / เลือกช่วงวันที่" },
      { src: "/projects/my-financial/03-summary.webp", caption: "สรุปยอดเบิกรวม กำไร ยอดค้างเบิก ต้นทุน และจำนวน ID" },
      { src: "/projects/my-financial/04-create-job.webp", caption: "สร้างชุดงาน — เลือกชุดงาน กำหนดช่วง ID แล้วระบบคำนวณราคาให้ทันที" },
      { src: "/projects/my-financial/05-history.webp", caption: "ประวัติงาน — แยกสถานะชำระแล้ว / ค้างเบิก พร้อมกำไรสุทธิของแต่ละชุด" },
      { src: "/projects/my-financial/06-summary-image.webp", caption: "สร้างรูปสรุปงานเพื่อส่งให้ลูกค้า และดาวน์โหลดได้ทันที" },
    ],
    problem: "เวลารับงาน ผมต้องคำนวณราคาแต่ละชุดเอง ซึ่งใช้เวลานาน ลูกค้าต้องรอ และติดตามยอดค้างเบิกได้ยาก",
    solution:
      "ผมทำระบบนี้ไว้ใช้เอง สำหรับคำนวณราคางาน หักส่วนลด และคิดกำไรสุทธิอัตโนมัติ พร้อมเก็บประวัติงานและสถานะการชำระเงิน ทำให้แจ้งราคาลูกค้าได้เร็วขึ้น",
    features: [
      "แดชบอร์ดสรุปยอดเบิกรวม กำไรสุทธิ ยอดค้างเบิก ต้นทุน และรายการล่าสุด",
      "กรองข้อมูลตามวันนี้ เดือนนี้ ปีนี้ ทั้งหมด หรือเลือกช่วงวันที่เอง",
      "สร้างชุดงาน กำหนดช่วง ID แล้วคำนวณยอดรวม ส่วนลด ยอดเบิกจริง และกำไรอัตโนมัติ",
      "ประวัติงานแบบการ์ด แยกสถานะ “ชำระแล้ว” กับ “ค้างเบิก” และสร้างรูปสรุปงานได้ทันที",
      "หน้าต้อนรับ เมนูควบคุมด้านล่าง ดีไซน์ Glassmorphism พร้อม CSS Animation และรองรับทั้งมือถือและเดสก์ท็อป",
    ],
    tech: ["HTML5", "JavaScript", "CSS3", "Google Apps Script", "Google Sheets"],
    demoUrl: "https://sites.google.com/tsu.ac.th/portfolioearth/portfolio",
    githubUrl: `${repo}/My-Financial`,
  },
];
