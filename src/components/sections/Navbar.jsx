import Magnetic from "../ui/Magnetic";

const navItems = ["Work", "Writing", "About"];

const Navbar = () => (
  <nav
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: "24px 48px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "rgba(10,10,10,0.8)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
      animation: "fadeIn 1s ease 0.2s both",
    }}
  >
    <Magnetic strength={0.15}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #C8AA78, #A08858)",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#0A0A0A",
            fontFamily: "'Instrument Serif', serif",
          }}
        >
          A
        </div>
        <span
          style={{
            fontSize: "0.9rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          anchal mittal
        </span>
      </div>
    </Magnetic>
    <div
      style={{
        display: "flex",
        gap: 32,
        fontSize: "0.8rem",
        color: "rgba(245,240,232,0.5)",
      }}
    >
      {navItems.map((item) => (
        <Magnetic key={item} strength={0.2}>
          <span
            className="nav-link"
            style={{ cursor: "pointer", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.target.style.color = "#F5F0E8")}
            onMouseLeave={(e) =>
              (e.target.style.color = "rgba(245,240,232,0.5)")
            }
          >
            {item}
          </span>
        </Magnetic>
      ))}
    </div>
  </nav>
);

export default Navbar;
