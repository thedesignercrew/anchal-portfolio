import { useState, useEffect } from "react";


const useTextScramble = (text, trigger) => {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!trigger) {
      setDisplay(text);
      return;
    }
  }, [trigger, text]);

  return display;
};

export default useTextScramble;
