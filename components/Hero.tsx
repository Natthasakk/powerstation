"use client";
import { useEffect, useState } from "react";
import { safeImageSrc } from "@/app/lib/safety";

export default function Hero() {
  const [heroImage, setHeroImage] = useState<string>("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("voltcore_hero_image");
      const safe = safeImageSrc(saved);
      if (safe) setHeroImage(safe);
    } catch {
      // localStorage may be unavailable (privacy mode, SSR mismatch) — fall back to default
    }
  }, []);

  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-white pt-[64px] md:min-h-screen md:justify-between">
      {/* Subtle radial glow for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,113,227,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Text content with cinematic feel */}
      <div className="relative z-10 mt-10 px-6 text-center md:mt-28 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <p className="mb-4 font-body text-[14px] font-bold uppercase tracking-[0.2em] text-[#1a432a]">
          VoltCore พลังงานที่คุณพกพาได้
        </p>
        <h1 className="mx-auto mb-6 max-w-[800px] font-display text-[44px] font-bold leading-[1.05] tracking-[-0.03em] text-[#1d1d1f] sm:text-[64px] md:text-[86px]">
          พลังงานสำหรับทุกการเดินทาง
        </h1>
        <p className="mx-auto mb-12 max-w-[540px] font-body text-[17px] leading-[26px] text-[#86868b] md:text-[21px] md:leading-[30px]">
          สามโมเดล หนึ่งครอบครัว พลังงานสะอาดจาก LiFePO₄ ที่สร้างมาเพื่อทุกที่ที่คุณไป
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#models"
            className="inline-flex h-12 cursor-pointer items-center rounded-full bg-black px-8 font-body text-[16px] font-medium text-white no-underline transition-all hover:scale-105 active:scale-95"
          >
            เลือกชมโมเดล
          </a>
          <a
            href="#"
            rel="noopener noreferrer nofollow"
            className="inline-flex h-12 cursor-pointer items-center rounded-full bg-[#ee4d2d] px-8 font-body text-[16px] font-medium text-white no-underline transition-all hover:scale-105 active:scale-95 shadow-md shadow-orange-500/20"
          >
            ซื้อบน Shopee
          </a>
          <a
            href="#"
            rel="noopener noreferrer nofollow"
            className="inline-flex h-12 cursor-pointer items-center rounded-full bg-[#06C755] px-8 font-body text-[16px] font-medium text-white no-underline transition-all hover:scale-105 active:scale-95 shadow-md shadow-green-500/20"
          >
            คุยผ่าน LINE
          </a>
        </div>
      </div>

      {/* Product Image — with subtle shadow for lift */}
      <div className="relative z-10 mt-8 w-full max-w-[1000px] px-6 pb-8 md:mt-16 md:pb-0 animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[40px] bg-gray-50 shadow-2xl">
          {heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroImage}
              alt="ภาพรวมพาวเวอร์สเตชั่น VoltCore ทั้งหมด"
              className="h-full w-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-300"
            >
              <svg className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
