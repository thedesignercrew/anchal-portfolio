import { useState, useEffect } from "react";

const chars = "!<>-_\\/[]{}—=+*^?#________";

const useTextScramble = (text, trigger) => {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!trigger) {
      setDisplay(text);
      return;
    }
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
    return () => clearInterval(interval);
  }, [trigger, text]);

  return display;
};

export default useTextScramble;
