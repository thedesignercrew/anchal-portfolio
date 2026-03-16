import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { orbPositions, orbDurations } from "../../constants/data";
import "../../styles/scroll-comet.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const TAIL_COUNT = 18;
const GOLD = "#C8AA78";
const ORB_COUNT = 8;
const orbSizes = Array.from({ length: ORB_COUNT }, (_, i) => 4 + (i % 3) * 2);

// ─── Helpers ────────────────────────────────────────────────────────

function buildPath(w, h, startX, startY) {
  const segments = 14;
  const segH = (h - startY) / segments;
  const margin = w * 0.12;
  const center = w / 2;
  let d = `M ${startX} ${startY}`;

  for (let i = 0; i < segments; i++) {
    const y0 = startY + i * segH;
    const y1 = startY + (i + 1) * segH;
    const yMid = (y0 + y1) / 2;
    const goRight = i % 2 === 0;
    const tx = goRight ? w - margin : margin;
    const sign = goRight ? 1 : -1;

    d += ` C ${center + sign * w * 0.25} ${y0 + segH * 0.3}, ${tx} ${yMid - segH * 0.1}, ${tx} ${yMid}`;
    d += ` C ${tx} ${yMid + segH * 0.1}, ${center + sign * w * 0.15} ${y1 - segH * 0.3}, ${center} ${y1}`;
  }
  return d;
}

function cometHighlight(card, entering) {
  card.dispatchEvent(new CustomEvent(entering ? "comet-enter" : "comet-leave"));
}

// ─── Animation setup ────────────────────────────────────────────────

function setupOrbFloats(orbEls) {
  const anims = [];
  orbEls.forEach((orb, i) => {
    if (!orb) return;
    const pos = orbPositions[i % orbPositions.length];
    gsap.set(orb, {
      x: window.innerWidth * (parseFloat(pos.left) / 100),
      y: window.innerHeight * (parseFloat(pos.top) / 100),
      xPercent: -50,
      yPercent: -50,
      opacity: 0.4,
      scale: 1,
    });
    anims.push(
      gsap.to(orb, {
        y: `+=${-15 - i * 3}`,
        x: `+=${(i % 2 === 0 ? 1 : -1) * 10}`,
        duration: orbDurations[i % orbDurations.length] / 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.5,
      })
    );
  });
  return anims;
}

function setupConvergence(orbEls, bloomEl, cometEl, glowEl, tailEls, floatAnims, convX, convY) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: document.documentElement,
      start: "top top",
      end: "15% top",
      scrub: 1.2,
      onEnter: () => floatAnims.forEach((a) => a.pause()),
      onLeaveBack: () => floatAnims.forEach((a) => a.resume()),
      onUpdate: (self) => {
        if (self.progress < 1) {
          const docY = window.scrollY + convY();
          const docX = convX();
          gsap.set([cometEl, glowEl], { x: docX, y: docY });
          tailEls.forEach((d) => d && gsap.set(d, { x: docX, y: docY }));
        }
      },
    },
  });

  // Orbs fly to center
  orbEls.forEach((orb, i) => {
    if (!orb) return;
    tl.to(orb, { x: convX(), y: convY(), opacity: 1, scale: 1.4, ease: "power2.inOut", duration: 0.6 }, i * 0.04);
  });

  // Bloom pulse
  tl.to(bloomEl, { scale: 1, opacity: 1, ease: "power2.out", duration: 0.1 }, 0.82);
  tl.to(bloomEl, { scale: 2.5, opacity: 0, ease: "power2.in", duration: 0.18 }, 0.92);

  // Fade out orbs, fade in comet
  tl.to(orbEls.filter(Boolean), { opacity: 0, scale: 0, ease: "power1.in", duration: 0.12 }, 0.88);
  tl.to([cometEl, glowEl], { opacity: 1, ease: "power2.out", duration: 0.12 }, 0.9);

  return tl;
}

function setupCometTravel(cometEl, glowEl, tailEls, pathEl) {
  const motionOpts = (extra = {}) => ({
    motionPath: { path: pathEl, align: pathEl, alignOrigin: [0.5, 0.5], ...extra },
    ease: "none",
    duration: 1,
  });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: document.documentElement, start: "15% top", end: "bottom bottom", scrub: 1.2 },
  });

  tl.to(cometEl, motionOpts({ autoRotate: true }));
  tl.to(glowEl, motionOpts(), 0);

  // Tail ghosts
  tailEls.forEach((dot, i) => {
    if (!dot) return;
    gsap.to(dot, {
      ...motionOpts(),
      scrollTrigger: {
        trigger: document.documentElement,
        start: "15% top",
        end: "bottom bottom",
        scrub: 1.2 + (i + 1) * 0.004 * 60,
        onEnter: () => gsap.set(dot, { opacity: 0.45 * (1 - (i + 1) / TAIL_COUNT) }),
        onLeaveBack: () => gsap.set(dot, { opacity: 0 }),
      },
    });
  });
}

