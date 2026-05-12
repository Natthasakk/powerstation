const cases = [
  {
    title: "Outdoor & Camping",
    sub: "Lite 1000",
    desc: "Run a camp fridge 30+ hrs, charge all gear, power lights and fans. No generator, no noise.",
    bg: "#0a1628",
    accent: "#34C759",
    icon: (
      <svg width="120" height="120" viewBox="0 0 140 140" fill="none" aria-hidden>
        <circle cx="30" cy="28" r="2.5" fill="#34C759" opacity="0.4"/>
        <circle cx="105" cy="22" r="3" fill="#34C759" opacity="0.3"/>
        <circle cx="118" cy="55" r="2" fill="#34C759" opacity="0.25"/>
        <path d="M90 30 A16 16 0 1 1 90 58 A10 10 0 1 0 90 30Z" fill="#34C759" opacity="0.08"/>
        <polygon points="70,28 15,105 125,105" fill="none" stroke="#34C759" strokeWidth="2.5" strokeLinejoin="round"/>
        <line x1="70" y1="28" x2="70" y2="105" stroke="#34C759" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.4"/>
        <line x1="8" y1="105" x2="132" y2="105" stroke="#34C759" strokeWidth="1.5" opacity="0.3"/>
        <rect x="83" y="88" width="26" height="16" rx="3" fill="#1a1a1a"/>
        <rect x="86" y="91" width="14" height="10" rx="1.5" fill="#34C759" opacity="0.7"/>
      </svg>
    ),
  },
  {
    title: "Home Backup",
    sub: "Pro 2000",
    desc: "Keep fridge, lights, router and medical devices running for up to 24 hrs during any outage.",
    bg: "#0a0f1f",
    accent: "#0071E3",
    icon: (
      <svg width="120" height="120" viewBox="0 0 140 140" fill="none" aria-hidden>
        <polygon points="70,18 12,65 24,65 24,118 116,118 116,65 128,65" fill="none" stroke="#0071E3" strokeWidth="2.5" strokeLinejoin="round"/>
        <rect x="55" y="84" width="30" height="34" rx="3" fill="none" stroke="#0071E3" strokeWidth="1.5"/>
        <rect x="28" y="72" width="22" height="18" rx="2" fill="#0071E3" opacity="0.15"/>
        <rect x="90" y="72" width="22" height="18" rx="2" fill="#0071E3" opacity="0.15"/>
        <path d="M74 42 L66 60 L73 60 L63 78 L78 57 L71 57 Z" fill="#0071E3" opacity="0.8"/>
      </svg>
    ),
  },
  {
    title: "Work Sites",
    sub: "Max 4000",
    desc: "Power tools, compressors, and lighting rigs all day at 4,000W continuous. Zero emissions on site.",
    bg: "#1a0e00",
    accent: "#FF9F0A",
    icon: (
      <svg width="120" height="120" viewBox="0 0 140 140" fill="none" aria-hidden>
        <rect x="18" y="50" width="104" height="60" rx="8" fill="none" stroke="#FF9F0A" strokeWidth="2.5"/>
        <rect x="28" y="40" width="40" height="70" rx="5" fill="none" stroke="#FF9F0A" strokeWidth="2"/>
        <rect x="38" y="30" width="20" height="12" rx="3" fill="none" stroke="#FF9F0A" strokeWidth="1.5"/>
        <path d="M82 72 L104 72" stroke="#FF9F0A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M96 65 L96 79" stroke="#FF9F0A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M34 54 L30 64 L36 64 L28 80 L40 62 L34 62 Z" fill="#FF9F0A" opacity="0.8"/>
      </svg>
    ),
  },
  {
    title: "Van Life & RV",
    sub: "Any Model",
    desc: "Silent, odorless hub for your rolling home. Pair with roof solar for completely self-sufficient living.",
    bg: "#021409",
    accent: "#34C759",
    icon: (
      <svg width="120" height="120" viewBox="0 0 140 140" fill="none" aria-hidden>
        <rect x="12" y="62" width="116" height="52" rx="10" fill="none" stroke="#34C759" strokeWidth="2.5"/>
        <path d="M22 62 L35 34 L100 34 L120 62" fill="none" stroke="#34C759" strokeWidth="2.5" strokeLinejoin="round"/>
        <circle cx="38" cy="116" r="14" fill="none" stroke="#34C759" strokeWidth="2.5"/>
        <circle cx="38" cy="116" r="5" fill="#34C759" opacity="0.3"/>
        <circle cx="102" cy="116" r="14" fill="none" stroke="#34C759" strokeWidth="2.5"/>
        <circle cx="102" cy="116" r="5" fill="#34C759" opacity="0.3"/>
        <rect x="42" y="24" width="56" height="12" rx="2" fill="#34C759" opacity="0.3"/>
        <line x1="56" y1="24" x2="56" y2="36" stroke="#34C759" strokeWidth="1.5" opacity="0.6"/>
        <line x1="70" y1="24" x2="70" y2="36" stroke="#34C759" strokeWidth="1.5" opacity="0.6"/>
        <line x1="84" y1="24" x2="84" y2="36" stroke="#34C759" strokeWidth="1.5" opacity="0.6"/>
      </svg>
    ),
  },
];

export default function UseCases() {
  return (
    <section id="usecases" className="bg-black px-6 py-24 md:px-10 md:py-[102px]">
      <div className="mx-auto max-w-[1080px]">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 font-body text-[13px] uppercase tracking-[0.12em] text-white/40">
            Use Cases
          </p>
          <h2 className="mb-4 font-display text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-white md:text-[48px]">
            Power where you need it.
          </h2>
          <p className="mx-auto max-w-[420px] font-body text-[17px] leading-[26px] text-white/50">
            There&apos;s a VoltCore for every scenario — from weekend adventures to professional work sites.
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {cases.map((c) => (
            <div
              key={c.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1"
              style={{ background: c.bg }}
            >
              {/* Subtle inner glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${c.accent}18 0%, transparent 70%)`,
                }}
              />
              {/* Top accent line */}
              <div className="absolute left-0 top-0 h-[2px] w-full rounded-t-2xl" style={{ background: c.accent }} />

              <div className="relative z-10 flex flex-1 flex-col">
                <div className="mb-6">{c.icon}</div>
                <div
                  className="mb-1 font-body text-[11px] font-semibold uppercase tracking-[0.1em]"
                  style={{ color: c.accent }}
                >
                  {c.sub}
                </div>
                <h3 className="mb-2 font-display text-[22px] font-semibold text-white">
                  {c.title}
                </h3>
                <p className="font-body text-[14px] leading-[21px] text-white/55">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
