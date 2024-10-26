import { useState, useEffect } from "react";

const useSlideInterval = (slideCount: number, intervalMs: number) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, intervalMs);

    return () => clearInterval(slideInterval);
  }, [slideCount, intervalMs]);

  return currentSlide;
};

export default useSlideInterval;
