import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ─── ScrollComet ─────────────────────────────────────────────────────────────
// A glowing comet that follows a curvy SVG path down the full page length,
// scrubbed to scroll progress. Leaves a fading tail of ghost circles behind it.
// At the Philosophy section it auto-expands each pill card sequentially.

const TAIL_COUNT = 18;
const GOLD = "#C8AA78";

const ScrollComet = () => {
  const svgRef = useRef(null);
  const cometRef = useRef(null);
  const glowRef = useRef(null);
  const tailRefs = useRef([]);
  const pathRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const comet = cometRef.current;
    const glow = glowRef.current;
    const path = pathRef.current;
    if (!svg || !comet || !path) return;

    // ── Resize SVG to match full document height ──
    const resize = () => {
      const docH = document.documentElement.scrollHeight;
      const docW = window.innerWidth;
      svg.setAttribute("viewBox", `0 0 ${docW} ${docH}`);
      svg.style.width = `${docW}px`;
      svg.style.height = `${docH}px`;

      // Build a curvy S-path that weaves across the page
      const points = buildPath(docW, docH);
      path.setAttribute("d", points);
    };

    resize();
    window.addEventListener("resize", resize);

    // ── Main comet animation along the path ──
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    // Animate the comet group along the motion path
    tl.to(comet, {
      motionPath: {
        path: path,
        align: path,
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
      ease: "none",
      duration: 1,
    });

    // Animate glow in sync
    tl.to(
      glow,
      {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
        duration: 1,
      },
      0
    );

    // ── Tail: each ghost follows the same path with increasing delay ──
    tailRefs.current.forEach((dot, i) => {
      if (!dot) return;
      const offset = (i + 1) * 0.004; // stagger behind the head
      gsap.to(dot, {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2 + offset * 60,
        },
      });
    });

    // ── Philosophy pill auto-expand: one card at a time ──
    // Defer pill setup to next frame so child components have mounted.
    let activePill = null;
    const pillRAF = requestAnimationFrame(() => {
      const pillCards = document.querySelectorAll("[data-philosophy-pill]");
      if (pillCards.length === 0) return;

      const philosophySection = pillCards[0].closest("section");
      if (!philosophySection) return;

      ScrollTrigger.create({
        trigger: philosophySection,
        start: "top 80%",
        end: "bottom 20%",
        onUpdate: () => {
          const viewCenterY = window.innerHeight / 2;
          let closest = null;
          let closestDist = Infinity;

          pillCards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const cardCenterY = rect.top + rect.height / 2;
            const dist = Math.abs(cardCenterY - viewCenterY);
            if (dist < closestDist) {
              closestDist = dist;
              closest = card;
            }
          });

          const newActive = closestDist < window.innerHeight * 0.4 ? closest : null;

          if (newActive !== activePill) {
            if (activePill) cometHighlight(activePill, false);
            if (newActive) cometHighlight(newActive, true);
            activePill = newActive;
          }
        },
        onLeave: () => {
          if (activePill) { cometHighlight(activePill, false); activePill = null; }
        },
        onLeaveBack: () => {
          if (activePill) { cometHighlight(activePill, false); activePill = null; }
        },
      });
    });

    return () => {
      cancelAnimationFrame(pillRAF);
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 10,
        overflow: "visible",
      }}
    >
      <defs>
        {/* Comet head glow filter */}
        <filter id="comet-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Larger ambient glow */}
        <filter
          id="comet-ambient"
          x="-300%"
          y="-300%"
          width="700%"
          height="700%"
        >
          <feGaussianBlur stdDeviation="18" />
        </filter>

        {/* Radial gradient for tail dots */}
        <radialGradient id="tail-grad">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.6" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* The guide path — invisible */}
      <path
        ref={pathRef}
        d=""
        fill="none"
        stroke="none"
      />

      {/* Tail ghosts — drawn behind the head */}
      {Array.from({ length: TAIL_COUNT }).map((_, i) => {
        const t = (i + 1) / TAIL_COUNT;
        const radius = 5 * (1 - t * 0.7);
        const opacity = 0.45 * (1 - t);
        return (
          <circle
            key={i}
            ref={(el) => (tailRefs.current[i] = el)}
            r={radius}
            fill={GOLD}
            opacity={opacity}
            style={{ filter: `blur(${1 + t * 4}px)` }}
          />
        );
      })}

      {/* Ambient glow behind the comet */}
      <circle
        ref={glowRef}
        r={28}
        fill={GOLD}
        opacity={0.08}
        filter="url(#comet-ambient)"
      />

      {/* Comet head */}
      <circle
        ref={cometRef}
        r={6}
        fill={GOLD}
        filter="url(#comet-glow)"
        opacity={0.9}
      />
    </svg>
  );
};

// ─── Build an S-curve path that weaves across the page ──────────────────────
function buildPath(w, h) {
  // The path oscillates left ↔ right with smooth cubic beziers.
  // We divide the page into segments and alternate sides.
  const segments = 14;
  const segH = h / segments;
  const margin = w * 0.12; // how close to the edge we go
  const center = w / 2;

  let d = `M ${center} 0`; // start at top center

  for (let i = 0; i < segments; i++) {
    const y0 = i * segH;
    const y1 = (i + 1) * segH;
    const yMid = (y0 + y1) / 2;

    // Alternate between left and right side
    const goRight = i % 2 === 0;
    const targetX = goRight ? w - margin : margin;

    // Control points create a smooth S-curve
    const cp1x = center + (goRight ? 1 : -1) * (w * 0.25);
    const cp1y = y0 + segH * 0.3;
    const cp2x = targetX;
    const cp2y = yMid - segH * 0.1;

    // Curve to the side
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${yMid}`;

    // Curve back toward center for the next segment
    const cp3x = targetX;
    const cp3y = yMid + segH * 0.1;
    const cp4x = center + (goRight ? 1 : -1) * (w * 0.15);
    const cp4y = y1 - segH * 0.3;

    d += ` C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${center} ${y1}`;
  }

  return d;
}

// ─── Dispatch custom comet events to PhilosophyPill cards ───────────────────
function cometHighlight(card, entering) {
  card.dispatchEvent(new CustomEvent(entering ? "comet-enter" : "comet-leave"));
}

export default ScrollComet;
