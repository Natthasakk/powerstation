"use client";

const rows: [string, string, string, string][] = [
  ["ความจุ",               "1,024 Wh",            "2,048 Wh",                    "4,096 Wh"],
  ["ประเภทแบตเตอรี่",           "LiFePO₄",             "LiFePO₄",                     "LiFePO₄"],
  ["กำลังขับ AC (ต่อเนื่อง)", "1,000W",               "2,000W",                      "4,000W"],
  ["กำลังขับ AC (สูงสุด/กระชาก)", "2,000W",               "4,000W",                      "7,200W"],
  ["รูปแบบคลื่น AC",            "Pure Sine Wave",       "Pure Sine Wave",              "Pure Sine Wave"],
  ["เต้ารับ AC",             "2× 120V",              "4× 120V",                     "6× 120V"],
  ["พอร์ต USB-C PD",        "2× 60W",               "2× 140W + 2× 60W",           "4× 140W"],
  ["พอร์ต USB-A",           "2× 18W QC3.0",         "2× 18W QC3.0",               "4× 18W QC3.0"],
  ["เต้าเสียบในรถ",             "1× 12V / 10A",         "1× 12V / 10A",               "2× 12V / 10A"],
  ["พอร์ต DC Barrel",         "—",                    "✓ 5521",                      "✓ 5521"],
  ["โซล่าร์อินพุต (สูงสุด)",      "400W",                 "800W",                        "1,600W"],
  ["ชาร์จเร็ว AC (ไฟบ้าน)",  "1,000W — 1.5 ชม.",    "1,800W — 1.8 ชม.",           "3,000W — 2.1 ชม."],
  ["รอบการใช้งาน",             "3,500+ รอบ",        "3,500+ รอบ",               "3,500+ รอบ"],
  ["อุณหภูมิการใช้งาน",         "-20°C ถึง 40°C",        "-20°C ถึง 40°C",               "-20°C ถึง 40°C"],
  ["น้ำหนัก",                 "11.2 กก.",   "18.2 กก.",         "34.5 กก."],
  ["ขนาด (ซม.)",        "38.2 × 22.6 × 28.8",  "50.4 × 28.2 × 36.4",        "66.0 × 35.4 × 46.8"],
  ["การรับรอง",         "UL, FCC, CE, RoHS",   "UL, FCC, CE, RoHS, UN38.3", "UL, FCC, CE, RoHS, UN38.3"],
  ["การรับประกัน",               "5 ปี",              "5 ปี",                     "5 ปี"],
];

export default function CompareTable() {
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
          <table className="min-w-[600px] w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="bg-gray-50/50 px-6 py-6 text-left font-body text-[12px] font-bold uppercase tracking-[0.1em] text-[#86868b]" />
                {/* Lite */}
                <th className="bg-gray-50/50 px-6 py-6 text-center">
                  <span className="block font-display text-[15px] font-bold" style={{ color: "#34C759" }}>Lite 1000</span>
                  <span className="block font-display text-[26px] font-bold text-[#1d1d1f]">฿29,900</span>
                </th>
                {/* Pro (featured) */}
                <th className="bg-blue-50/30 px-6 py-6 text-center">
                  <span className="block font-display text-[15px] font-bold" style={{ color: "#0071E3" }}>Pro 2000</span>
                  <span className="block font-display text-[26px] font-bold text-[#1d1d1f]">฿59,900</span>
                  <span className="mt-[8px] inline-block rounded-full px-[12px] py-[3px] font-body text-[10px] font-bold uppercase tracking-[0.05em] text-white" style={{ background: "#0071E3" }}>
                    ยอดนิยมที่สุด
                  </span>
                </th>
                {/* Max */}
                <th className="bg-gray-50/50 px-6 py-6 text-center">
                  <span className="block font-display text-[15px] font-bold" style={{ color: "#FF9F0A" }}>Max 4000</span>
                  <span className="block font-display text-[26px] font-bold text-[#1d1d1f]">฿109,000</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, lite, pro, max]) => (
                <tr key={label} className="border-b border-gray-50 last:border-0">
                  <td className="bg-gray-50/20 px-6 py-[16px] text-left font-body text-[14px] font-medium text-[#86868b]">
                    {label}
                  </td>
                  <td className="bg-white px-6 py-[16px] text-center font-body text-[14px] text-[#1d1d1f]">
                    {lite === "—" ? (
                      <span className="text-gray-300">—</span>
                    ) : lite.startsWith("✓") ? (
                      <span className="font-semibold"><span style={{ color: "#34C759" }}>✓</span>{lite.slice(1)}</span>
                    ) : lite}
                  </td>
                  <td className="bg-blue-50/10 px-6 py-[16px] text-center font-body text-[14px] font-bold text-[#1d1d1f]">
                    {pro === "—" ? (
                      <span className="text-gray-300">—</span>
                    ) : pro.startsWith("✓") ? (
                      <span><span style={{ color: "#34C759" }}>✓</span>{pro.slice(1)}</span>
                    ) : pro}
                  </td>
                  <td className="bg-white px-6 py-[16px] text-center font-body text-[14px] text-[#1d1d1f]">
                    {max === "—" ? (
                      <span className="text-gray-300">—</span>
                    ) : max.startsWith("✓") ? (
                      <span className="font-semibold"><span style={{ color: "#34C759" }}>✓</span>{max.slice(1)}</span>
                    ) : max}
                  </td>
                </tr>
              ))}

              {/* CTA row */}
              <tr className="border-t border-gray-100">
                <td className="bg-gray-50/20 px-6 py-8" />
                <td className="bg-white px-6 py-8 text-center">
                  <a
                    href="/product/lite-1000"
                    className="inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full border-2 font-body text-[14px] font-bold no-underline transition-all hover:bg-black hover:text-white hover:border-black"
                    style={{ borderColor: "#34C759", color: "#34C759" }}
                  >
                    ดูรายละเอียด
                  </a>
                </td>
                <td className="bg-blue-50/10 px-6 py-8 text-center">
                  <a
                    href="/product/pro-2000"
                    className="inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full font-body text-[14px] font-bold text-white no-underline transition-all hover:bg-[#0066CC] shadow-lg shadow-blue-500/20"
                    style={{ background: "#0071E3" }}
                  >
                    ดูรายละเอียด
                  </a>
                </td>
                <td className="bg-white px-6 py-8 text-center">
                  <a
                    href="/product/max-4000"
                    className="inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full border-2 font-body text-[14px] font-bold no-underline transition-all hover:bg-black hover:text-white hover:border-black"
                    style={{ borderColor: "#FF9F0A", color: "#FF9F0A" }}
                  >
                    ดูรายละเอียด
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
