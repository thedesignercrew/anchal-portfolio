import PhilosophyPill from "../cards/PhilosophyPill";
import { philosophies } from "../../constants/data";

const Philosophy = () => (
  <section
    style={{
      padding: "120px 48px",
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
      <span className="section-label">Philosophy</span>
      <div
        style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }}
      />
    </div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 8,
      }}
    >
      {philosophies.map((item, i) => (
        <PhilosophyPill
          key={item.title}
          icon={item.icon}
          title={item.title}
          desc={item.desc}
          delay={0.1 + i * 0.1}
        />
      ))}
    </div>
  </section>
);

export default Philosophy;
