"use client";
import { useEffect, useState } from "react";

const links = [
  { href: "#models",   label: "Models" },
  { href: "#features", label: "Features" },
  { href: "#usecases", label: "Use Cases" },
  { href: "#compare",  label: "Compare" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[52px] max-w-[1280px] items-center justify-between px-10">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-[17px] font-semibold tracking-[-0.01em] text-white no-underline"
        >
          VoltCore
        </a>

        {/* Links */}
        <ul className="hidden items-center gap-10 md:flex" role="list">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-body text-[13px] text-white/70 no-underline transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#models"
          className="inline-flex h-9 cursor-pointer items-center rounded-full bg-white px-5 font-body text-[13px] font-medium text-black no-underline transition-colors hover:bg-white/90"
        >
          Shop Models
        </a>
      </div>
    </nav>
  );
}
