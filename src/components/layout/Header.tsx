"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MobileNav from "./MobileNav";

const NAV_ITEMS = [
  { href: "/", label: "首页" },
  { href: "/pathways", label: "所有路径" },
  { href: "/countries", label: "国家" },
  { href: "/experiences", label: "经验分享" },
  { href: "/glossary", label: "术语表" },
  { href: "/about", label: "关于" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="glass border-b border-earth-200/40">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <svg
                className="w-6 h-6 text-seed-400 transition-transform group-hover:rotate-12"
                viewBox="0 0 24 24"
                fill="currentColor"
                opacity="0.8"
              >
                <circle cx="12" cy="17" r="2" />
                <path d="M12 15v-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M12 10l-4-5a1 1 0 011.5-1l2.5 3 2.5-3a1 1 0 011.5 1l-4 5z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M9 12l-6-3a1 1 0 01.5-2l3.5 3 1-4.5a1 1 0 011.8 0l1 4.5 3.5-3a1 1 0 01.5 2l-6 3z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M15 12l6-3a1 1 0 00-.5-2l-3.5 3-1-4.5a1 1 0 00-1.8 0l-1 4.5-3.5-3a1 1 0 00-.5 2l6 3z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              <span className="font-[family-name:var(--font-display)] text-lg text-earth-800">
                飘向远方
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1.5 text-sm text-earth-600 hover:text-earth-900 hover:bg-earth-100/50 rounded-full transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-earth-600 hover:text-earth-900"
              aria-label="打开菜单"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} items={NAV_ITEMS} />
    </>
  );
}
