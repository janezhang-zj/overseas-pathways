"use client";

import Link from "next/link";

interface NavItem {
  href: string;
  label: string;
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}

export default function MobileNav({ open, onClose, items }: MobileNavProps) {
  return (
    <>
      {/* 遮罩 */}
      <div
        className={`fixed inset-0 z-40 bg-earth-900/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* 侧滑面板 */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 glass shadow-xl transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-earth-200/40">
          <span className="font-[family-name:var(--font-display)] text-earth-800">导航</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-earth-500 hover:text-earth-800"
            aria-label="关闭菜单"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="px-4 py-3 text-earth-700 hover:text-earth-900 hover:bg-earth-100/50 rounded-xl transition-colors text-base"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
