import ArticleCard from "../cards/ArticleCard";
import { articles } from "../../constants/data";

const Writing = () => (
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
      <span className="section-label">Writing</span>
      <div
        style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }}
      />
    </div>
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {articles.map((article, i) => (
        <ArticleCard
          key={article.title}
          index={i}
          title={article.title}
          subtitle={article.subtitle}
        />
      ))}
    </div>
  </section>
);

export default Writing;
