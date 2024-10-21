import { useCallback, useEffect, useRef, useState } from "react";

export const useTimer = (timeLimit: { min: number; sec: number }) => {
  const [timeUp, setTimeUp] = useState(false);

  const [time, setTime] = useState(timeLimit);
  const intervalID = useRef<number | NodeJS.Timeout>();

  const zeroPaddingNum = (num: number) => {
    const zeroPadding = String(num).padStart(2, "0");
    return Number(zeroPadding);
  };

  const startTime = useCallback(() => {
    setTime(timeLimit);
    intervalID.current = setInterval(() => tick(), 1000);
    setTimeUp(false);
  }, []);

  useEffect(() => {
    return () => clearInterval(intervalID.current);
  }, []);

  const tick = useCallback(() => {
    setTime((prevTime) => {
      const newTimeLimit = Object.assign({}, prevTime);
      const { min, sec } = newTimeLimit;

      if (min === 0 && sec === 0) {
        clearInterval(intervalID.current);
        setTimeUp(true);
        return newTimeLimit;
      }

      if (newTimeLimit.min > 0 && newTimeLimit.sec <= 0) {
        newTimeLimit.min -= 1;
        newTimeLimit.sec = 60;
      }

      newTimeLimit.sec -= 1;

      return {
        min: zeroPaddingNum(newTimeLimit.min),
        sec: zeroPaddingNum(newTimeLimit.sec),
      };
    });
  }, []);

  return { time, timeUp, startTime };
};
