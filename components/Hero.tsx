import LineupIllustration from "./LineupIllustration";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-black pt-[52px]">
      {/* Subtle radial glow behind product */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(0,113,227,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Text content */}
      <div className="relative z-10 mt-20 px-6 text-center md:mt-28">
        <p className="mb-4 font-body text-[13px] uppercase tracking-[0.12em] text-white/50">
          Introducing the VoltCore Lineup
        </p>
        <h1 className="mx-auto mb-5 max-w-[700px] font-display text-[56px] font-semibold leading-[1.05] tracking-[-0.02em] text-white md:text-[72px]">
          Power for every journey.
        </h1>
        <p className="mx-auto mb-10 max-w-[480px] font-body text-[19px] leading-[28px] text-white/60">
          Three models. One family. Clean LiFePO₄ energy built for wherever life takes you.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#models"
            className="inline-flex h-11 cursor-pointer items-center rounded-full bg-white px-[28px] font-body text-[15px] font-medium text-black no-underline transition-colors hover:bg-white/90"
          >
            Shop Models
          </a>
          <a
            href="#compare"
            className="inline-flex h-11 cursor-pointer items-center rounded-full border border-white/40 px-[28px] font-body text-[15px] font-medium text-white no-underline transition-colors hover:border-white/70 hover:bg-white/10"
          >
            Compare Models
          </a>
        </div>
      </div>

      {/* Product illustration — bleeds into bottom */}
      <div className="relative z-10 mt-16 w-full max-w-[900px] px-6 pb-0">
        <LineupIllustration />
      </div>
    </section>
  );
}
