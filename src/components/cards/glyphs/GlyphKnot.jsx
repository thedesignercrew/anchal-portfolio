const GlyphKnot = ({ visible }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}>
    <style>{`
      @keyframes drawKnot {
        to { stroke-dashoffset: 0; }
      }
    `}</style>
    <path
      d="M20 90 C20 60 50 80 60 60 C70 40 40 20 60 20 C80 20 100 40 100 60 C100 80 80 90 60 80 C40 70 30 50 50 40"
      stroke="rgba(200,170,120,0.25)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M20 90 C20 60 50 80 60 60 C70 40 40 20 60 20 C80 20 100 40 100 60 C100 80 80 90 60 80 C40 70 30 50 50 40"
      stroke="#C8AA78"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="300"
      strokeDashoffset={visible ? "0" : "300"}
      style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
    />
    <line
      x1="50" y1="40" x2="100" y2="40"
      stroke="rgba(200,170,120,0.7)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="50"
      strokeDashoffset={visible ? "0" : "50"}
      style={{ transition: "stroke-dashoffset 0.5s ease 1s" }}
    />
    <circle
      cx="100" cy="40" r="3"
      fill="#C8AA78"
      opacity={visible ? 1 : 0}
      style={{ transition: "opacity 0.3s ease 1.4s" }}
    />
  </svg>
);

export default GlyphKnot;
