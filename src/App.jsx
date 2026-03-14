import { useState, useEffect } from "react";
import "./styles/animations.css";

import MorphBlob from "./components/ui/MorphBlob";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Philosophy from "./components/sections/Philosophy";
import Writing from "./components/sections/Writing";
import Work from "./components/sections/Work";
import ParkEasyShowcase from "./components/sections/ParkEasyShowcase";
import Footer from "./components/sections/Footer";

export default function Portfolio() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      style={{
        background: "#0A0A0A",
        color: "#F5F0E8",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Cursor Glow */}
      <div
        style={{
          position: "fixed",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,170,120,0.04) 0%, transparent 70%)",
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          pointerEvents: "none",
          zIndex: 9999,
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }}
      />

      {/* Background Blobs */}
      <MorphBlob
        color="rgba(200,170,120,0.06)"
        size={600}
        speed={12}
        top="-10%"
        right="-10%"
      />
      <MorphBlob
        color="rgba(138,172,184,0.05)"
        size={500}
        speed={15}
        bottom="20%"
        left="-8%"
      />
      <MorphBlob
        color="rgba(184,138,138,0.04)"
        size={400}
        speed={10}
        top="50%"
        right="10%"
      />

      {/* Center grid line */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          width: 1,
          height: "100%",
          background: "rgba(255,255,255,0.02)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Navbar />
      <Hero />
      <Philosophy />
      <Writing />
      <Work />
      <ParkEasyShowcase />
      <Footer />
    </div>
  );
}
