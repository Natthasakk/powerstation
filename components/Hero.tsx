"use client";
import { useEffect, useState } from "react";
import { safeImageSrc } from "@/app/lib/safety";
import { socialLinks } from "@/app/data";

const trustBadges = [
  "จัดส่งฟรีทั่วไทย",
  "การรับประกัน 5 ปี",
  "คืนสินค้า 30 วัน",
  "UL / FCC / CE",
];

export default function Hero() {
  const [heroImage, setHeroImage] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("voltcore_hero_image");
        const safe = safeImageSrc(saved);
        if (safe) {
          setHeroImage(safe);
        } else {
          // Default fallback from the user's latest export
          setHeroImage("https://webstatitic.blob.core.windows.net/picture/Gemini_Generated_Image_3ws1nu3ws1nu3ws1.png");
        }
      } catch {
        setHeroImage("https://webstatitic.blob.core.windows.net/picture/Gemini_Generated_Image_3ws1nu3ws1nu3ws1.png");
      }
    }
  }, []);

  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-[#0a0a0a] pt-[64px]">

      {/* Radial glow for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(26,67,42,0.45) 0%, rgba(0,113,227,0.12) 50%, transparent 75%)",
        }}
      />

      {/* Text block */}
      <div className="relative z-10 mt-12 px-6 text-center md:mt-24">
        <p className="mb-5 font-body text-[14px] font-bold uppercase tracking-[0.22em] text-white/55">
          VoltCore · พลังงานที่คุณพกพาได้
        </p>
        <h1 className="mx-auto mb-6 max-w-[820px] font-display text-[44px] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[64px] md:text-[88px]">
          พลังงานสำหรับทุกการเดินทาง
        </h1>
        <p className="mx-auto mb-10 max-w-[520px] font-body text-[17px] leading-[26px] text-white/60 md:text-[20px] md:leading-[30px]">
          สามโมเดล หนึ่งครอบครัว พลังงานสะอาดจาก LiFePO₄ ที่สร้างมาเพื่อทุกที่ที่คุณไป
        </p>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {trustBadges.map((badge) => (
            <div key={badge} className="flex items-center gap-1.5 text-white/45">
              <svg
                className="h-3.5 w-3.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[13px] font-medium">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Product image showcase */}
      <div className="relative z-10 mt-14 w-full max-w-[1000px] px-6 md:mt-20">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[32px] shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
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
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#141414]">
              <svg className="h-16 w-16 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-[13px] font-medium text-white/20">เพิ่มรูปภาพจาก Admin Dashboard</p>
            </div>
          )}
          {/* top-edge shine */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[32px]"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)" }}
          />
        </div>

        {/* Glow beneath the image */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 left-1/2 h-28 w-3/4 -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse, rgba(0,113,227,0.22) 0%, transparent 70%)",
            filter: "blur(24px)",
          }}
        />
      </div>

      {/* Fade into the dark stats band below */}
      <div
        aria-hidden="true"
        className="relative z-10 mt-10 h-20 w-full"
        style={{ background: "linear-gradient(to bottom, transparent, #0d0d0d)" }}
      />
    </section>
  );
}
