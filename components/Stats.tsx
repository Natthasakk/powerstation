const stats = [
  { value: "2,048", unit: " Wh", label: "Capacity" },
  { value: "2,000", unit: " W",  label: "AC Output" },
  { value: "1.8",   unit: " hrs", label: "Full Charge" },
  { value: "3,500", unit: "+",    label: "Charge Cycles" },
];

export default function Stats() {
  return (
    <div className="border-b border-t border-divider bg-white px-11 py-11">
      <div className="mx-auto grid max-w-[1080px] grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-3 py-5 text-center ${
              i < stats.length - 1 ? "border-r border-divider last:border-r-0" : ""
            }`}
          >
            <p className="font-display text-[34px] font-semibold leading-[36px] tracking-[0.004em] text-ink">
              {s.value}
              <span className="text-[20px] font-normal text-ink-muted">{s.unit}</span>
            </p>
            <p className="mt-1 font-body text-[14px] leading-5 text-ink-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
