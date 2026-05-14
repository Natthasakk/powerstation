"use client";
import { useEffect, useState } from "react";
import { socialLinks } from "@/app/data";

const columns = [
  {
    title: "สินค้า",
    links: [
      { label: "VoltCore Lite 1000", href: "/product/PB-AR07Pro" },
      { label: "VoltCore Pro 2000", href: "/product/PB-AR20Pro" },
      { label: "VoltCore Max 4000", href: "/product/PB-AR26Pro" },
      { label: "แผงโซล่าร์เซลล์", href: "#" },
      { label: "อุปกรณ์เสริม", href: "#" },
    ],
  },
  {
    title: "สนับสนุน",
    links: [
      { label: "คู่มือการใช้งาน", href: "#" },
      { label: "คำถามที่พบบ่อย", href: "#" },
      { label: "การรับประกัน", href: "#" },
      { label: "ติดต่อเรา", href: "#" },
    ],
  },
  {
    title: "บริษัท",
    links: [
      { label: "เกี่ยวกับ VoltCore", href: "#" },
      { label: "บล็อก", href: "#" },
      { label: "ข่าวสาร", href: "#" },
      { label: "ร่วมงานกับเรา", href: "#" },
    ],
  },
];

export default function Footer() {
  const [lineUrl, setLineUrl] = useState(socialLinks.line);
  const [shopeeUrl, setShopeeUrl] = useState(socialLinks.shopee);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedLine = localStorage.getItem("voltcore_line_url");
        if (savedLine) setLineUrl(savedLine);
        const savedShopee = localStorage.getItem("voltcore_shopee_url");
        if (savedShopee) setShopeeUrl(savedShopee);
      } catch {
        // localStorage unavailable
      }
    }
  }, []);

  return (
    <footer className="bg-[#f5f5f7] px-6 pt-[102px] pb-11 md:px-11">
      <div className="mx-auto max-w-[1080px]">
        <div className="mb-11 grid grid-cols-2 gap-11 border-b border-gray-300 pb-11 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-3 font-body text-[13px] font-semibold text-[#1d1d1f]">{col.title}</p>
              <ul role="list" className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-[13px] leading-[18px] text-[#6e6e73] no-underline transition-colors hover:text-[#1d1d1f]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social / Contact Column */}
          <div>
            <p className="mb-3 font-body text-[13px] font-semibold text-[#1d1d1f]">ช่องทางติดต่อ</p>
            <ul role="list" className="space-y-3">
              <li>
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 font-body text-[13px] font-bold text-[#06C755] no-underline transition-opacity hover:opacity-80"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 8.5c0-2.485-2.015-4.5-4.5-4.5S7.5 8.015 7.5 10.5c0 2.224 1.56 4.08 3.664 4.436-.145.497-.475 1.553-.545 1.794-.085.298.11.294.228.213.094-.065 1.497-.988 2.104-1.393.18.025.363.038.549.038 2.485 0 4.5-2.015 4.5-4.5z"/>
                  </svg>
                  LINE Official
                </a>
              </li>
              <li>
                <a
                  href={shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 font-body text-[13px] font-bold text-[#EE4D2D] no-underline transition-opacity hover:opacity-80"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a7 7 0 110 14A7 7 0 0112 5zm-1.5 3.5v1h-1a.5.5 0 000 1h1v5h1v-5h1a.5.5 0 000-1h-1v-1a.5.5 0 00-1 0z"/>
                  </svg>
                  Shopee Mall
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-1">
          <p className="font-body text-[13px] leading-[18px] text-[#86868b]">
            ลิขสิทธิ์ © 2026 VoltCore Inc. สงวนลิขสิทธิ์ทั้งหมด
          </p>
          <p className="font-body text-[13px] leading-[18px] text-[#86868b]">
            โมเดล VoltCore ทั้งหมดได้รับการรับรองมาตรฐาน UL, FCC และ CE รูปภาพสินค้าใช้เพื่อการโฆษณาเท่านั้น
          </p>
        </div>
      </div>
    </footer>
  );
}
