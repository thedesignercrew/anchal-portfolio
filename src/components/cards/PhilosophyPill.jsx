import { useState, useRef } from "react";

// ─── Per-card SVG glyphs ─────────────────────────────────────────────────────
// Each draws itself via stroke-dashoffset animation when `visible` turns true.

const GlyphKnot = ({ visible }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}>
    <style>{`
      @keyframes drawKnot {
        to { stroke-dashoffset: 0; }
      }
    `}</style>
    {/* Tangled path that resolves into a smooth S-curve */}
    <path
      d="M20 90 C20 60 50 80 60 60 C70 40 40 20 60 20 C80 20 100 40 100 60 C100 80 80 90 60 80 C40 70 30 50 50 40"
      stroke="rgba(200,170,120,0.25)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M20 90 C20 60 50 80 60 60 C70 40 40 20 60 20 C80 20 100 40 100 60 C100 80 80 90 60 80 C40 70 30 50 50 40"
      stroke="#C8AA78"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="300"
      strokeDashoffset={visible ? "0" : "300"}
      style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
    />
    {/* Clean resolution line */}
    <line
      x1="50" y1="40" x2="100" y2="40"
      stroke="rgba(200,170,120,0.7)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="50"
      strokeDashoffset={visible ? "0" : "50"}
      style={{ transition: "stroke-dashoffset 0.5s ease 1s" }}
    />
    <circle
      cx="100" cy="40" r="3"
      fill="#C8AA78"
      opacity={visible ? 1 : 0}
      style={{ transition: "opacity 0.3s ease 1.4s" }}
    />
  </svg>
);

const GlyphTarget = ({ visible }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}>
    <style>{`
      @keyframes pulseRing {
        0%   { r: 18; opacity: 0.7; }
        100% { r: 44; opacity: 0; }
      }
    `}</style>
    {[44, 30, 18].map((r, i) => (
      <circle
        key={r} cx="60" cy="60" r={r}
        stroke="#C8AA78"
        strokeWidth="1"
        opacity={visible ? (i === 0 ? 0.15 : i === 1 ? 0.3 : 0.6) : 0}
        style={{ transition: `opacity 0.4s ease ${0.1 + i * 0.15}s` }}
      />
    ))}
    {/* Crosshair lines */}
    {[
      { x1: 60, y1: 16, x2: 60, y2: 38, len: 22 },
      { x1: 60, y1: 82, x2: 60, y2: 104, len: 22 },
      { x1: 16, y1: 60, x2: 38, y2: 60, len: 22 },
      { x1: 82, y1: 60, x2: 104, y2: 60, len: 22 },
    ].map(({ x1, y1, x2, y2, len }, i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="#C8AA78" strokeWidth="1.2" strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={visible ? "0" : `${len}`}
        style={{ transition: `stroke-dashoffset 0.4s ease ${0.5 + i * 0.08}s` }}
      />
    ))}
    {/* Pulse ring animation */}
    {visible && (
      <circle cx="60" cy="60" r="18"
        stroke="rgba(200,170,120,0.6)" strokeWidth="1" fill="none"
        style={{ animation: "pulseRing 1.6s ease-out 0.6s infinite" }}
      />
    )}
    <circle cx="60" cy="60" r="4" fill="#C8AA78"
      opacity={visible ? 1 : 0}
      style={{ transition: "opacity 0.3s ease 0.4s" }}
    />
  </svg>
);

const GlyphGlobe = ({ visible }) => {
  const arcs = [
    "M60 18 C78 30 78 90 60 102",
    "M60 18 C42 30 42 90 60 102",
    "M60 18 C92 30 92 90 60 102",
    "M60 18 C28 30 28 90 60 102",
  ];
  const latArcs = [
    { d: "M18 45 C35 38 85 38 102 45", len: 90 },
    { d: "M18 60 C35 60 85 60 102 60", len: 90 },
    { d: "M18 75 C35 82 85 82 102 75", len: 90 },
  ];
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}>
      <circle cx="60" cy="60" r="42"
        stroke="#C8AA78" strokeWidth="1"
        strokeDasharray="264"
        strokeDashoffset={visible ? "0" : "264"}
        style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)" }}
      />
      {arcs.map((d, i) => (
        <path key={i} d={d} stroke="#C8AA78" strokeWidth="0.8"
          opacity="0.5"
          strokeDasharray="100"
          strokeDashoffset={visible ? "0" : "100"}
          style={{ transition: `stroke-dashoffset 0.6s ease ${0.4 + i * 0.1}s` }}
        />
      ))}
      {latArcs.map(({ d, len }, i) => (
        <path key={i} d={d} stroke="#C8AA78" strokeWidth="0.8"
          opacity="0.4"
          strokeDasharray={len}
          strokeDashoffset={visible ? "0" : `${len}`}
          style={{ transition: `stroke-dashoffset 0.5s ease ${0.7 + i * 0.12}s` }}
        />
      ))}
    </svg>
  );
};

