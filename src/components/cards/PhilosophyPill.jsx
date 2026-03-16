import { useState, useRef, useEffect, useCallback } from "react";
import { GlyphKnot, GlyphTarget, GlyphGlobe, GlyphVenn } from "./glyphs";

const GLYPHS = [GlyphKnot, GlyphTarget, GlyphGlobe, GlyphVenn];

const STAGGER_OFFSETS = [
  { x: -20, y: -20 },
  { x: 50, y: 18 },
  { x: -6, y: 10 },
  { x: 25, y: 28 },
];

const FLOAT_CONFIG = [
  { duration: "5.2s", delay: "0s" },
  { duration: "4.7s", delay: "1.4s" },
  { duration: "6.1s", delay: "0.7s" },
  { duration: "5.6s", delay: "2.1s" },
];

const PhilosophyPill = ({ icon, title, desc, detail, delay, index = 0 }) => {
  const [cometActive, setCometActive] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shimmer, setShimmer] = useState(false);
  const cardRef = useRef(null);

  const expanded = cometActive;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onCometEnter = () => {
      setCometActive(true);
      setShimmer(true);
      setTimeout(() => setShimmer(false), 700);
    };
    const onCometLeave = () => setCometActive(false);

    el.addEventListener("comet-enter", onCometEnter);
    el.addEventListener("comet-leave", onCometLeave);
    return () => {
      el.removeEventListener("comet-enter", onCometEnter);
      el.removeEventListener("comet-leave", onCometLeave);
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  }, []);

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const floatCfg = FLOAT_CONFIG[index];
  const offset = STAGGER_OFFSETS[index];
  const Glyph = GLYPHS[index];

  return (
    <div style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
      <div
        style={{
          animation: expanded
            ? "none"
            : `float${index} ${floatCfg.duration} ease-in-out ${floatCfg.delay} infinite`,
        }}
      >
        <div
          ref={cardRef}
          data-philosophy-pill
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
            transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${expanded ? "translateY(-6px)" : "translateY(0)"}`,
            transition: expanded
              ? "transform 0.12s ease, box-shadow 0.4s ease, background 0.4s ease"
              : "transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.55s ease, background 0.4s ease",
            background: expanded
              ? "rgba(255,255,255,0.045)"
              : "rgba(255,255,255,0.015)",
            boxShadow: expanded
              ? "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)"
              : "0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          {/* Gradient border */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 20,
              padding: "1px",
              background: expanded
                ? "linear-gradient(135deg, rgba(200,170,120,0.6) 0%, rgba(200,170,120,0.1) 40%, rgba(255,255,255,0.08) 60%, rgba(200,170,120,0.4) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              transition: "background 0.4s ease",
              pointerEvents: "none",
            }}
          />

          {/* Shimmer sweep */}
          {shimmer && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, transparent, rgba(200,170,120,0.12), transparent)",
                animation: "shimmerSweep 0.7s ease forwards",
                pointerEvents: "none",
              }}
            />
          )}

          {/* Icon + text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1, minWidth: 0 }}>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 18,
                background: expanded ? "rgba(200,170,120,0.18)" : "rgba(200,170,120,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: "2rem",
                transition: "background 0.4s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1)",
                transform: expanded ? "rotate(8deg) scale(1.15)" : "rotate(0) scale(1)",
                color: expanded ? "#C8AA78" : "#F5F0E8",
              }}
            >
              {icon}
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  marginBottom: 12,
                  transition: "color 0.3s ease",
                  color: expanded ? "#C8AA78" : "#F5F0E8",
                  letterSpacing: "-0.02em",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontSize: "0.95rem",
                  color: expanded ? "rgba(245,240,232,0.55)" : "rgba(245,240,232,0.35)",
                  lineHeight: 1.7,
                  transition: "color 0.3s ease",
                }}
              >
                {desc}
              </div>

              {/* Detail reveal */}
              {detail && (
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: expanded ? "120px" : "0px",
                    transition: "max-height 0.45s cubic-bezier(0.23,1,0.32,1)",
                  }}
                >
                  <div
                    style={{
                      height: 1,
                      marginTop: 16,
                      marginBottom: 14,
                      background: "rgba(200,170,120,0.3)",
                      transformOrigin: "left center",
                      transform: expanded ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1) 0.05s",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(245,240,232,0.45)",
                      lineHeight: 1.75,
                      opacity: expanded ? 1 : 0,
                      transform: expanded ? "translateY(0)" : "translateY(6px)",
                      transition: "opacity 0.35s ease 0.15s, transform 0.4s cubic-bezier(0.23,1,0.32,1) 0.15s",
                    }}
                  >
                    {detail}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Glyph */}
          <div
            style={{
              flexShrink: 0,
              width: 110,
              height: 110,
              opacity: expanded ? 1 : 0,
              transform: expanded ? "scale(1) translateX(0)" : "scale(0.85) translateX(10px)",
              transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.23,1,0.32,1)",
              pointerEvents: "none",
            }}
          >
            <Glyph visible={expanded} />
          </div>

          {/* Ambient glow */}
          <div
            style={{
              position: "absolute",
              bottom: -20,
              right: -20,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(200,170,120,0.12) 0%, transparent 70%)",
              opacity: expanded ? 1 : 0,
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
