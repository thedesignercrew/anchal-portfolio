const ARCS = [
  "M60 18 C78 30 78 90 60 102",
  "M60 18 C42 30 42 90 60 102",
  "M60 18 C92 30 92 90 60 102",
  "M60 18 C28 30 28 90 60 102",
];

const LAT_ARCS = [
  { d: "M18 45 C35 38 85 38 102 45", len: 90 },
  { d: "M18 60 C35 60 85 60 102 60", len: 90 },
  { d: "M18 75 C35 82 85 82 102 75", len: 90 },
];

const GlyphGlobe = ({ visible }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}>
    <circle cx="60" cy="60" r="42"
      stroke="#C8AA78" strokeWidth="1"
      strokeDasharray="264"
      strokeDashoffset={visible ? "0" : "264"}
      style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)" }}
    />
    {ARCS.map((d, i) => (
      <path key={i} d={d} stroke="#C8AA78" strokeWidth="0.8"
        opacity="0.5"
        strokeDasharray="100"
        strokeDashoffset={visible ? "0" : "100"}
        style={{ transition: `stroke-dashoffset 0.6s ease ${0.4 + i * 0.1}s` }}
      />
    ))}
    {LAT_ARCS.map(({ d, len }, i) => (
      <path key={i} d={d} stroke="#C8AA78" strokeWidth="0.8"
        opacity="0.4"
        strokeDasharray={len}
        strokeDashoffset={visible ? "0" : `${len}`}
        style={{ transition: `stroke-dashoffset 0.5s ease ${0.7 + i * 0.12}s` }}
      />
    ))}
  </svg>
);

export default GlyphGlobe;
