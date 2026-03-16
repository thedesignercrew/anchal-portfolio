const GlyphVenn = ({ visible }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}>
    {[
      { cx: 46, cy: 48, delay: "0s" },
      { cx: 74, cy: 48, delay: "0.2s" },
      { cx: 60, cy: 72, delay: "0.4s" },
    ].map(({ cx, cy, delay }, i) => (
      <circle key={i} cx={cx} cy={cy} r="28"
        stroke="#C8AA78" strokeWidth="1.2"
        strokeDasharray="176"
        strokeDashoffset={visible ? "0" : "176"}
        opacity="0.65"
        style={{ transition: `stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}` }}
      />
    ))}
    <circle cx="60" cy="58" r="3.5" fill="#C8AA78"
      opacity={visible ? 0.9 : 0}
      style={{ transition: "opacity 0.4s ease 1s" }}
    />
    {[
      { x1: 60, y1: 58, x2: 46, y2: 48 },
      { x1: 60, y1: 58, x2: 74, y2: 48 },
      { x1: 60, y1: 58, x2: 60, y2: 72 },
    ].map(({ x1, y1, x2, y2 }, i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="rgba(200,170,120,0.4)" strokeWidth="0.8" strokeLinecap="round"
        strokeDasharray="20"
        strokeDashoffset={visible ? "0" : "20"}
        style={{ transition: `stroke-dashoffset 0.3s ease ${1.1 + i * 0.1}s` }}
      />
    ))}
  </svg>
);

export default GlyphVenn;
