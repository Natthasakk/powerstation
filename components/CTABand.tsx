"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { socialLinks } from "@/app/data";

export default function CTABand() {
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
    <section
      id="cta"
      className="relative overflow-hidden bg-white px-6 py-24 text-center md:px-10 md:py-[102px]"
    >
      {/* Subtle blue-green radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 100%, rgba(0,113,227,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[640px]">
        <p className="mb-4 font-body text-[14px] font-bold uppercase tracking-[0.15em] text-[#1a432a]">
          เริ่มต้นใช้งาน
        </p>
        <h2 className="mb-6 font-display text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-[#1d1d1f] md:text-[64px]">
          พร้อมไปกับคุณทุกที่
        </h2>
        <p className="mb-12 font-body text-[19px] leading-[28px] text-[#86868b]">
          VoltCore ทุกรุ่นจัดส่งฟรี พร้อมการรับประกัน 5 ปี และนโยบายคืนสินค้าภายใน 30 วัน โดยไม่มีเงื่อนไข
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex h-12 cursor-pointer items-center rounded-full bg-[#06C755] px-10 font-body text-[16px] font-semibold text-white no-underline transition-all hover:scale-105 active:scale-95"
          >
            คุยทาง LINE
          </a>
          <a
            href={shopeeUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex h-12 cursor-pointer items-center rounded-full bg-[#ee4d2d] px-10 font-body text-[16px] font-semibold text-white no-underline transition-all hover:scale-105 active:scale-95"
          >
            ซื้อบน Shopee
          </a>
          <Link
            href="/#models"
            className="inline-flex h-12 cursor-pointer items-center rounded-full bg-black px-10 font-body text-[16px] font-semibold text-white no-underline transition-all hover:bg-gray-800"
          >
            เลือกชมสินค้า
          </Link>
        </div>
      </div>
    </section>
  );
}
