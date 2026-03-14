import FloatingOrb from "../ui/FloatingOrb";
import RingSpinner from "../ui/RingSpinner";

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

    {[...Array(8)].map((_, i) => (
      <FloatingOrb
        key={i}
        delay={i * 0.5}
        size={4 + (i % 3) * 2}
        index={i}
      />
    ))}

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
