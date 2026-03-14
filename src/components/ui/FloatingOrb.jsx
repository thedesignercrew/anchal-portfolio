import { orbPositions, orbDurations } from "../../constants/data";

const FloatingOrb = ({ delay = 0, size = 6, color = "#C8AA78", index = 0 }) => {
  const pos = orbPositions[index % orbPositions.length];
  const dur = orbDurations[index % orbDurations.length]/2;
  const style = {
    position: "absolute",
    width: size,
    height: size,
    borderRadius: "50%",
    background: color,
    opacity: 0.4,
    left: pos.left,
    top: pos.top,
    animation: `floatOrb ${dur}s ease-in-out infinite alternate`,
    animationDelay: `${delay}s`,
    pointerEvents: "none",
  };
  return <div style={style} />;
};

export default FloatingOrb;
