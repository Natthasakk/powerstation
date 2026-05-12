"use client";

type Model = {
  name: string;
  tagline: string;
  price: string;
  accent: string;
  featured: boolean;
  specs: { label: string; value: string }[];
  ctaLabel: string;
  ctaBg: string;
  ctaText: string;
  ctaBorder: string;
  ctaHover: string;
  illustration: React.ReactNode;
};

const models: Model[] = [
  {
    name: "VoltCore Lite 1000",
    tagline: "Weekend trips and light backup power.",
    price: "$899",
    accent: "#34C759",
    featured: false,
    specs: [
      { label: "Capacity",    value: "1,024 Wh" },
      { label: "AC Output",   value: "1,000W" },
      { label: "Fast Charge", value: "1.5 hrs" },
      { label: "Solar Input", value: "400W" },
      { label: "Weight",      value: "11.2 kg" },
    ],
    ctaLabel: "Order Lite — $899",
    ctaBg: "transparent",
    ctaText: "#34C759",
    ctaBorder: "#34C759",
    ctaHover: "",
    illustration: (
      <svg width="160" height="120" viewBox="0 0 160 120" fill="none" aria-hidden>
        <ellipse cx="80" cy="113" rx="58" ry="5" fill="#34C759" opacity="0.08"/>
        <rect x="20" y="22" width="120" height="86" rx="10" fill="#1a1a1a"/>
        <rect x="20" y="22" width="120" height="3" rx="1.5" fill="#34C759"/>
        <rect x="27" y="28" width="106" height="72" rx="7" fill="#242426"/>
        <rect x="60" y="8" width="40" height="16" rx="8" fill="#2C2C2E"/>
        <rect x="35" y="37" width="56" height="42" rx="5" fill="#0A0A0C"/>
        <rect x="40" y="42" width="46" height="32" rx="4" fill="#0D1117"/>
        <text x="63" y="63" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="18" fontWeight="700" fill="#34C759">74%</text>
        <rect x="43" y="68" width="40" height="4" rx="2" fill="#1C1C1E"/>
        <rect x="43" y="68" width="30" height="4" rx="2" fill="#34C759"/>
        <rect x="100" y="38" width="44" height="22" rx="4" fill="#1A1A1C"/>
        <ellipse cx="111" cy="48" rx="4" ry="5" stroke="#636366" strokeWidth="1" fill="none"/>
        <ellipse cx="124" cy="48" rx="4" ry="5" stroke="#636366" strokeWidth="1" fill="none"/>
        <line x1="117" y1="54" x2="117" y2="58" stroke="#636366" strokeWidth="1" strokeLinecap="round"/>
        <rect x="100" y="65" width="20" height="8" rx="2" fill="#34C759" opacity="0.8"/>
        <rect x="124" y="65" width="20" height="8" rx="2" fill="#34C759" opacity="0.6"/>
        <rect x="100" y="77" width="20" height="8" rx="2" fill="#2a2a2a"/>
        <rect x="124" y="77" width="20" height="8" rx="2" fill="#2a2a2a"/>
      </svg>
    ),
  },
  {
    name: "VoltCore Pro 2000",
    tagline: "The ultimate all-rounder for home and adventure.",
    price: "$1,799",
    accent: "#0071E3",
    featured: true,
    specs: [
      { label: "Capacity",    value: "2,048 Wh" },
      { label: "AC Output",   value: "2,000W" },
      { label: "Fast Charge", value: "1.8 hrs" },
      { label: "Solar Input", value: "800W" },
      { label: "Weight",      value: "18.2 kg" },
    ],
    ctaLabel: "Order Pro — $1,799",
    ctaBg: "#0071E3",
    ctaText: "#fff",
    ctaBorder: "#0071E3",
    ctaHover: "",
    illustration: (
      <svg width="160" height="120" viewBox="0 0 160 120" fill="none" aria-hidden>
        <ellipse cx="80" cy="113" rx="62" ry="5" fill="#0071E3" opacity="0.1"/>
        <rect x="14" y="18" width="132" height="90" rx="11" fill="#1a1a1a"/>
        <rect x="14" y="18" width="132" height="4" rx="2" fill="#0071E3"/>
        <rect x="22" y="26" width="116" height="74" rx="8" fill="#242426"/>
        <rect x="56" y="4" width="48" height="16" rx="8" fill="#2C2C2E"/>
        <rect x="30" y="35" width="60" height="46" rx="6" fill="#0A0A0C"/>
        <rect x="36" y="41" width="48" height="34" rx="4" fill="#0D1117"/>
        <text x="60" y="63" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="20" fontWeight="700" fill="#0071E3">86%</text>
        <rect x="40" y="68" width="40" height="5" rx="2.5" fill="#1C1C1E"/>
        <rect x="40" y="68" width="34" height="5" rx="2.5" fill="#0071E3"/>
        <rect x="98" y="36" width="44" height="20" rx="3" fill="#1A1A1C"/>
        <ellipse cx="109" cy="45" rx="4" ry="5" stroke="#636366" strokeWidth="1" fill="none"/>
        <ellipse cx="122" cy="45" rx="4" ry="5" stroke="#636366" strokeWidth="1" fill="none"/>
        <line x1="116" y1="52" x2="116" y2="55" stroke="#636366" strokeWidth="1" strokeLinecap="round"/>
        <rect x="98" y="59" width="44" height="20" rx="3" fill="#1A1A1C"/>
        <ellipse cx="109" cy="68" rx="4" ry="5" stroke="#636366" strokeWidth="1" fill="none"/>
        <ellipse cx="122" cy="68" rx="4" ry="5" stroke="#636366" strokeWidth="1" fill="none"/>
        <line x1="116" y1="75" x2="116" y2="78" stroke="#636366" strokeWidth="1" strokeLinecap="round"/>
        <rect x="98" y="83" width="20" height="8" rx="2" fill="#0071E3" opacity="0.85"/>
        <rect x="122" y="83" width="20" height="8" rx="2" fill="#5AC8FA" opacity="0.85"/>
      </svg>
    ),
  },
  {
    name: "VoltCore Max 4000",
    tagline: "Whole-home backup and heavy-duty work sites.",
    price: "$3,299",
    accent: "#FF9F0A",
    featured: false,
    specs: [
      { label: "Capacity",    value: "4,096 Wh" },
      { label: "AC Output",   value: "4,000W" },
      { label: "Fast Charge", value: "2.1 hrs" },
      { label: "Solar Input", value: "1,600W" },
      { label: "Weight",      value: "34.5 kg" },
    ],
    ctaLabel: "Order Max — $3,299",
    ctaBg: "transparent",
    ctaText: "#FF9F0A",
    ctaBorder: "#FF9F0A",
    ctaHover: "",
    illustration: (
      <svg width="160" height="120" viewBox="0 0 160 120" fill="none" aria-hidden>
        <ellipse cx="80" cy="113" rx="66" ry="5" fill="#FF9F0A" opacity="0.08"/>
        <rect x="10" y="14" width="140" height="96" rx="12" fill="#1a1a1a"/>
        <rect x="10" y="14" width="140" height="4" rx="2" fill="#FF9F0A"/>
        <rect x="18" y="22" width="124" height="80" rx="9" fill="#242426"/>
        <rect x="54" y="2" width="52" height="14" rx="7" fill="#2C2C2E"/>
        <rect x="26" y="32" width="64" height="50" rx="6" fill="#0A0A0C"/>
        <rect x="32" y="38" width="52" height="38" rx="4" fill="#0D1117"/>
        <text x="58" y="62" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="22" fontWeight="700" fill="#FF9F0A">92%</text>
        <rect x="36" y="68" width="44" height="5" rx="2.5" fill="#1C1C1E"/>
        <rect x="36" y="68" width="40" height="5" rx="2.5" fill="#FF9F0A"/>
        <rect x="100" y="30" width="40" height="18" rx="3" fill="#1A1A1C"/>
        <ellipse cx="110" cy="38" rx="4" ry="4.5" stroke="#636366" strokeWidth="1" fill="none"/>
        <ellipse cx="130" cy="38" rx="4" ry="4.5" stroke="#636366" strokeWidth="1" fill="none"/>
        <line x1="120" y1="44" x2="120" y2="47" stroke="#636366" strokeWidth="1" strokeLinecap="round"/>
        <rect x="100" y="51" width="40" height="18" rx="3" fill="#1A1A1C"/>
        <ellipse cx="110" cy="59" rx="4" ry="4.5" stroke="#636366" strokeWidth="1" fill="none"/>
        <ellipse cx="130" cy="59" rx="4" ry="4.5" stroke="#636366" strokeWidth="1" fill="none"/>
        <line x1="120" y1="65" x2="120" y2="68" stroke="#636366" strokeWidth="1" strokeLinecap="round"/>
        <rect x="100" y="72" width="40" height="18" rx="3" fill="#1A1A1C"/>
        <ellipse cx="110" cy="80" rx="4" ry="4.5" stroke="#636366" strokeWidth="1" fill="none"/>
        <ellipse cx="130" cy="80" rx="4" ry="4.5" stroke="#636366" strokeWidth="1" fill="none"/>
        <line x1="120" y1="86" x2="120" y2="89" stroke="#636366" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function ModelCards() {
  return (
    <section id="models" className="bg-[#0d0d0d] px-6 py-24 md:px-10 md:py-[102px]">
      <div className="mx-auto max-w-[1080px]">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 font-body text-[13px] uppercase tracking-[0.12em] text-white/40">
            Choose Your Model
          </p>
          <h2 className="mb-4 font-display text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-white md:text-[48px]">
            Find your fit.
          </h2>
          <p className="mx-auto max-w-[440px] font-body text-[17px] leading-[26px] text-white/50">
            Three power levels. All the same clean, quiet LiFePO₄ energy — built to last 10 years.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {models.map((m) => (
            <div
              key={m.name}
              className={`relative flex flex-col overflow-hidden rounded-2xl border transition-transform duration-300 hover:-translate-y-1 ${
                m.featured
                  ? "border-[#0071E3]/50 bg-[#0a0f1a]"
                  : "border-white/10 bg-[#161616]"
              }`}
            >
              {/* Accent top bar */}
              <div className="h-[3px] w-full" style={{ background: m.accent }} />

              {/* Badge */}
              <div className="px-7 pt-6">
                {m.featured ? (
                  <span
                    className="inline-block rounded-full px-3 py-[3px] font-body text-[11px] font-semibold uppercase tracking-[0.07em] text-white"
                    style={{ background: m.accent }}
                  >
                    Most Popular
                  </span>
                ) : (
                  <div className="h-[22px]" />
                )}
              </div>

              {/* Illustration */}
              <div className="flex justify-center px-7 pt-4">
                {m.illustration}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col px-7 pb-7 pt-5">
                <h3 className="mb-1 font-display text-[18px] font-semibold text-white">
                  {m.name}
                </h3>
                <p className="mb-5 font-body text-[14px] leading-5 text-white/50">
                  {m.tagline}
                </p>
                <p className="mb-5 font-display text-[34px] font-semibold leading-none text-white">
                  {m.price}
                </p>

                {/* Specs */}
                <ul className="mb-7 space-y-0 border-b border-t border-white/10 py-1">
                  {m.specs.map((s, i) => (
                    <li
                      key={s.label}
                      className={`flex items-center justify-between py-[9px] font-body text-[13px] ${
                        i < m.specs.length - 1 ? "border-b border-white/[0.07]" : ""
                      }`}
                    >
                      <span className="text-white/50">{s.label}</span>
                      <span className="font-medium text-white">{s.value}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#compare"
                  className="mt-auto inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full font-body text-[15px] font-medium no-underline transition-all"
                  style={{
                    background: m.ctaBg,
                    color: m.ctaText,
                    border: `1.5px solid ${m.ctaBorder}`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = m.accent;
                    (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = m.ctaBg;
                    (e.currentTarget as HTMLAnchorElement).style.color = m.ctaText;
                  }}
                >
                  {m.ctaLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
