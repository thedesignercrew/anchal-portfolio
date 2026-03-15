import { useState, useRef } from "react";

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
        flexDirection: "column",
        alignItems: "flex-start",
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
            background: "linear-gradient(90deg, transparent, rgba(200,170,120,0.12), transparent)",
            animation: "shimmerSweep 0.7s ease forwards",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Icon — top, larger */}
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
          animation: hovered ? "iconGlow 1.6s ease infinite" : "none",
          transition: "background 0.4s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1)",
          transform: hovered ? "rotate(8deg) scale(1.15)" : "rotate(0) scale(1)",
          color: hovered ? "#C8AA78" : "#F5F0E8",
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
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
