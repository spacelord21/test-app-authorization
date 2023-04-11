import { useEffect, useState } from "react";

let interval: ReturnType<typeof setInterval>;
const second = 1000;
const deadline = 20;

export const useTimer = () => {
  const [seconds, setSeconds] = useState(deadline);

  useEffect(() => {
    interval = setInterval(() => {
      if (seconds === 0) {
        clearInterval(interval);
        return;
      }
      setSeconds((prev) => prev - 1);
    }, second);
    return () => clearInterval(interval);
  }, [setSeconds, seconds]);

  return { seconds, setSeconds };
};
