"use client";

const rows: [string, string, string, string][] = [
  ["Capacity",               "1,024 Wh",            "2,048 Wh",                    "4,096 Wh"],
  ["Battery Type",           "LiFePO₄",             "LiFePO₄",                     "LiFePO₄"],
  ["AC Output (continuous)", "1,000W",               "2,000W",                      "4,000W"],
  ["AC Output (peak surge)", "2,000W",               "4,000W",                      "7,200W"],
  ["AC Waveform",            "Pure Sine Wave",       "Pure Sine Wave",              "Pure Sine Wave"],
  ["AC Outlets",             "2× 120V",              "4× 120V",                     "6× 120V"],
  ["USB-C PD Output",        "2× 60W",               "2× 140W + 2× 60W",           "4× 140W"],
  ["USB-A Output",           "2× 18W QC3.0",         "2× 18W QC3.0",               "4× 18W QC3.0"],
  ["Car Outlet",             "1× 12V / 10A",         "1× 12V / 10A",               "2× 12V / 10A"],
  ["DC Barrel Port",         "—",                    "✓ 5521",                      "✓ 5521"],
  ["Solar Input (max)",      "400W",                 "800W",                        "1,600W"],
  ["AC Fast Charge (wall)",  "1,000W — 1.5 hrs",    "1,800W — 1.8 hrs",           "3,000W — 2.1 hrs"],
  ["Cycle Life",             "3,500+ cycles",        "3,500+ cycles",               "3,500+ cycles"],
  ["Operating Temp",         "-20°C to 40°C",        "-20°C to 40°C",               "-20°C to 40°C"],
  ["Weight",                 "11.2 kg (24.7 lbs)",   "18.2 kg (40.1 lbs)",         "34.5 kg (76.1 lbs)"],
  ["Dimensions (cm)",        "38.2 × 22.6 × 28.8",  "50.4 × 28.2 × 36.4",        "66.0 × 35.4 × 46.8"],
  ["Certifications",         "UL, FCC, CE, RoHS",   "UL, FCC, CE, RoHS, UN38.3", "UL, FCC, CE, RoHS, UN38.3"],
  ["Warranty",               "5 Years",              "5 Years",                     "5 Years"],
];

export default function CompareTable() {
  return (
    <section id="compare" className="bg-[#0d0d0d] px-6 py-24 md:px-10 md:py-[102px]">
      <div className="mx-auto max-w-[1080px]">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 font-body text-[13px] uppercase tracking-[0.12em] text-white/40">
            Model Comparison
          </p>
          <h2 className="mb-4 font-display text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-white md:text-[48px]">
            Every detail, side by side.
          </h2>
          <p className="mx-auto max-w-[480px] font-body text-[17px] leading-[26px] text-white/50">
            All three models share the same LiFePO₄ chemistry and 5-year warranty. Choose by power level.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[600px] w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="bg-[#161616] px-6 py-5 text-left font-body text-[12px] font-normal uppercase tracking-[0.08em] text-white/30" />
                {/* Lite */}
                <th className="bg-[#161616] px-6 py-5 text-center">
                  <span className="block font-display text-[15px] font-semibold" style={{ color: "#34C759" }}>Lite 1000</span>
                  <span className="block font-display text-[24px] font-semibold text-white">$899</span>
                </th>
                {/* Pro (featured) */}
                <th className="bg-[#0a0f1a] px-6 py-5 text-center">
                  <span className="block font-display text-[15px] font-semibold" style={{ color: "#0071E3" }}>Pro 2000</span>
                  <span className="block font-display text-[24px] font-semibold text-white">$1,799</span>
                  <span className="mt-[6px] inline-block rounded-full px-[10px] py-[2px] font-body text-[10px] font-semibold uppercase tracking-[0.05em] text-white" style={{ background: "#0071E3" }}>
                    Most Popular
                  </span>
                </th>
                {/* Max */}
                <th className="bg-[#161616] px-6 py-5 text-center">
                  <span className="block font-display text-[15px] font-semibold" style={{ color: "#FF9F0A" }}>Max 4000</span>
                  <span className="block font-display text-[24px] font-semibold text-white">$3,299</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, lite, pro, max]) => (
                <tr key={label} className="border-b border-white/[0.06]">
                  <td className="bg-[#111111] px-6 py-[13px] text-left font-body text-[13px] text-white/40">
                    {label}
                  </td>
                  <td className="bg-[#161616] px-6 py-[13px] text-center font-body text-[14px] text-white/80">
                    {lite === "—" ? (
                      <span className="text-white/25">—</span>
                    ) : lite.startsWith("✓") ? (
                      <span><span style={{ color: "#34C759" }}>✓</span>{lite.slice(1)}</span>
                    ) : lite}
                  </td>
                  <td className="bg-[#0a0f1a] px-6 py-[13px] text-center font-body text-[14px] font-medium text-white">
                    {pro === "—" ? (
                      <span className="text-white/25">—</span>
                    ) : pro.startsWith("✓") ? (
                      <span><span style={{ color: "#34C759" }}>✓</span>{pro.slice(1)}</span>
                    ) : pro}
                  </td>
                  <td className="bg-[#161616] px-6 py-[13px] text-center font-body text-[14px] text-white/80">
                    {max === "—" ? (
                      <span className="text-white/25">—</span>
                    ) : max.startsWith("✓") ? (
                      <span><span style={{ color: "#34C759" }}>✓</span>{max.slice(1)}</span>
                    ) : max}
                  </td>
                </tr>
              ))}

              {/* CTA row */}
              <tr>
                <td className="bg-[#111111] px-6 py-5" />
                <td className="bg-[#161616] px-6 py-5 text-center">
                  <a
                    href="#"
                    className="inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-full font-body text-[14px] font-medium no-underline transition-all"
                    style={{ border: "1.5px solid #34C759", color: "#34C759" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "#34C759";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#34C759";
                    }}
                  >
                    Buy Lite — $899
                  </a>
                </td>
                <td className="bg-[#0a0f1a] px-6 py-5 text-center">
                  <a
                    href="#"
                    className="inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-full font-body text-[14px] font-medium text-white no-underline transition-all hover:opacity-90"
                    style={{ background: "#0071E3" }}
                  >
                    Buy Pro — $1,799
                  </a>
                </td>
                <td className="bg-[#161616] px-6 py-5 text-center">
                  <a
                    href="#"
                    className="inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-full font-body text-[14px] font-medium no-underline transition-all"
                    style={{ border: "1.5px solid #FF9F0A", color: "#FF9F0A" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "#FF9F0A";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#FF9F0A";
                    }}
                  >
                    Buy Max — $3,299
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
