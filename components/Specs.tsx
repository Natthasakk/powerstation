const rows = [
  ["Capacity",          "2,048 Wh  (25.6V / 80Ah)"],
  ["Battery Type",      "LiFePO₄ (Lithium Iron Phosphate)"],
  ["AC Output",         "2,000W continuous / 4,000W peak surge"],
  ["AC Waveform",       "Pure Sine Wave — 60 Hz ± 0.1 Hz"],
  ["USB-C Output",      "2× 140W PD  +  2× 60W PD"],
  ["USB-A Output",      "2× 18W Quick Charge 3.0"],
  ["Car Port Output",   "12V / 10A (120W max)"],
  ["AC Charge Input",   "1,800W — 0→100% in 1.8 hrs"],
  ["Solar Input",       "Up to 800W  |  10–60V  |  30A max"],
  ["Car Charge Input",  "12V–30V / 8A max"],
  ["Cycle Life",        "3,500+ cycles to 80% capacity"],
  ["Operating Temp",    "-20°C to 40°C  (charge: 0°C to 40°C)"],
  ["Weight",            "18.2 kg  (40.1 lbs)"],
  ["Dimensions",        "50.4 × 28.2 × 36.4 cm"],
  ["Certifications",    "UL, FCC, CE, RoHS, UN38.3"],
  ["Warranty",          "5 Years"],
];

export default function Specs() {
  return (
    <section id="specs" className="bg-surface-alt px-11 py-[102px]">
      <div className="mx-auto max-w-[1080px]">
        {/* Header */}
        <div className="mb-11 text-center">
          <p className="mb-1 font-body text-[13px] uppercase tracking-[0.08em] text-primary">
            Technical Specifications
          </p>
          <h2 className="mb-3 font-display text-[40px] font-semibold leading-[52px] tracking-[-0.01em] text-ink">
            Every detail.
          </h2>
          <p className="mx-auto max-w-[480px] font-body text-[17px] leading-[26px] text-ink-muted">
            VoltCore Pro 2000 — designed and tested to the highest standards.
          </p>
        </div>

        {/* Table */}
        <div className="mx-auto max-w-[640px] rounded-[8px] border border-divider bg-white px-5">
          <table className="w-full border-collapse">
            <tbody>
              {rows.map(([label, value], i) => (
                <tr
                  key={label}
                  className={i < rows.length - 1 ? "border-b border-divider" : ""}
                >
                  <td className="w-[42%] py-[14px] font-body text-[15px] leading-[22px] text-ink-muted">
                    {label}
                  </td>
                  <td className="py-[14px] font-body text-[15px] leading-[22px] text-ink">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
