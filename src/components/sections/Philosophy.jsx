import { useRef, useEffect, useState } from "react";
import PhilosophyPill from "../cards/PhilosophyPill";
import { philosophies } from "../../constants/data";

// Perspective grid: lines projected from a vanishing point at bottom-center.
// W×H is the SVG canvas. vx,vy = vanishing point. Horizontals are evenly
// spaced rows that get closer together as they approach the horizon.
const PerspectiveGrid = () => {
  const W = 1200;
  const H = 420;          // grid height — ends ~80px above pill grid
  const vx = W / 2;       // vanishing point x (center)
  const vy = H;           // vanishing point y (bottom edge = horizon)

  // Vertical (radial) lines: fan out from vanishing point to top edge
  const numRadial = 18;
  const radialLines = [];
  for (let i = 0; i <= numRadial; i++) {
    const t = i / numRadial;
    // spread across top edge with slight padding
    const topX = W * 0.02 + t * W * 0.96;
    radialLines.push(
      <line
        key={`r${i}`}
        x1={vx} y1={vy}
        x2={topX} y2={0}
        stroke="rgba(200,170,120,0.18)"
        strokeWidth="0.8"
      />
    );
  }

  // Horizontal (cross) lines: perspective-projected, denser near horizon
  const numH = 10;
  const horizontals = [];
  for (let i = 1; i <= numH; i++) {
    // use quadratic spacing so lines bunch toward horizon (bottom)
    const t = (i / numH) ** 1.8;
    const y = t * H;
    // at this y, compute the x extents of the outermost radial lines
    const leftX  = vx + (W * 0.02 - vx) * (1 - y / H);
    const rightX = vx + (W * 0.98 - vx) * (1 - y / H);
    horizontals.push(
      <line
        key={`h${i}`}
        x1={leftX} y1={y}
        x2={rightX} y2={y}
        stroke="rgba(200,170,120,0.12)"
        strokeWidth="0.7"
      />
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: H,
        // fade: fully visible at top, gone ~80px before bottom of grid
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%)",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        {/* Subtle gold dot at vanishing point */}
        <circle cx={vx} cy={vy} r={3} fill="rgba(200,170,120,0.35)" />
        <circle cx={vx} cy={vy} r={12} fill="none" stroke="rgba(200,170,120,0.1)" strokeWidth="1" />
        {radialLines}
        {horizontals}
      </svg>
    </div>
  );
};

const Philosophy = () => {
  const sectionRef = useRef(null);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // isPast = section has left the viewport scrolling upward (below threshold)
        setIsPast(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "180px 0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <PerspectiveGrid />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          position: "relative",
          padding: "0 48px",
          maxWidth: 1400,
          margin: "0 auto 72px",
          width: "100%",
        }}
      >
        <span className="section-label">Philosophy</span>
        <div
          style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }}
        />
      </div>

      {/* Heading + 2×2 grid */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
          padding: "0 clamp(32px, 4vw, 80px)",
          display: "flex",
          alignItems: "flex-start",
          gap: "clamp(40px, 5vw, 80px)",
        }}
      >
        {/* Left: large heading — sticky until section is scrolled past */}
        <div
          style={{
            flexShrink: 0,
            width: "clamp(200px, 22vw, 320px)",
            position: isPast ? "relative" : "sticky",
            top: isPast ? "auto" : "120px",
            alignSelf: "flex-start",
            paddingTop: 8,
          }}
        >
          <div
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#F5F0E8",
              letterSpacing: "-0.03em",
            }}
          >
            How
            <br />
            <em style={{ color: "#C8AA78" }}>I</em> work.
          </div>
        </div>

        {/* Right: 2×2 pill grid */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(2, 2)",
            gap: 24,
          }}
        >
          {philosophies.map((item, i) => (
            <PhilosophyPill
              key={item.title}
              index={i}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              detail={item.detail}
              delay={0.1 + i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
