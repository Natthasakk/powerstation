"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductModel, initialModels } from "@/app/data";
import { safeJsonParse } from "@/app/lib/safety";

export default function CompareTable() {
  const [models, setModels] = useState<ProductModel[]>(initialModels);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("voltcore_models");
        const parsed = safeJsonParse<ProductModel[] | null>(saved, null);
        if (Array.isArray(parsed) && parsed.length > 0) setModels(parsed);
      } catch {
        // localStorage unavailable — keep initialModels
      }
    }
  }, []);

  // Build union of all spec labels in order of first appearance
  const allSpecLabels = [
    ...new Set(models.flatMap((m) => m.specs.map((s) => s.label))),
  ];

  return (
    <section id="compare" className="bg-white px-6 py-24 md:px-10 md:py-[102px]">
      <div className="mx-auto max-w-[1080px]">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 font-body text-[14px] font-bold uppercase tracking-[0.15em] text-[#1a432a]">
            เปรียบเทียบแต่ละรุ่น
          </p>
          <h2 className="mb-4 font-display text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1d1d1f] md:text-[56px]">
            รายละเอียดแบบเจาะลึก เคียงข้างกัน
          </h2>
          <p className="mx-auto max-w-[540px] font-body text-[19px] leading-[28px] text-[#86868b]">
            ทั้งสามรุ่นใช้เทคโนโลยีแบตเตอรี่ LiFePO₄ และการรับประกัน 5 ปีเหมือนกัน เลือกได้ตามระดับพลังงานที่คุณต้องการ
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-sm">
          <table className="min-w-[560px] w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                {/* Empty label column */}
                <th className="bg-gray-50/50 px-6 py-6 text-left font-body text-[12px] font-bold uppercase tracking-[0.1em] text-[#86868b]" />

                {models.map((m) => (
                  <th
                    key={m.id}
                    className="px-6 py-6 text-center"
                    style={{
                      background: m.featured ? "rgba(0,113,227,0.03)" : "rgba(249,249,251,0.5)",
                    }}
                  >
                    <span
                      className="block font-display text-[15px] font-bold"
                      style={{ color: m.accent }}
                    >
                      {m.name.replace("VoltCore ", "")}
                    </span>
                    <span className="block font-display text-[26px] font-bold text-[#1d1d1f]">
                      {m.price}
                    </span>
                    {m.featured && (
                      <span
                        className="mt-2 inline-block rounded-full px-3 py-[3px] font-body text-[10px] font-bold uppercase tracking-[0.05em] text-white"
                        style={{ background: m.accent }}
                      >
                        ยอดนิยมที่สุด
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {allSpecLabels.map((label) => (
                <tr key={label} className="border-b border-gray-50 last:border-0">
                  <td className="bg-gray-50/20 px-6 py-[16px] text-left font-body text-[14px] font-medium text-[#86868b]">
                    {label}
                  </td>
                  {models.map((m) => {
                    const spec = m.specs.find((s) => s.label === label);
                    return (
                      <td
                        key={m.id}
                        className="px-6 py-[16px] text-center font-body text-[14px]"
                        style={{
                          background: m.featured ? "rgba(0,113,227,0.04)" : "white",
                          fontWeight: m.featured ? 700 : 400,
                          color: "#1d1d1f",
                        }}
                      >
                        {spec ? (
                          spec.value
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* CTA row */}
              <tr className="border-t border-gray-100">
                <td className="bg-gray-50/20 px-6 py-8" />
                {models.map((m) => (
                  <td
                    key={m.id}
                    className="px-6 py-8 text-center"
                    style={{
                      background: m.featured ? "rgba(0,113,227,0.03)" : "white",
                    }}
                  >
                    {m.featured ? (
                      <Link
                        href={`/product/${m.id}`}
                        className="inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full font-body text-[14px] font-bold text-white no-underline transition-all hover:opacity-90 shadow-lg"
                        style={{ background: m.accent, boxShadow: `0 8px 24px ${m.accent}40` }}
                      >
                        ดูรายละเอียด
                      </Link>
                    ) : (
                      <Link
                        href={`/product/${m.id}`}
                        className="inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full border-2 font-body text-[14px] font-bold no-underline transition-all hover:bg-black hover:text-white hover:border-black"
                        style={{ borderColor: m.accent, color: m.accent }}
                      >
                        ดูรายละเอียด
                      </Link>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
