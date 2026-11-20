import { cn } from "@/lib/utils";

/**
 * Architectural line drawings used wherever a photograph has not yet been
 * supplied. Each variant is a distinct, deterministic composition.
 */
export type BlueprintVariant = "tower" | "hotel" | "reactor" | "grid" | "section" | "network";

interface Props {
  variant: BlueprintVariant;
  className?: string;
  dark?: boolean;
  label?: string;
}

export function Blueprint({ variant, className, dark = true, label }: Props) {
  const stroke = dark ? "rgba(255,255,255,0.55)" : "rgba(15,23,42,0.45)";
  const faint = dark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.1)";
  const accent = "#E29432";

  return (
    <div className={cn("relative overflow-hidden", dark ? "bg-slate-ink" : "bg-white", className)}>
      <div className={cn("absolute inset-0", dark ? "grid-lines-dark" : "grid-lines")} aria-hidden />
      <svg viewBox="0 0 400 300" className="relative h-full w-full" fill="none" role="img" aria-label={label ?? `${variant} line drawing`}>
        {variant === "tower" && (
          <g strokeWidth="1">
            {Array.from({ length: 12 }).map((_, i) => (
              <rect key={i} x="150" y={40 + i * 19} width="100" height="19" stroke={stroke} />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <g key={`w${i}`}>
                {[0, 1, 2, 3].map((c) => (
                  <rect key={c} x={158 + c * 23} y={45 + i * 19} width="15" height="9" stroke={faint} />
                ))}
              </g>
            ))}
            <line x1="60" y1="268" x2="340" y2="268" stroke={stroke} />
            <rect x="110" y="232" width="40" height="36" stroke={faint} />
            <rect x="250" y="220" width="55" height="48" stroke={faint} />
            <line x1="270" y1="40" x2="270" y2="268" stroke={accent} strokeDasharray="3 4" />
            <text x="276" y="50" fill={accent} fontSize="9" fontFamily="monospace">L12</text>
            <text x="276" y="264" fill={accent} fontSize="9" fontFamily="monospace">L00</text>
            <path d="M150 30 L250 30" stroke={accent} />
            <path d="M150 26 V34 M250 26 V34" stroke={accent} />
          </g>
        )}
        {variant === "hotel" && (
          <g strokeWidth="1">
            <path d="M70 268 V120 L140 90 V268" stroke={stroke} />
            <rect x="140" y="70" width="190" height="198" stroke={stroke} />
            {Array.from({ length: 8 }).map((_, r) =>
              Array.from({ length: 7 }).map((__, c) => (
                <rect key={`${r}-${c}`} x={152 + c * 26} y={82 + r * 22} width="16" height="12" stroke={faint} />
              )),
            )}
            <path d="M200 268 V240 A35 35 0 0 1 270 240 V268" stroke={accent} />
            <line x1="40" y1="268" x2="360" y2="268" stroke={stroke} />
            <circle cx="105" cy="150" r="14" stroke={faint} />
            <text x="148" y="62" fill={accent} fontSize="9" fontFamily="monospace">ELEV. NORTH</text>
          </g>
        )}
        {variant === "reactor" && (
          <g strokeWidth="1">
            <rect x="60" y="120" width="280" height="110" stroke={stroke} />
            {[1, 2, 3, 4, 5].map((i) => (
              <line key={i} x1={60 + i * 46.6} y1={i % 2 ? 120 : 150} x2={60 + i * 46.6} y2={i % 2 ? 200 : 230} stroke={stroke} />
            ))}
            <path d="M30 140 H60 M340 210 H370" stroke={accent} />
            <path d="M364 204 L370 210 L364 216" stroke={accent} />
            {[90, 150, 200, 260, 310].map((x, i) => (
              <circle key={x} cx={x} cy={170 + (i % 2) * 18} r="4" stroke={faint} />
            ))}
            <path d="M200 120 V80 H260 V60" stroke={accent} strokeDasharray="3 3" />
            <text x="266" y="64" fill={accent} fontSize="9" fontFamily="monospace">BIOGAS</text>
            <text x="64" y="246" fill={stroke} fontSize="8" fontFamily="monospace">ANAEROBIC BAFFLE REACTOR — SECTION A-A</text>
          </g>
        )}
        {variant === "grid" && (
          <g strokeWidth="1">
            {[80, 160, 240, 320].map((x, i) => (
              <g key={x}>
                <line x1={x} y1="40" x2={x} y2="260" stroke={faint} />
                <circle cx={x} cy="28" r="10" stroke={stroke} />
                <text x={x - 3} y="31" fill={stroke} fontSize="9" fontFamily="monospace">{String.fromCharCode(65 + i)}</text>
              </g>
            ))}
            {[80, 150, 220].map((y, i) => (
              <g key={y}>
                <line x1="40" y1={y} x2="360" y2={y} stroke={faint} />
                <text x="20" y={y + 3} fill={stroke} fontSize="9" fontFamily="monospace">{i + 1}</text>
              </g>
            ))}
            <rect x="80" y="80" width="160" height="140" stroke={accent} />
            <rect x="240" y="150" width="80" height="70" stroke={stroke} />
          </g>
        )}
        {variant === "section" && (
          <g strokeWidth="1">
            <path d="M40 250 H360" stroke={stroke} />
            <path d="M80 250 V110 L200 50 L320 110 V250" stroke={stroke} />
            <path d="M80 170 H320 M80 210 H320" stroke={faint} />
            <path d="M200 50 V250" stroke={accent} strokeDasharray="4 4" />
            <path d="M330 110 V250 M326 110 H334 M326 250 H334" stroke={accent} />
            <text x="338" y="184" fill={accent} fontSize="9" fontFamily="monospace">+14.2</text>
          </g>
        )}
        {variant === "network" && (
          <g strokeWidth="1">
            {[
              [80, 80], [200, 60], [320, 90], [120, 180], [260, 170], [200, 250], [60, 240], [340, 230],
            ].map(([x, y], i, arr) => (
              <g key={i}>
                {arr.slice(i + 1).filter((_, j) => (i + j) % 3 === 0).map(([x2, y2], j) => (
                  <line key={j} x1={x} y1={y} x2={x2} y2={y2} stroke={faint} />
                ))}
                <rect x={x - 6} y={y - 6} width="12" height="12" stroke={i === 4 ? accent : stroke} />
              </g>
            ))}
          </g>
        )}
      </svg>
      {label && (
        <span className={cn("label-mono absolute bottom-3 left-4", dark ? "text-white/50" : "text-slate-500")}>{label}</span>
      )}
    </div>
  );
}
