const columns = [
  {
    title: "Products",
    links: ["VoltCore Lite 1000", "VoltCore Pro 2000", "VoltCore Max 4000", "Solar Panels", "Accessories"],
  },
  {
    title: "Support",
    links: ["User Manuals", "FAQ", "Warranty", "Contact Us"],
  },
  {
    title: "Company",
    links: ["About VoltCore", "Blog", "Press", "Careers"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Use", "Certifications", "Sitemap"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black px-11 pt-[102px] pb-11">
      <div className="mx-auto max-w-[1080px]">
        <div className="mb-11 grid grid-cols-2 gap-11 border-b border-[#424245] pb-11 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-3 font-body text-[13px] font-semibold text-[#F5F5F7]">{col.title}</p>
              <ul role="list" className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-[13px] leading-[18px] text-[#AEAEB2] no-underline transition-colors hover:text-[#F5F5F7]"
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
          <p className="font-body text-[13px] leading-[18px] text-[#6E6E73]">
            Copyright © 2026 VoltCore Inc. All rights reserved.
          </p>
          <p className="font-body text-[13px] leading-[18px] text-[#6E6E73]">
            All VoltCore models are UL, FCC, and CE certified. Product images are for illustration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
