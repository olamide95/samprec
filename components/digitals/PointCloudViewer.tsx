"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Pt = [number, number, number, number]; // x, y(up), z, intensity

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Procedural laser-scan of a 6-storey building with podium and site. */
function generateCloud(count: number): Pt[] {
  const r = mulberry32(42);
  const pts: Pt[] = [];
  const W = 28, D = 18, H = 54, floors = 6, fh = H / floors;
  const isWindow = (u: number, y: number) => {
    const fy = (y % fh) / fh;
    const bay = (u % 4.5) / 4.5;
    return fy > 0.3 && fy < 0.82 && bay > 0.18 && bay < 0.85 && y > fh;
  };
  const push = (x: number, y: number, z: number, i: number) => pts.push([x, y, z, i]);
  for (let n = 0; n < count; n++) {
    const k = r();
    if (k < 0.62) {
      // facades
      const face = Math.floor(r() * 4);
      const y = r() * H;
      if (face < 2) {
        const x = (r() - 0.5) * W;
        if (isWindow(x + W / 2, y) && r() > 0.12) continue;
        push(x, y, face === 0 ? -D / 2 : D / 2, 0.55 + r() * 0.3);
      } else {
        const z = (r() - 0.5) * D;
        if (isWindow(z + D / 2, y) && r() > 0.12) continue;
        push(face === 2 ? -W / 2 : W / 2, y, z, 0.5 + r() * 0.3);
      }
    } else if (k < 0.72) {
      // floor slab edges
      const f = Math.floor(r() * (floors + 1));
      const y = f * fh;
      const edge = Math.floor(r() * 4);
      const t = r() - 0.5;
      const [x, z] = edge === 0 ? [t * W, -D / 2] : edge === 1 ? [t * W, D / 2] : edge === 2 ? [-W / 2, t * D] : [W / 2, t * D];
      push(x * 1.04, y, z * 1.06, 0.95);
    } else if (k < 0.78) {
      // roof plant
      push((r() - 0.5) * 9 + 5, H + r() * 4, (r() - 0.5) * 6, 0.8);
    } else if (k < 0.86) {
      // podium canopy
      push((r() - 0.5) * (W + 14), fh * 0.9 + r() * 0.4, -D / 2 - r() * 6, 0.7);
    } else {
      // ground / site
      const x = (r() - 0.5) * 90;
      const z = (r() - 0.5) * 70;
      const tree = r() < 0.08;
      push(x, tree ? r() * 6 : r() * 0.3, z, tree ? 0.35 : 0.2 + r() * 0.15);
    }
  }
  return pts;
}

interface Props {
  className?: string;
  controls?: boolean;
  initialDensity?: number;
}

export function PointCloudViewer({ className, controls = true, initialDensity = 26000 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [density, setDensity] = useState(initialDensity);
  const [mode, setMode] = useState<"height" | "intensity">("height");
  const [auto, setAuto] = useState(true);
  const state = useRef({ yaw: 0.7, pitch: 0.38, zoom: 1, drag: false, lx: 0, ly: 0, visible: true });
  const cloud = useRef<Pt[]>([]);

  useEffect(() => {
    cloud.current = generateCloud(density);
  }, [density]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const s = state.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (s.visible = e.isIntersecting));
    io.observe(canvas);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!s.visible) return;
      if (auto && !s.drag && !reduce) s.yaw += 0.0025;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      const cy = Math.cos(s.yaw), sy = Math.sin(s.yaw), cp = Math.cos(s.pitch), sp = Math.sin(s.pitch);
      const scale = (Math.min(width, height) / 95) * s.zoom;
      const cx0 = width / 2, cy0 = height * 0.62;
      for (const [x, y, z, inten] of cloud.current) {
        const yc = y - 22;
        const x1 = x * cy - z * sy;
        const z1 = x * sy + z * cy;
        const y2 = yc * cp - z1 * sp;
        const z2 = yc * sp + z1 * cp;
        const persp = 120 / (120 + z2);
        const px = cx0 + x1 * scale * persp;
        const py = cy0 - (y2 + 22 * cp) * scale * persp;
        if (px < 0 || py < 0 || px > width || py > height) continue;
        let color: string;
        if (mode === "height") {
          const t = Math.min(1, Math.max(0, y / 58));
          const rr = Math.round(226 + (255 - 226) * t), gg = Math.round(148 + (240 - 148) * t), bb = Math.round(50 + (220 - 50) * t);
          color = `rgba(${rr},${gg},${bb},${0.35 + inten * 0.55})`;
        } else {
          const v = Math.round(90 + inten * 165);
          color = `rgba(${v},${v},${Math.min(255, v + 20)},${0.3 + inten * 0.6})`;
        }
        ctx.fillStyle = color;
        const sz = persp * (y < 0.5 ? 0.9 : 1.3);
        ctx.fillRect(px, py, sz, sz);
      }
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [mode, auto]);

  const onDown = (e: React.PointerEvent) => {
    const s = state.current;
    s.drag = true;
    s.lx = e.clientX;
    s.ly = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const s = state.current;
    if (!s.drag) return;
    s.yaw += (e.clientX - s.lx) * 0.008;
    s.pitch = Math.max(-0.1, Math.min(1.2, s.pitch + (e.clientY - s.ly) * 0.005));
    s.lx = e.clientX;
    s.ly = e.clientY;
  };
  const onUp = () => (state.current.drag = false);
  const onWheel = (e: React.WheelEvent) => {
    if (!controls) return;
    const s = state.current;
    s.zoom = Math.max(0.6, Math.min(2.4, s.zoom - e.deltaY * 0.001));
  };

  return (
    <div className={cn("relative overflow-hidden bg-ink", className)}>
      <div className="grid-lines-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <canvas
        ref={canvasRef}
        className="relative h-full w-full cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onWheel={onWheel}
        role="img"
        aria-label="Interactive point cloud of a six-storey building. Drag to rotate."
      />
      {controls && (
        <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center gap-2 rounded-2xl bg-black/50 p-2 text-xs text-white backdrop-blur">
          <div className="flex rounded-full bg-white/10 p-0.5">
            {(["height", "intensity"] as const).map((m) => (
              <button key={m} type="button" onClick={() => setMode(m)} aria-pressed={mode === m} className={cn("rounded-full px-3 py-1 capitalize", mode === m ? "bg-copper-500 font-semibold text-ink" : "text-white/70")}>
                {m}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 px-2">
            <span className="text-white/60">Density</span>
            <input type="range" min={6000} max={60000} step={2000} value={density} onChange={(e) => setDensity(Number(e.target.value))} className="w-24 accent-[#E29432]" />
            <span className="w-14 font-mono">{(density / 1000).toFixed(0)}k pts</span>
          </label>
          <button type="button" onClick={() => setAuto((a) => !a)} className="ml-auto rounded-full px-3 py-1 ring-1 ring-white/20">{auto ? "Pause" : "Rotate"}</button>
        </div>
      )}
    </div>
  );
}
