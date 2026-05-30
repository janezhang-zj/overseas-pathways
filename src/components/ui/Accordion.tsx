"use client";

import { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: React.ReactNode;
}

export default function Accordion({ title, children, defaultOpen = false, badge }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-earth-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-left hover:bg-earth-50/50 transition-colors rounded-sm px-1"
      >
        <span className="flex items-center gap-2 text-earth-800 font-medium text-sm">
          {title}
          {badge}
        </span>
        <svg
          className={`w-4 h-4 text-earth-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[2000px] pb-3" : "max-h-0"
        }`}
      >
        <div className="text-earth-600 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
