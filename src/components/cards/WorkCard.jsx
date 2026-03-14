import { useState, useRef } from "react";

const WorkCard = ({ title, description, accent, tags = [] }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 24,
        overflow: "hidden",
        cursor: "pointer",
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${hovered ? 1.01 : 1})`,
        transition:
          "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px ${accent}22`
          : "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          height: 320,
          background: `linear-gradient(135deg, ${accent}15, ${accent}08)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 160 + i * 60,
              height: 160 + i * 60,
              borderRadius: "50%",
              border: `1px solid ${accent}${hovered ? "30" : "15"}`,
              transition: "all 0.6s ease",
              animationDelay: `${i * 0.2}s`,
              transform: hovered ? `scale(${1.1 + i * 0.05})` : "scale(1)",
            }}
          />
        ))}
        <div
          style={{
            width: 180,
            height: 360,
            background: `linear-gradient(180deg, ${accent}40, ${accent}20)`,
            borderRadius: 28,
            border: `2px solid ${accent}30`,
            position: "relative",
            transform: hovered ? "translateY(-8px)" : "translateY(0)",
            transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 12,
            boxShadow: hovered ? `0 30px 60px ${accent}20` : "none",
          }}
        >
          <div
            style={{
              width: 50,
              height: 5,
              borderRadius: 3,
              background: `${accent}50`,
              marginBottom: 8,
            }}
          />
          <div
            style={{
              width: "85%",
              flex: 1,
              background: "rgba(0,0,0,0.3)",
              borderRadius: 16,
              margin: "0 0 8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {tags[0] || "Preview"}
          </div>
        </div>
      </div>
      <div style={{ padding: "32px 36px" }}>
        <div
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "1.5rem",
            color: "#F5F0E8",
            marginBottom: 12,
            lineHeight: 1.3,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "0.88rem",
            color: "rgba(245,240,232,0.4)",
            lineHeight: 1.6,
            marginBottom: 20,
          }}
        >
          {description}
        </div>
        {tags.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  padding: "6px 14px",
                  borderRadius: 100,
                  fontSize: "0.72rem",
                  background: `${accent}12`,
                  color: accent,
                  border: `1px solid ${accent}25`,
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.03em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkCard;
