const RingSpinner = ({
  size = 120,
  color = "rgba(200,170,120,0.15)",
  speed = 20,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      position: "absolute",
      border: `1px solid ${color}`,
      borderTopColor: "transparent",
      animation: `spin ${speed}s linear infinite`,
      pointerEvents: "none",
    }}
  />
);

export default RingSpinner;
