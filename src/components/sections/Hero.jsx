import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RingSpinner from "../ui/RingSpinner";

const W = 1200;
const H = 420;
const VX = W / 2;
const VY = H;
const NUM_RADIAL = 18;
const NUM_H = 10;

const PerspectiveGrid = () => {
  const wrapperRef = useRef(null);
  const svgRef = useRef(null);
  const progressRef = useRef({ value: 0 });

  // Build line data for a given convergence progress (0 = parallel, 1 = fully converged)
  const updateLines = useCallback((p) => {
    const svg = svgRef.current;
    if (!svg) return;

    // Update radial lines
    const radials = svg.querySelectorAll(".grid-radial");
    for (let i = 0; i < radials.length; i++) {
      const t = i / NUM_RADIAL;
      const topX = W * 0.02 + t * W * 0.96;
      // At p=0: bottom x = topX (parallel/straight), at p=1: bottom x = VX (converged)
      const bottomX = topX + (VX - topX) * p;
      radials[i].setAttribute("x1", bottomX);
      radials[i].setAttribute("x2", topX);
    }

    // Update horizontal lines
    const horizons = svg.querySelectorAll(".grid-horiz");
    for (let i = 0; i < horizons.length; i++) {
      const t = ((i + 1) / NUM_H) ** 1.8;
      const y = t * H;
      // At p=0: horizontals span full width, at p=1: they narrow toward vanishing point
      const leftFull = W * 0.02;
      const rightFull = W * 0.98;
      const leftConverged = VX + (leftFull - VX) * (1 - y / H);
      const rightConverged = VX + (rightFull - VX) * (1 - y / H);
      const leftX = leftFull + (leftConverged - leftFull) * p;
      const rightX = rightFull + (rightConverged - rightFull) * p;
      horizons[i].setAttribute("x1", leftX);
      horizons[i].setAttribute("x2", rightX);
    }
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Initial entrance animation (mask reveal)
    gsap.fromTo(
      el,
      {
        opacity: 0,
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 0%)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 0%)",
      },
      {
        opacity: 1,
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%)",
        duration: 1.5,
        ease: "power2.out",
        delay: 0.2,
      }
    );

    // Set initial state (parallel lines)
    updateLines(0);

    // Scroll-driven convergence: 0 → 360vh
    gsap.to(progressRef.current, {
      value: 1,
      ease: "power2.in",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "360vh top",
        scrub: true,
      },
      onUpdate: () => updateLines(progressRef.current.value),
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === document.body && st.vars.end === "360vh top")
        .forEach((st) => st.kill());
    };
  }, [updateLines]);

  // Build initial SVG lines (attributes will be overwritten by updateLines)
  const radialLines = [];
  for (let i = 0; i <= NUM_RADIAL; i++) {
    const t = i / NUM_RADIAL;
    const topX = W * 0.02 + t * W * 0.96;
    radialLines.push(
      <line
        key={`r${i}`}
        className="grid-radial"
        x1={topX} y1={VY}
        x2={topX} y2={0}
        stroke="rgba(200,170,120,0.18)"
        strokeWidth="0.8"
      />
    );
  }

  const horizontals = [];
  for (let i = 1; i <= NUM_H; i++) {
    horizontals.push(
      <line
        key={`h${i}`}
        className="grid-horiz"
        x1={W * 0.02} y1={((i / NUM_H) ** 1.8) * H}
        x2={W * 0.98} y2={((i / NUM_H) ** 1.8) * H}
        stroke="rgba(200,170,120,0.12)"
        strokeWidth="0.7"
      />
    );
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: H,
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 0%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 0%)",
        pointerEvents: "none",
        overflow: "hidden",
        opacity: 0,
      }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <circle cx={VX} cy={VY} r={3} fill="rgba(200,170,120,0.35)" />
        <circle cx={VX} cy={VY} r={12} fill="none" stroke="rgba(200,170,120,0.1)" strokeWidth="1" />
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
