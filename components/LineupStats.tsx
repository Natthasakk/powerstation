const stats = [
  { value: "4,096", unit: " Wh", label: "Max capacity" },
  { value: "4,000", unit: " W",  label: "Max AC output" },
  { value: "1.5",   unit: " hrs", label: "Fastest full charge" },
  { value: "3,500", unit: "+",    label: "Cycle lifespan" },
];

export default function LineupStats() {
  return (
    <div className="border-b border-t border-white/10 bg-[#0d0d0d]">
      <div className="mx-auto grid max-w-[1080px] grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-6 py-10 text-center ${
              i < stats.length - 1 ? "md:border-r md:border-white/10" : ""
            } ${i === 1 ? "border-r border-white/10 md:border-r" : ""}`}
          >
            <p className="font-display text-[40px] font-semibold leading-none tracking-[-0.02em] text-white">
              {s.value}
              <span className="text-[24px] font-normal text-white/50">{s.unit}</span>
            </p>
            <p className="mt-2 font-body text-[13px] text-white/50">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
