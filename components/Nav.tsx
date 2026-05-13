"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "#models",   label: "รุ่นสินค้า" },
  { href: "#features", label: "คุณสมบัติ" },
  { href: "#usecases", label: "การใช้งาน" },
  { href: "#compare",  label: "เปรียบเทียบ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 bg-gray-100 border-b border-gray-300 ${
          scrolled || mobileMenuOpen
            ? "shadow-md backdrop-blur-xl bg-gray-100/95"
            : ""
        }`}
      >
        <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-[22px] font-bold tracking-[-0.01em] text-[#1a432a] no-underline"
          >
            VoltCore
          </Link>

          {/* Links (Desktop) */}
          <ul className="hidden items-center gap-10 md:flex" role="list">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-body text-[17px] font-medium text-gray-700 no-underline transition-colors hover:text-black"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a
              href="#models"
              className="inline-flex h-9 cursor-pointer items-center rounded-full bg-black px-5 font-body text-[15px] font-semibold text-white no-underline transition-colors hover:bg-black/80 md:h-10 md:px-6 md:text-[16px]"
            >
              เลือกซื้อ
            </a>
            
            {/* Mobile Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 md:hidden"
              aria-label="Toggle Menu"
            >
              <div className="relative h-3 w-4">
                <span className={`absolute block h-0.5 w-full bg-black transition-all ${mobileMenuOpen ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute block h-0.5 w-full bg-black transition-all ${mobileMenuOpen ? "opacity-0" : "top-1.5"}`} />
                <span className={`absolute block h-0.5 w-full bg-black transition-all ${mobileMenuOpen ? "top-1.5 -rotate-45" : "top-3"}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`overflow-hidden transition-all duration-300 md:hidden ${mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
          <ul className="flex flex-col border-t border-gray-300 bg-gray-100 px-6 py-4">
            {links.map((l) => (
              <li key={l.href} className="border-b border-gray-200 last:border-0">
                <a
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 font-body text-[18px] font-medium text-gray-800"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
