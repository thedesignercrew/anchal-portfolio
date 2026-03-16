const GlyphTarget = ({ visible }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}>
    <style>{`
      @keyframes pulseRing {
        0%   { r: 18; opacity: 0.7; }
        100% { r: 44; opacity: 0; }
      }
    `}</style>
    {[44, 30, 18].map((r, i) => (
      <circle
        key={r} cx="60" cy="60" r={r}
        stroke="#C8AA78"
        strokeWidth="1"
        opacity={visible ? (i === 0 ? 0.15 : i === 1 ? 0.3 : 0.6) : 0}
        style={{ transition: `opacity 0.4s ease ${0.1 + i * 0.15}s` }}
      />
    ))}
    {[
      { x1: 60, y1: 16, x2: 60, y2: 38, len: 22 },
      { x1: 60, y1: 82, x2: 60, y2: 104, len: 22 },
      { x1: 16, y1: 60, x2: 38, y2: 60, len: 22 },
      { x1: 82, y1: 60, x2: 104, y2: 60, len: 22 },
    ].map(({ x1, y1, x2, y2, len }, i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="#C8AA78" strokeWidth="1.2" strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={visible ? "0" : `${len}`}
        style={{ transition: `stroke-dashoffset 0.4s ease ${0.5 + i * 0.08}s` }}
      />
    ))}
    {visible && (
      <circle cx="60" cy="60" r="18"
        stroke="rgba(200,170,120,0.6)" strokeWidth="1" fill="none"
        style={{ animation: "pulseRing 1.6s ease-out 0.6s infinite" }}
      />
    )}
    <circle cx="60" cy="60" r="4" fill="#C8AA78"
      opacity={visible ? 1 : 0}
      style={{ transition: "opacity 0.3s ease 0.4s" }}
    />
  </svg>
);

export default GlyphTarget;
