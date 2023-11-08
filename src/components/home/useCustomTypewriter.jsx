import { useState, useEffect } from "react";

function useCustomTypewriter(text, delaySpeed = 100) {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setTypedText((prevTypedText) => prevTypedText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delaySpeed);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentIndex, text, delaySpeed]);

  return typedText;
}
export default useCustomTypewriter;
