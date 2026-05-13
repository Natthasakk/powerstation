const columns = [
  {
    title: "สินค้า",
    links: ["VoltCore Lite 1000", "VoltCore Pro 2000", "VoltCore Max 4000", "แผงโซล่าร์เซลล์", "อุปกรณ์เสริม"],
  },
  {
    title: "สนับสนุน",
    links: ["คู่มือการใช้งาน", "คำถามที่พบบ่อย", "การรับประกัน", "ติดต่อเรา"],
  },
  {
    title: "บริษัท",
    links: ["เกี่ยวกับ VoltCore", "บล็อก", "ข่าวสาร", "ร่วมงานกับเรา"],
  },
  {
    title: "กฎหมาย",
    links: ["นโยบายความเป็นส่วนตัว", "เงื่อนไขการใช้งาน", "การรับรอง", "แผนผังเว็บไซต์"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] px-11 pt-[102px] pb-11">
      <div className="mx-auto max-w-[1080px]">
        <div className="mb-11 grid grid-cols-2 gap-11 border-b border-gray-300 pb-11 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-3 font-body text-[13px] font-semibold text-[#1d1d1f]">{col.title}</p>
              <ul role="list" className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-[13px] leading-[18px] text-[#6e6e73] no-underline transition-colors hover:text-[#1d1d1f]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <p className="font-body text-[13px] leading-[18px] text-[#86868b]">
            ลิขสิทธิ์ © 2026 VoltCore Inc. สงวนลิขสิทธิ์ทั้งหมด
          </p>
          <p className="font-body text-[13px] leading-[18px] text-[#86868b]">
            โมเดล VoltCore ทั้งหมดได้รับการรับรองมาตรฐาน UL, FCC และ CE รูปภาพสินค้าใช้เพื่อการโฆษณาเท่านั้น
          </p>
        </div>
      </div>
    </footer>
  );
}
