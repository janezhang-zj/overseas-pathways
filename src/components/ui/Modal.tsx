"use client";

import { useEffect, useCallback, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, handleKey]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* 遮罩 */}
      <div className="absolute inset-0 bg-earth-900/40 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]" />

      {/* 模态框内容 */}
      <div
        className="relative glass rounded-2xl w-full max-w-[680px] max-h-[85vh] overflow-y-auto animate-[spiralIn_0.5s_ease-out]"
      >
        {/* 关闭按钮 */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-earth-100/50 hover:bg-earth-200/50 text-earth-500 transition-colors z-10"
          aria-label="关闭"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
