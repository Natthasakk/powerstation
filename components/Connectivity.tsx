const ports = [
  { label: "AC 120V Outlets — 2 to 6 per model" },
  { label: "USB-C PD — up to 140W per port" },
  { label: "USB-A Quick Charge 3.0" },
  { label: "Car Outlet 12V / 10A" },
  { label: "DC 5521 Barrel Port" },
  { label: "Solar / Anderson Input — up to 1,600W" },
];

export default function Connectivity() {
  return (
    <section id="connectivity" className="px-11 py-[102px]">
      <div className="mx-auto max-w-[1080px]">
        <div className="mb-11 text-center">
          <p className="mb-1 font-body text-[13px] uppercase tracking-[0.08em] text-primary">
            Ports Across the Lineup
          </p>
          <h2 className="mb-3 font-display text-[40px] font-semibold leading-[52px] tracking-[-0.01em] text-ink">
            Every port. Every device.
          </h2>
          <p className="mx-auto max-w-[480px] font-body text-[17px] leading-[26px] text-ink-muted">
            From 2 AC outlets on the Lite to 6 on the Max — every VoltCore can run everything you need simultaneously.
          </p>
        </div>

        <div className="mb-11 flex flex-wrap justify-center gap-3">
          {ports.map((p) => (
            <span
              key={p.label}
              className="inline-flex items-center rounded-full border border-divider bg-surface-alt px-3 py-[6px] font-body text-[13px] leading-[18px] text-ink"
            >
              {p.label}
            </span>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#compare"
            className="inline-flex cursor-pointer items-center gap-1 bg-transparent font-body text-[17px] text-primary no-underline transition-colors hover:text-primary-strong"
          >
            See full model comparison →
          </a>
        </div>
      </div>
    </section>
  );
}
