"use client";
import { useEffect, useState } from "react";
import { ProductModel, initialModels } from "@/app/data";
import { safeJsonParse, safeImageSrc } from "@/app/lib/safety";

export default function ModelCards() {
  const [models, setModels] = useState<ProductModel[]>(initialModels);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("voltcore_models");
      const parsed = safeJsonParse<ProductModel[] | null>(saved, null);
      if (Array.isArray(parsed) && parsed.length > 0) setModels(parsed);
    } catch {
      // localStorage unavailable — keep initialModels
    }
  }, []);

  return (
    <section id="models" className="bg-[#fbfbfd] px-6 py-24 md:px-10 md:py-[102px]">
      <div className="mx-auto max-w-[1080px]">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 font-body text-[14px] font-bold uppercase tracking-[0.15em] text-[#1a432a]">
            เลือกโมเดลของคุณ
          </p>
          <h2 className="mb-4 font-display text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1d1d1f] md:text-[56px]">
            ค้นหาตัวเลือกที่ใช่สำหรับคุณ
          </h2>
          <p className="mx-auto max-w-[480px] font-body text-[17px] leading-[26px] text-[#86868b] md:text-[19px] md:leading-[28px]">
            ด้วยสามระดับพลังงาน ทั้งหมดใช้พลังงานสะอาดและเงียบจาก LiFePO₄ — ออกแบบมาให้ใช้งานได้ยาวนานถึง 10 ปี
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {models.map((m) => (
            <div
              key={m.id}
              className={`relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                m.featured
                  ? "border-[#0071E3]/20 bg-white shadow-xl shadow-blue-500/5"
                  : "border-gray-200 bg-white shadow-lg shadow-black/5"
              }`}
            >
              {/* Accent top bar */}
              <div className="h-[4px] w-full" style={{ background: m.accent }} />

              {/* Badge */}
              <div className="px-7 pt-6">
                {m.featured ? (
                  <span
                    className="inline-block rounded-full px-3 py-[4px] font-body text-[11px] font-bold uppercase tracking-[0.08em] text-white"
                    style={{ background: m.accent }}
                  >
                    ยอดนิยมที่สุด
                  </span>
                ) : (
                  <div className="h-[24px]" />
                )}
              </div>

              {/* Image with shadow for depth */}
              <div className="flex justify-center px-7 pt-6">
                <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl bg-gray-50 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={safeImageSrc(m.imageUrl)}
                    alt={m.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col px-7 pb-8 pt-6">
                <h3 className="mb-1 font-display text-[22px] font-bold text-[#1d1d1f]">
                  <a href={`/product/${m.id}`} className="hover:underline">{m.name}</a>
                </h3>
                <p className="mb-6 font-body text-[15px] leading-relaxed text-[#86868b]">
                  {m.tagline}
                </p>
                <p className="mb-6 font-display text-[36px] font-bold leading-none text-[#1d1d1f]">
                  {m.price}
                </p>

                {/* Specs */}
                <ul className="mb-8 space-y-0 border-b border-t border-gray-100 py-1">
                  {m.specs.map((s, i) => (
                    <li
                      key={s.label}
                      className={`flex items-center justify-between py-[11px] font-body text-[14px] ${
                        i < m.specs.length - 1 ? "border-b border-gray-50" : ""
                      }`}
                    >
                      <span className="text-[#86868b]">{s.label}</span>
                      <span className="font-semibold text-[#1d1d1f]">{s.value}</span>
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="mt-auto space-y-3">
                  <a
                    href={`/product/${m.id}`}
                    className="inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full font-body text-[15px] font-semibold text-white no-underline transition-all hover:opacity-90"
                    style={{ background: m.accent }}
                  >
                    ดูรายละเอียด {m.name.replace("VoltCore ", "")}
                  </a>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="#"
                      rel="noopener noreferrer nofollow"
                      aria-label={`ซื้อ ${m.name} บน Shopee`}
                      className="inline-flex h-10 items-center justify-center rounded-full bg-[#ee4d2d] font-body text-[13px] font-semibold text-white no-underline transition-opacity hover:opacity-90"
                    >
                      Shopee
                    </a>
                    <a
                      href="#"
                      rel="noopener noreferrer nofollow"
                      aria-label={`สอบถาม ${m.name} ผ่าน LINE`}
                      className="inline-flex h-10 items-center justify-center rounded-full bg-[#06C755] font-body text-[13px] font-semibold text-white no-underline transition-opacity hover:opacity-90"
                    >
                      LINE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

