import Magnetic from "../ui/Magnetic";
import { socialLinks } from "../../constants/data";

const Footer = () => (
  <footer
    style={{
      padding: "80px 48px",
      maxWidth: 1400,
      margin: "0 auto",
      position: "relative",
      borderTop: "1px solid rgba(255,255,255,0.04)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: 40,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Let's create
          <br />
          <span style={{ fontStyle: "italic", color: "#C8AA78" }}>
            something great.
          </span>
        </div>
        <a
          href="mailto:anchal.cca@gmail.com"
          style={{
            fontSize: "0.9rem",
            color: "rgba(245,240,232,0.4)",
            borderBottom: "1px solid rgba(245,240,232,0.1)",
            paddingBottom: 4,
            transition: "color 0.3s, border-color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#C8AA78";
            e.target.style.borderColor = "#C8AA78";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "rgba(245,240,232,0.4)";
            e.target.style.borderColor = "rgba(245,240,232,0.1)";
          }}
        >
          anchal.cca@gmail.com
        </a>
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {socialLinks.map((link) => (
          <Magnetic key={link} strength={0.25}>
            <span
              style={{
                fontSize: "0.8rem",
                color: "rgba(245,240,232,0.3)",
                cursor: "pointer",
                transition: "color 0.3s",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#C8AA78")}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(245,240,232,0.3)")
              }
            >
              {link}
            </span>
          </Magnetic>
        ))}
      </div>
    </div>
    <div
      style={{
        marginTop: 60,
        paddingTop: 24,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.72rem",
        color: "rgba(245,240,232,0.15)",
      }}
    >
      <span>&copy; 2026 Anchal Mittal</span>
      <span>Designed with intention</span>
    </div>
  </footer>
);

export default Footer;
