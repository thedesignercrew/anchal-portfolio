import RingSpinner from "../ui/RingSpinner";

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
        position: "fixed",
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


const Hero = () => (
  <section
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "140px 48px 80px",
      position: "relative",
      maxWidth: 1400,
      margin: "0 auto",
    }}
  >
    {/* Decorative rings */}
    <PerspectiveGrid/>
    <div
      style={{
        position: "absolute",
        right: "8%",
        top: "25%",
        opacity: 0.5,
      }}
    >
      <RingSpinner size={180} speed={25} />
      <RingSpinner size={120} speed={18} color="rgba(138,172,184,0.12)" />
    </div>

    <div style={{ position: "relative", zIndex: 2 }}>
      <div
        style={{
          animation:
            "fadeSlideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.3s both",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 0,
            height: 1,
            background: "#C8AA78",
            animation: "lineExpand 0.8s ease 0.6s both",
          }}
        />
        <span className="section-label">Lead Product Designer</span>
      </div>

      <div style={{ overflow: "hidden", marginBottom: 12 }}>
        <h1
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            animation:
              "titleReveal 1s cubic-bezier(0.23, 1, 0.32, 1) 0.4s both",
          }}
        >
          anchal
        </h1>
      </div>
      <div style={{ overflow: "hidden", marginBottom: 40 }}>
        <h1
          className="shimmer-text"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            fontStyle: "italic",
            animation:
              "titleReveal 1s cubic-bezier(0.23, 1, 0.32, 1) 0.55s both",
          }}
        >
          mittal
        </h1>
      </div>

      <div
        style={{
          maxWidth: 600,
          animation:
            "fadeSlideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.8s both",
        }}
      >
        <p
          style={{
            fontSize: "1.4rem",
            fontWeight: 300,
            color: "rgba(245,240,232,0.7)",
            lineHeight: 1.5,
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            marginBottom: 24,
          }}
        >
          Design leadership for clarity, efficiency and impact.
        </p>
        <p
          style={{
            fontSize: "0.92rem",
            color: "rgba(245,240,232,0.35)",
            lineHeight: 1.7,
            maxWidth: 520,
          }}
        >
          I'm a Lead Product Designer with 9+ years of experience based in
          India, currently enhancing AI features for newsletters and surveys at
          Simpplr.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: -60,
          left: 0,
          animation: "fadeIn 1s ease 1.5s both",
        }}
      >
        <div
          style={{
            width: 24,
            height: 40,
            borderRadius: 12,
            border: "1.5px solid rgba(245,240,232,0.15)",
            display: "flex",
            justifyContent: "center",
            paddingTop: 8,
          }}
        >
          <div
            style={{
              width: 3,
              height: 8,
              borderRadius: 2,
              background: "#C8AA78",
              animation: "breathe 2s ease infinite",
            }}
          />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
