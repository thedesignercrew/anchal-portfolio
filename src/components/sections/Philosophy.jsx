import { useRef, useEffect, useState } from "react";
import PhilosophyPill from "../cards/PhilosophyPill";
import { philosophies } from "../../constants/data";

// Perspective grid: lines projected from a vanishing point at bottom-center.
// W×H is the SVG canvas. vx,vy = vanishing point. Horizontals are evenly
// spaced rows that get closer together as they approach the horizon.

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
