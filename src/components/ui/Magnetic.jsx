import { useState, useRef } from "react";

const Magnetic = ({ children, strength = 0.3, className = "", style = {} }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        ...style,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      {children}
    </div>
  );
};

export default Magnetic;
