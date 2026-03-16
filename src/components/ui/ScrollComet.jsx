import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { orbPositions, orbDurations } from "../../constants/data";
import "../../styles/scroll-comet.css";

gsap.registerPlugin(ScrollTrigger);

const TAIL_COUNT = 18;
const ORB_COUNT = 8;
const orbSizes = Array.from({ length: ORB_COUNT }, (_, i) => 4 + (i % 3) * 2);

// ─── Parametric comet path ──────────────────────────────────────────

function cometPosition(t, vw, vh) {
  const waves = 2;
  const ampX = vw * 0.38;
  const x = vw / 2 + ampX * Math.sin(t * waves * 2 * Math.PI);

  // Ease from convergence point (80vh) to cruise altitude (~50vh)
  const startY = vh * 0.8;
  const cruiseY = vh * 0.5;
  const blend = Math.min(t * 5, 1); // transition over first 20% of travel
  const easedBlend = 1 - Math.pow(1 - blend, 3); // easeOutCubic
  const baseY = startY + (cruiseY - startY) * easedBlend;
  const oscillateY = vh * 0.08 * Math.sin(t * 3 * 2 * Math.PI);
  const y = baseY + oscillateY * blend;

  return { x, y };
}

// ─── Helpers ────────────────────────────────────────────────────────

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
          gsap.set([cometEl, glowEl], { x: convX(), y: convY(), xPercent: -50, yPercent: -50 });
          tailEls.forEach((d) => d && gsap.set(d, { x: convX(), y: convY(), xPercent: -50, yPercent: -50 }));
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

function setupCometTravel(cometEl, glowEl, tailEls) {
  let prevT = 0;

  ScrollTrigger.create({
    trigger: document.documentElement,
    start: "15% top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const t = self.progress;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const velocity = t - prevT; // positive = scrolling down, negative = up
      prevT = t;

      const { x, y } = cometPosition(t, vw, vh);
      gsap.set(cometEl, { x, y, xPercent: -50, yPercent: -50 });
      gsap.set(glowEl, { x, y, xPercent: -50, yPercent: -50 });

      // Tail trails opposite to scroll direction (above head when scrolling down)
      const dir = velocity >= 0 ? -1 : 1;
      const spread = Math.min(Math.abs(velocity) * 800, 1); // 0–1 based on scroll speed

      tailEls.forEach((dot, i) => {
        if (!dot) return;
        const offset = (i + 1) / TAIL_COUNT;
        const tailY = y + dir * offset * spread * vh * 0.25;
        gsap.to(dot, {
          x, y: tailY, xPercent: -50, yPercent: -50,
          duration: 0.2 + (i + 1) * 0.04,
          ease: "power1.out",
          overwrite: true,
        });
      });
    },
    onEnter: () => {
      tailEls.forEach((dot, i) => {
        if (!dot) return;
        gsap.set(dot, { opacity: 0.45 * (1 - (i + 1) / TAIL_COUNT) });
      });
    },
    onLeaveBack: () => {
      tailEls.forEach((dot) => dot && gsap.set(dot, { opacity: 0 }));
      gsap.set([cometEl, glowEl], { opacity: 0 });
    },
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
  const cometRef = useRef(null);
  const glowRef = useRef(null);
  const tailRefs = useRef([]);
  const orbRefs = useRef([]);
  const bloomRef = useRef(null);

  useEffect(() => {
    const comet = cometRef.current;
    const glow = glowRef.current;
    const bloom = bloomRef.current;
    if (!comet || !bloom) return;

    const convX = () => window.innerWidth / 2;
    const convY = () => window.innerHeight * 0.8;

    // Init
    const floatAnims = setupOrbFloats(orbRefs.current);

    gsap.set(bloom, { x: convX(), y: convY(), scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });
    gsap.set([comet, glow], { opacity: 0 });
    tailRefs.current.forEach((d) => d && gsap.set(d, { opacity: 0 }));

    // Animations
    setupConvergence(orbRefs.current, bloom, comet, glow, tailRefs.current, floatAnims, convX, convY);
    setupCometTravel(comet, glow, tailRefs.current);
    const pillRAF = setupPillHighlight();

    return () => {
      cancelAnimationFrame(pillRAF);
      floatAnims.forEach((a) => a.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="scroll-comet-wrapper">
      {Array.from({ length: ORB_COUNT }).map((_, i) => (
        <div
          key={`orb-${i}`}
          ref={(el) => (orbRefs.current[i] = el)}
          className="scroll-comet-orb"
          style={{ width: orbSizes[i], height: orbSizes[i] }}
        />
      ))}
      <div ref={bloomRef} className="scroll-comet-bloom" />

      {Array.from({ length: TAIL_COUNT }).map((_, i) => {
        const t = (i + 1) / TAIL_COUNT;
        const size = 10 * (1 - t * 0.7);
        return (
          <div
            key={`tail-${i}`}
            ref={(el) => (tailRefs.current[i] = el)}
            className="scroll-comet-tail"
            style={{ width: size, height: size, filter: `blur(${1 + t * 4}px)` }}
          />
        );
      })}

      <div ref={glowRef} className="scroll-comet-glow" />
      <div ref={cometRef} className="scroll-comet-head" />
    </div>
  );
};

export default ScrollComet;
