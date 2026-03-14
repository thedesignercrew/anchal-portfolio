import WorkCard from "../cards/WorkCard";
import { projects } from "../../constants/data";

const Work = () => (
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
        marginBottom: 20,
      }}
    >
      <span className="section-label">Selected Work</span>
      <div
        style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }}
      />
    </div>
    <p
      style={{
        fontSize: "0.85rem",
        color: "rgba(245,240,232,0.3)",
        marginBottom: 60,
        maxWidth: 500,
      }}
    >
      A curated selection of projects where design drove measurable impact.
    </p>

    <div className="work-grid">
      {projects.map((project, i) => (
        <WorkCard
          key={project.title}
          title={project.title}
          description={project.description}
          accent={project.accent}
          tags={project.tags}
          index={i}
        />
      ))}
    </div>
  </section>
);

export default Work;
