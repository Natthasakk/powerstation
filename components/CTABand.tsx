export default function CTABand() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-black px-6 py-24 text-center md:px-10 md:py-[102px]"
    >
      {/* Subtle blue-green radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,113,227,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[640px]">
        <p className="mb-4 font-body text-[13px] uppercase tracking-[0.12em] text-white/40">
          Get Started
        </p>
        <h2 className="mb-5 font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-white md:text-[56px]">
          Ready to go anywhere.
        </h2>
        <p className="mb-10 font-body text-[17px] leading-[26px] text-white/55">
          All VoltCore models ship free with a 5-year warranty and 30-day returns. No questions asked.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#models"
            className="inline-flex h-11 cursor-pointer items-center rounded-full bg-white px-[28px] font-body text-[15px] font-medium text-black no-underline transition-colors hover:bg-white/90"
          >
            Shop the Lineup
          </a>
          <a
            href="#compare"
            className="inline-flex h-11 cursor-pointer items-center rounded-full border border-white/40 px-[28px] font-body text-[15px] font-medium text-white no-underline transition-colors hover:border-white/70 hover:bg-white/10"
          >
            Compare Models
          </a>
        </div>
      </div>
    </section>
  );
}
