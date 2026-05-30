export default function ParallaxMountains() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* 天空渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-skywarm-50 via-skywarm-100/60 to-earth-50" />

      {/* 最远层山 — 移动最慢 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[55%]"
        style={{
          background:
            "radial-gradient(ellipse 130% 90% at 25% 100%, rgba(200, 180, 150, 0.35) 0%, transparent 65%), radial-gradient(ellipse 110% 80% at 65% 100%, rgba(190, 170, 140, 0.3) 0%, transparent 60%)",
          transform: "translateZ(-6px) scale(1.15)",
        }}
      />

      {/* 中间层山 — 移动中等 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%]"
        style={{
          background:
            "radial-gradient(ellipse 120% 75% at 15% 100%, rgba(180, 155, 130, 0.5) 0%, transparent 60%), radial-gradient(ellipse 100% 65% at 55% 100%, rgba(170, 145, 120, 0.45) 0%, transparent 55%), radial-gradient(ellipse 90% 60% at 80% 100%, rgba(190, 160, 135, 0.4) 0%, transparent 55%)",
          transform: "translateZ(-3px) scale(1.08)",
        }}
      />

      {/* 最近层山 — 移动最快 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[28%]"
        style={{
          background:
            "radial-gradient(ellipse 110% 65% at 30% 100%, rgba(160, 135, 110, 0.65) 0%, transparent 50%), radial-gradient(ellipse 100% 55% at 70% 100%, rgba(150, 125, 100, 0.55) 0%, transparent 48%)",
          transform: "translateZ(-1px) scale(1.03)",
        }}
      />

      {/* 噪点纹理 overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