const GlyphVenn = ({ visible }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}>
    {[
      { cx: 46, cy: 48, delay: "0s" },
      { cx: 74, cy: 48, delay: "0.2s" },
      { cx: 60, cy: 72, delay: "0.4s" },
    ].map(({ cx, cy, delay }, i) => (
      <circle key={i} cx={cx} cy={cy} r="28"
        stroke="#C8AA78" strokeWidth="1.2"
        strokeDasharray="176"
        strokeDashoffset={visible ? "0" : "176"}
        opacity="0.65"
        style={{ transition: `stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}` }}
      />
    ))}
    {/* Center convergence dot */}
    <circle cx="60" cy="58" r="3.5" fill="#C8AA78"
      opacity={visible ? 0.9 : 0}
      style={{ transition: "opacity 0.4s ease 1s" }}
    />
    {/* Connection lines from center to each circle center */}
    {[
      { x1: 60, y1: 58, x2: 46, y2: 48 },
      { x1: 60, y1: 58, x2: 74, y2: 48 },
      { x1: 60, y1: 58, x2: 60, y2: 72 },
    ].map(({ x1, y1, x2, y2 }, i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="rgba(200,170,120,0.4)" strokeWidth="0.8" strokeLinecap="round"
        strokeDasharray="20"
        strokeDashoffset={visible ? "0" : "20"}
        style={{ transition: `stroke-dashoffset 0.3s ease ${1.1 + i * 0.1}s` }}
      />
    ))}
  </svg>
);

const GLYPHS = [GlyphKnot, GlyphTarget, GlyphGlobe, GlyphVenn];

// ─────────────────────────────────────────────────────────────────────────────
// Deliberate offsets — breaks the grid's symmetry in both axes
const STAGGER_OFFSETS = [
  { x:  -20, y:  -20 },
  { x:  50, y: 18 },
  { x: -6, y: 10 },
  { x:  25, y: 28 },
];
// Float: duration, delay-into-cycle (so they're out of phase)
const FLOAT_CONFIG = [
  { duration: "5.2s", delay: "0s"    },
  { duration: "4.7s", delay: "1.4s"  },
  { duration: "6.1s", delay: "0.7s"  },
  { duration: "5.6s", delay: "2.1s"  },
];

const PhilosophyPill = ({ icon, title, desc, delay, index = 0 }) => {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shimmer, setShimmer] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  };

  const handleMouseEnter = () => {
    setHovered(true);
    setShimmer(true);
    setTimeout(() => setShimmer(false), 700);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const floatCfg = FLOAT_CONFIG[index];
  const staticOffset = STAGGER_OFFSETS[index];
  const Glyph = GLYPHS[index];

  return (
    <div
      style={{
        transform: `translate(${staticOffset.x}px, ${staticOffset.y}px)`,
      }}
    >
    <div
      style={{
        animation: hovered
          ? "none"
          : `float${index} ${floatCfg.duration} ease-in-out ${floatCfg.delay} infinite`,
      }}
    >
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 24,
        padding: "40px 36px",
        borderRadius: 20,
        cursor: "default",
        overflow: "hidden",
        width: "100%",
        animation: `pillReveal 0.9s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s both`,
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? "translateY(-6px)" : "translateY(0)"}`,
        transition: hovered
          ? "transform 0.12s ease, box-shadow 0.4s ease, background 0.4s ease"
          : "transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.55s ease, background 0.4s ease",
        background: hovered
          ? "rgba(255,255,255,0.045)"
          : "rgba(255,255,255,0.015)",
        boxShadow: hovered
          ? "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)"
          : "0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      {/* Animated gradient border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          padding: "1px",
          background: hovered
            ? "linear-gradient(135deg, rgba(200,170,120,0.6) 0%, rgba(200,170,120,0.1) 40%, rgba(255,255,255,0.08) 60%, rgba(200,170,120,0.4) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          transition: "background 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Shimmer sweep on enter */}
      {shimmer && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "40%",
            height: "100%",
            // background: "linear-gradient(90deg, transparent, rgba(200,170,120,0.12), transparent)",
            // animation: "shimmerSweep 0.7s ease forwards",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Left: icon + text */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1, minWidth: 0 }}>
        {/* Icon */}
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: 18,
            background: hovered
              ? "rgba(200,170,120,0.18)"
              : "rgba(200,170,120,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: "2rem",
            // animation: hovered ? "iconGlow 1.6s ease infinite" : "none",
            transition: "background 0.4s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1)",
            transform: hovered ? "rotate(8deg) scale(1.15)" : "rotate(0) scale(1)",
            color: hovered ? "#C8AA78" : "#F5F0E8",
          }}
        >
          {icon}
        </div>

        {/* Text */}
        <div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: 12,
              transition: "color 0.3s ease",
              color: hovered ? "#C8AA78" : "#F5F0E8",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "0.95rem",
              color: hovered ? "rgba(245,240,232,0.55)" : "rgba(245,240,232,0.35)",
              lineHeight: 1.7,
              transition: "color 0.3s ease",
            }}
          >
            {desc}
          </div>
        </div>
      </div>

      {/* Right: glyph reveal */}
      <div
        style={{
          flexShrink: 0,
          width: 110,
          height: 110,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1) translateX(0)" : "scale(0.85) translateX(10px)",
          transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.23,1,0.32,1)",
          pointerEvents: "none",
        }}
      >
        <Glyph visible={hovered} />
      </div>

      {/* Ambient glow behind card */}
      <div
        style={{
          position: "absolute",
          bottom: -20,
          right: -20,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,170,120,0.12) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        }}
      />
    </div>
    </div>
    </div>
  );
};

export default PhilosophyPill;
