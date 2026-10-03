import type { Metadata, Viewport } from "next";
import { Google_Sans } from "next/font/google";
import localFont from "next/font/local";
import { profile } from "@/data/portfolio";
import SmoothScroll from "@/components/site/SmoothScroll";
import Header from "@/components/site/Header";
import BottomNav from "@/components/site/BottomNav";
import SideTabs from "@/components/site/SideTabs";
import Footer from "@/components/site/Footer";
import HoverCursor from "@/components/site/HoverCursor";
import "./globals.css";

const googleSans = Google_Sans({
  subsets: ["latin"],
  variable: "--font-google-sans",
  display: "swap",
});

// ภาษาไทยใช้ IBM Plex Sans Thai — จำกัด unicode-range เฉพาะอักษรไทย
// ตัวอักษรอังกฤษจึงยังใช้ Google Sans ตามเดิม
const plexThai = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-thai-thai-300-normal.woff2", weight: "300" },
    { path: "./fonts/ibm-plex-sans-thai-thai-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-sans-thai-thai-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-plex-thai",
  display: "swap",
  declarations: [{ prop: "unicode-range", value: "U+0E01-0E5B, U+200C-200D, U+25CC" }],
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} • ${profile.roles.join(" / ")}`,
    template: `${profile.name} • %s`,
  },
  description: `IT student looking for a ${profile.availabilityNote} as ${profile.roles.join(", ")}. Available ${profile.availability}.`,
  openGraph: {
    title: `${profile.name} — Portfolio`,
    images: [profile.photo],
  },
};

export const viewport: Viewport = {
  themeColor: "#e8e8e8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plexThai.variable} ${googleSans.variable}`}>
      <body>
        <SmoothScroll />
        <Header />
        {/* เนื้อหาแต่ละหน้าอยู่เหนือ footer ที่ fixed อยู่ด้านล่าง แล้วเลื่อนเผยให้เห็นตอนท้าย */}
        <div className="relative z-10">{children}</div>
        <Footer />
        <BottomNav />
        <SideTabs />
        <HoverCursor />
      </body>
    </html>
  );
}
