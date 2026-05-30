"use client";

import { useEffect, useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  depth: number; // 0=far 1=near
  phase: number;
  lines: number; // 冠毛数量
}

const PARTICLE_COUNT = 60;
const MOUSE_RADIUS = 200;

function createParticle(canvasW: number, canvasH: number): Particle {
  const depth = Math.random();
  return {
    x: Math.random() * canvasW,
    y: Math.random() * canvasH,
    size: 2 + depth * 3,
    speedX: (Math.random() - 0.5) * 0.3 * (1 - depth * 0.6),
    speedY: -0.2 - depth * 0.4,
    opacity: 0.15 + depth * 0.35,
    depth,
    phase: Math.random() * Math.PI * 2,
    lines: Math.floor(5 + Math.random() * 4),
  };
}

function drawSeed(
  ctx: CanvasRenderingContext2D,
  p: Particle
) {
  const { x, y, size, opacity, phase, lines } = p;

  // 冠毛
  ctx.strokeStyle = `rgba(180, 160, 130, ${opacity * 0.5})`;
  ctx.lineWidth = 0.4;

  for (let i = 0; i < lines; i++) {
    const angle = (Math.PI * 2 * i) / lines + phase * 0.3;
    const len = size * 2.5 + Math.sin(phase + i) * size;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
      x + Math.cos(angle) * len,
      y + Math.sin(angle) * len - len * 0.3
    );
    ctx.stroke();

    // 冠毛末端小亮点
    const tipX = x + Math.cos(angle) * len;
    const tipY = y + Math.sin(angle) * len - len * 0.3;
    ctx.fillStyle = `rgba(220, 200, 160, ${opacity * 0.6})`;
    ctx.beginPath();
    ctx.arc(tipX, tipY, 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 种子核心
  ctx.fillStyle = `rgba(150, 120, 90, ${opacity * 0.8})`;
  ctx.beginPath();
  ctx.arc(x, y, size * 0.55, 0, Math.PI * 2);
  ctx.fill();
}

export default function DandelionParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const isVisibleRef = useRef(true);
  const mouse = useMousePosition();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
    }
    resize();
    window.addEventListener("resize", resize);

    // 初始化粒子
    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(w, h)
      );
    }

    // IntersectionObserver 暂停不可见时的渲染
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animFrameRef.current) {
          tick();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    function tick() {
      if (!isVisibleRef.current) {
        animFrameRef.current = 0;
        return;
      }
      animFrameRef.current = requestAnimationFrame(tick);

      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const mx = mouse.x;
      const my = mouse.y;

      for (const p of particlesRef.current) {
        // 基础漂浮
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(Date.now() * 0.001 + p.phase) * 0.15;
        p.phase += 0.005;

        // 鼠标推开
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && mx > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * 1.5;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // 循环：到达顶部后从底部重新出现
        if (p.y < -20) {
          p.y = h + 20;
          p.x = Math.random() * w;
        }
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;

        drawSeed(ctx, p);
      }
    }

    tick();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [mouse]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
