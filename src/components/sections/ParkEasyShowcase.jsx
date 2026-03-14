import Magnetic from "../ui/Magnetic";
import { parkEasyFeatures } from "../../constants/data";

const ParkEasyShowcase = () => (
  <section
    style={{
      padding: "80px 48px 120px",
      maxWidth: 1400,
      margin: "0 auto",
      position: "relative",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 60,
      }}
    >
      <span className="section-label">ParkEasy — Deep Dive</span>
      <div
        style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }}
      />
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 24,
      }}
    >
      {parkEasyFeatures.map((item, i) => (
        <Magnetic key={item.label} strength={0.06}>
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20,
              padding: 32,
              position: "relative",
              overflow: "hidden",
              animation: `fadeSlideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${0.1 + i * 0.1}s both`,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: `${item.color}08`,
                filter: "blur(30px)",
              }}
            />
            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: 100,
                background: `${item.color}15`,
                color: item.color,
                fontSize: "0.7rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: 20,
                fontWeight: 500,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "1.25rem",
                color: "#F5F0E8",
                marginBottom: 8,
                lineHeight: 1.3,
              }}
            >
              {item.sub}
            </div>
            <div
              style={{
                fontSize: "0.82rem",
                color: "rgba(245,240,232,0.35)",
                lineHeight: 1.5,
              }}
            >
              {item.detail}
            </div>
          </div>
        </Magnetic>
      ))}
    </div>
  </section>
);

export default ParkEasyShowcase;
