import { useState } from "react";

const PhilosophyPill = ({ icon, title, desc, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 20,
        padding: "28px 28px",
        background: hovered ? "rgba(255,255,255,0.04)" : "transparent",
        borderRadius: 16,
        transition: "all 0.4s ease",
        cursor: "default",
        animation: `fadeSlideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s both`,
        border: "1px solid transparent",
        borderColor: hovered ? "rgba(255,255,255,0.06)" : "transparent",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "rgba(200,170,120,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: "1.2rem",
          transition: "transform 0.3s ease",
          transform: hovered ? "rotate(5deg) scale(1.1)" : "rotate(0) scale(1)",
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "#F5F0E8",
            marginBottom: 6,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "0.82rem",
            color: "rgba(245,240,232,0.35)",
            lineHeight: 1.6,
          }}
        >
          {desc}
        </div>
      </div>
    </div>
  );
};

export default PhilosophyPill;
