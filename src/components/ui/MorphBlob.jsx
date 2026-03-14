const MorphBlob = ({
  color = "rgba(200,170,120,0.12)",
  size = 500,
  speed = 8,
  top,
  left,
  right,
  bottom,
}) => {
  const style = {
    position: "absolute",
    width: size,
    height: size,
    top,
    left,
    right,
    bottom,
    background: color,
    borderRadius: "50%",
    filter: "blur(80px)",
    animation: `morphBlob ${speed}s ease-in-out infinite alternate`,
    pointerEvents: "none",
    zIndex: 0,
  };
  return <div style={style} />;
};

export default MorphBlob;