function setupPillHighlight() {
  let activePill = null;

  return requestAnimationFrame(() => {
    const pills = document.querySelectorAll("[data-philosophy-pill]");
    if (!pills.length) return;
    const section = pills[0].closest("section");
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      onUpdate: () => {
        const centerY = window.innerHeight / 2;
        let closest = null;
        let closestDist = Infinity;

        pills.forEach((card) => {
          const dist = Math.abs(card.getBoundingClientRect().top + card.getBoundingClientRect().height / 2 - centerY);
          if (dist < closestDist) { closestDist = dist; closest = card; }
        });

        const next = closestDist < window.innerHeight * 0.4 ? closest : null;
        if (next !== activePill) {
          if (activePill) cometHighlight(activePill, false);
          if (next) cometHighlight(next, true);
          activePill = next;
        }
      },
      onLeave: () => { if (activePill) { cometHighlight(activePill, false); activePill = null; } },
      onLeaveBack: () => { if (activePill) { cometHighlight(activePill, false); activePill = null; } },
    });
  });
}

// ─── Component ──────────────────────────────────────────────────────

const ScrollComet = () => {
  const svgRef = useRef(null);
  const cometRef = useRef(null);
  const glowRef = useRef(null);
  const tailRefs = useRef([]);
  const pathRef = useRef(null);
  const orbRefs = useRef([]);
  const bloomRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const comet = cometRef.current;
    const glow = glowRef.current;
    const path = pathRef.current;
    const bloom = bloomRef.current;
    if (!svg || !comet || !path || !bloom) return;

    const convX = () => window.innerWidth / 2;
    const convY = () => window.innerHeight * 0.8;

    // Resize SVG to match document
    const resize = () => {
      const docH = document.documentElement.scrollHeight;
      const docW = window.innerWidth;
      svg.setAttribute("viewBox", `0 0 ${docW} ${docH}`);
      svg.style.width = `${docW}px`;
      svg.style.height = `${docH}px`;
      path.setAttribute("d", buildPath(docW, docH, convX(), docH * 0.15 + convY()));
    };
    resize();
    window.addEventListener("resize", resize);

    // Init
    const floatAnims = setupOrbFloats(orbRefs.current);

    gsap.set(bloom, { x: convX(), y: convY(), scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });
    gsap.set([comet, glow], { opacity: 0 });
    tailRefs.current.forEach((d) => d && gsap.set(d, { opacity: 0 }));

    // Animations
    setupConvergence(orbRefs.current, bloom, comet, glow, tailRefs.current, floatAnims, convX, convY);
    setupCometTravel(comet, glow, tailRefs.current, path);
    const pillRAF = setupPillHighlight();

    return () => {
      cancelAnimationFrame(pillRAF);
      window.removeEventListener("resize", resize);
      floatAnims.forEach((a) => a.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div className="scroll-comet-wrapper">
        {Array.from({ length: ORB_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (orbRefs.current[i] = el)}
            className="scroll-comet-orb"
            style={{ width: orbSizes[i], height: orbSizes[i] }}
          />
        ))}
        <div ref={bloomRef} className="scroll-comet-bloom" />
      </div>

      <svg ref={svgRef} className="scroll-comet-svg">
        <defs>
          <filter id="comet-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="comet-ambient" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <radialGradient id="tail-grad">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.6" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>
        </defs>

        <path ref={pathRef} d="" fill="none" stroke="none" />

        {Array.from({ length: TAIL_COUNT }).map((_, i) => {
          const t = (i + 1) / TAIL_COUNT;
          return (
            <circle
              key={i}
              ref={(el) => (tailRefs.current[i] = el)}
              r={5 * (1 - t * 0.7)}
              fill={GOLD}
              opacity={0}
              style={{ filter: `blur(${1 + t * 4}px)` }}
            />
          );
        })}

        <circle ref={glowRef} r={28} fill={GOLD} opacity={0} filter="url(#comet-ambient)" />
        <circle ref={cometRef} r={6} fill={GOLD} filter="url(#comet-glow)" opacity={0} />
      </svg>
    </>
  );
};

export default ScrollComet;
