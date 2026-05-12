const features = [
  {
    eyebrow: "Battery Technology",
    title: "Built to outlast everything.",
    desc: "LiFePO₄ chemistry delivers 3,500+ cycles — over a decade of daily use — with no thermal runaway risk. The safest portable battery you can own.",
    large: true,
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
        <rect x="4" y="16" width="40" height="26" rx="6" fill="#e5e7eb"/>
        <rect x="44" y="22" width="6" height="14" rx="3" fill="#e5e7eb"/>
        <rect x="8" y="20" width="24" height="18" rx="3" fill="#0071E3"/>
        <rect x="34" y="20" width="6" height="18" rx="2" fill="#bfd8f7"/>
      </svg>
    ),
  },
  {
    eyebrow: "Solar Ready",
    title: "Up to 1,600W solar input.",
    desc: "Every model accepts solar. The Max 4000 can absorb 1,600W simultaneously — fully charged from sunlight in about 2.5 hours on a clear day.",
    large: false,
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
        <circle cx="28" cy="28" r="18" stroke="#e5e7eb" strokeWidth="2"/>
        <path d="M28 12 L31 20 L40 20 L33 26 L36 34 L28 30 L20 34 L23 26 L16 20 L25 20Z" fill="#FF9F0A"/>
      </svg>
    ),
  },
  {
    eyebrow: "X-Stream Charging",
    title: "0 → 100% in under 2 hrs.",
    desc: "Proprietary 1,800W–3,000W fast-charge algorithms push each model to full capacity faster than any competitor in its class.",
    large: false,
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
        <circle cx="28" cy="28" r="18" stroke="#e5e7eb" strokeWidth="2"/>
        <path d="M22 28 L26 32 L34 24" stroke="#0071E3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28 10 L28 15 M42 14 L38.5 17.5 M46 28 L41 28" stroke="#0071E3" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    eyebrow: "Smart Display",
    title: "Real-time power intelligence.",
    desc: "Every model ships with an LCD that shows live wattage in and out, battery temperature, and a precise countdown to empty or full.",
    large: true,
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
        <rect x="8" y="15" width="40" height="26" rx="5" fill="#e5e7eb"/>
        <rect x="13" y="20" width="30" height="16" rx="2" fill="#1d1d1f"/>
        <rect x="16" y="23" width="12" height="10" rx="1" fill="#0071E3" opacity="0.9"/>
        <rect x="30" y="23" width="10" height="4" rx="1" fill="#34C759" opacity="0.9"/>
        <rect x="30" y="29" width="10" height="4" rx="1" fill="#FF9F0A" opacity="0.9"/>
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white px-6 py-24 md:px-10 md:py-[102px]">
      <div className="mx-auto max-w-[1080px]">
        {/* Header */}
        <div className="mb-16 max-w-[480px]">
          <p className="mb-3 font-body text-[13px] uppercase tracking-[0.12em] text-[#6e6e73]">
            What Sets Them Apart
          </p>
          <h2 className="mb-4 font-display text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1d1d1f] md:text-[48px]">
            Built for the long haul.
          </h2>
          <p className="font-body text-[17px] leading-[26px] text-[#6e6e73]">
            Every model shares the same core technology — engineered to perform in extreme conditions and outlast anything else on the market.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* Row 1: large (7 col) + small (5 col) */}
          <div className="flex flex-col rounded-2xl bg-[#f4f4f4] p-8 md:col-span-7">
            <div className="mb-5">{features[0].icon}</div>
            <p className="mb-2 font-body text-[12px] uppercase tracking-[0.1em] text-[#9e9ea0]">
              {features[0].eyebrow}
            </p>
            <h3 className="mb-3 font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#1d1d1f]">
              {features[0].title}
            </h3>
            <p className="font-body text-[15px] leading-[22px] text-[#6e6e73]">
              {features[0].desc}
            </p>
          </div>

          <div className="flex flex-col rounded-2xl bg-[#f4f4f4] p-8 md:col-span-5">
            <div className="mb-5">{features[1].icon}</div>
            <p className="mb-2 font-body text-[12px] uppercase tracking-[0.1em] text-[#9e9ea0]">
              {features[1].eyebrow}
            </p>
            <h3 className="mb-3 font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#1d1d1f]">
              {features[1].title}
            </h3>
            <p className="font-body text-[15px] leading-[22px] text-[#6e6e73]">
              {features[1].desc}
            </p>
          </div>

          {/* Row 2: small (5 col) + large (7 col) */}
          <div className="flex flex-col rounded-2xl bg-[#f4f4f4] p-8 md:col-span-5">
            <div className="mb-5">{features[2].icon}</div>
            <p className="mb-2 font-body text-[12px] uppercase tracking-[0.1em] text-[#9e9ea0]">
              {features[2].eyebrow}
            </p>
            <h3 className="mb-3 font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#1d1d1f]">
              {features[2].title}
            </h3>
            <p className="font-body text-[15px] leading-[22px] text-[#6e6e73]">
              {features[2].desc}
            </p>
          </div>

          <div className="flex flex-col rounded-2xl bg-[#f4f4f4] p-8 md:col-span-7">
            <div className="mb-5">{features[3].icon}</div>
            <p className="mb-2 font-body text-[12px] uppercase tracking-[0.1em] text-[#9e9ea0]">
              {features[3].eyebrow}
            </p>
            <h3 className="mb-3 font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#1d1d1f]">
              {features[3].title}
            </h3>
            <p className="font-body text-[15px] leading-[22px] text-[#6e6e73]">
              {features[3].desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
