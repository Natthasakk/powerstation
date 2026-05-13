const features = [
  {
    eyebrow: "เทคโนโลยีแบตเตอรี่",
    title: "สร้างมาเพื่อความทนทานเหนือระดับ",
    desc: "เทคโนโลยี LiFePO₄ มอบรอบการใช้งานกว่า 3,500+ รอบ — นานกว่า 10 ปีสำหรับการใช้งานทุกวัน — ปลอดภัยสูงสุดโดยไม่มีความเสี่ยงจากการลุกไหม้",
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
    eyebrow: "รองรับโซล่าร์เซลล์",
    title: "รองรับไฟเข้าสูงสุด 1,600W",
    desc: "ทุกรุ่นรองรับการชาร์จด้วยโซล่าร์ โดยรุ่น Max 4000 สามารถรับไฟได้ถึง 1,600W พร้อมกัน — ชาร์จเต็มจากแสงแดดในเวลาเพียง 2.5 ชม. ในวันที่ฟ้าใส",
    large: false,
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
        <circle cx="28" cy="28" r="18" stroke="#e5e7eb" strokeWidth="2"/>
        <path d="M28 12 L31 20 L40 20 L33 26 L36 34 L28 30 L20 34 L23 26 L16 20 L25 20Z" fill="#FF9F0A"/>
      </svg>
    ),
  },
  {
    eyebrow: "การชาร์จ X-Stream",
    title: "0 → 100% ในเวลาไม่ถึง 2 ชม.",
    desc: "อัลกอริทึมการชาร์จเร็ว 1,800W–3,000W ที่เป็นเอกสิทธิ์เฉพาะ ช่วยให้ชาร์จไฟได้เต็มความจุเร็วกว่าคู่แข่งในระดับเดียวกัน",
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
    eyebrow: "จอแสดงผลอัจฉริยะ",
    title: "แสดงข้อมูลพลังงานแบบเรียลไทม์",
    desc: "ทุกรุ่นมาพร้อมจอ LCD ที่แสดงผลวัตต์เข้า-ออก อุณหภูมิแบตเตอรี่ และการนับเวลาถอยหลังจนกว่าจะเต็มหรือหมดอย่างแม่นยำ",
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
        <div className="mb-16 max-w-[540px]">
          <p className="mb-3 font-body text-[14px] font-bold uppercase tracking-[0.15em] text-[#1a432a]">
            สิ่งที่ทำให้เราแตกต่าง
          </p>
          <h2 className="mb-4 font-display text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1d1d1f] md:text-[56px]">
            สร้างขึ้นเพื่อการใช้งานระยะยาว
          </h2>
          <p className="font-body text-[19px] leading-[28px] text-[#86868b]">
            ทุกโมเดลใช้เทคโนโลยีหลักเดียวกัน — ออกแบบมาให้ทำงานในสภาวะสุดขั้วและมีอายุการใช้งานนานกว่าที่เคยมีมา
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Row 1: large (7 col) + small (5 col) */}
          <div className="group flex flex-col rounded-3xl bg-[#f5f5f7] p-10 transition-all duration-300 hover:shadow-xl md:col-span-7">
            <div className="mb-8 scale-110 origin-left">{features[0].icon}</div>
            <p className="mb-2 font-body text-[12px] font-bold uppercase tracking-[0.1em] text-[#1a432a]">
              {features[0].eyebrow}
            </p>
            <h3 className="mb-4 font-display text-[28px] font-bold leading-[1.1] tracking-[-0.01em] text-[#1d1d1f]">
              {features[0].title}
            </h3>
            <p className="font-body text-[16px] leading-relaxed text-[#86868b]">
              {features[0].desc}
            </p>
          </div>

          <div className="group flex flex-col rounded-3xl bg-[#f5f5f7] p-10 transition-all duration-300 hover:shadow-xl md:col-span-5">
            <div className="mb-8 scale-110 origin-left">{features[1].icon}</div>
            <p className="mb-2 font-body text-[12px] font-bold uppercase tracking-[0.1em] text-[#1a432a]">
              {features[1].eyebrow}
            </p>
            <h3 className="mb-4 font-display text-[28px] font-bold leading-[1.1] tracking-[-0.01em] text-[#1d1d1f]">
              {features[1].title}
            </h3>
            <p className="font-body text-[16px] leading-relaxed text-[#86868b]">
              {features[1].desc}
            </p>
          </div>

          {/* Row 2: small (5 col) + large (7 col) */}
          <div className="group flex flex-col rounded-3xl bg-[#f5f5f7] p-10 transition-all duration-300 hover:shadow-xl md:col-span-5">
            <div className="mb-8 scale-110 origin-left">{features[2].icon}</div>
            <p className="mb-2 font-body text-[12px] font-bold uppercase tracking-[0.1em] text-[#1a432a]">
              {features[2].eyebrow}
            </p>
            <h3 className="mb-4 font-display text-[28px] font-bold leading-[1.1] tracking-[-0.01em] text-[#1d1d1f]">
              {features[2].title}
            </h3>
            <p className="font-body text-[16px] leading-relaxed text-[#86868b]">
              {features[2].desc}
            </p>
          </div>

          <div className="group flex flex-col rounded-3xl bg-[#f5f5f7] p-10 transition-all duration-300 hover:shadow-xl md:col-span-7">
            <div className="mb-8 scale-110 origin-left">{features[3].icon}</div>
            <p className="mb-2 font-body text-[12px] font-bold uppercase tracking-[0.1em] text-[#1a432a]">
              {features[3].eyebrow}
            </p>
            <h3 className="mb-4 font-display text-[28px] font-bold leading-[1.1] tracking-[-0.01em] text-[#1d1d1f]">
              {features[3].title}
            </h3>
            <p className="font-body text-[16px] leading-relaxed text-[#86868b]">
              {features[3].desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
