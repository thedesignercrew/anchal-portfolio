import { useState } from "react";
import useTextScramble from "../../hooks/useTextScramble";
import Magnetic from "../ui/Magnetic";

const colors = ["#C8AA78", "#8AACB8", "#B88A8A"];

const ArticleCard = ({ title, subtitle, index }) => {
  const [hovered, setHovered] = useState(false);
  const scrambled = useTextScramble(title, hovered);
  const accent = colors[index % 3];

  return (
    <Magnetic strength={0.08}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered
            ? "rgba(255,255,255,0.04)"
            : "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 20,
          padding: "36px 32px",
          cursor: "pointer",
          transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          position: "relative",
          overflow: "hidden",
          flex: "1 1 300px",
          minWidth: 280,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: hovered ? "100%" : "0%",
            height: 2,
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            transition: "width 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        />
        <div
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "1.65rem",
            color: "#F5F0E8",
            lineHeight: 1.2,
            marginBottom: 12,
            minHeight: 80,
          }}
        >
          {scrambled}
        </div>
        <div
          style={{
            fontSize: "0.85rem",
            color: "rgba(245,240,232,0.45)",
            marginBottom: 20,
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: accent,
            fontSize: "0.8rem",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Read article
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.3s ease",
            }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Magnetic>
  );
};

export default ArticleCard;
