import { useState, useEffect, useRef } from 'react';

export function useTimer() {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(Date.now());
  const intervalRef = useRef(null);

  useEffect(() => {
    startRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  function reset() {
    startRef.current = Date.now();
    setElapsed(0);
  }

  const seconds = elapsed % 60;
  const minutes = Math.floor(elapsed / 60);
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return { elapsed, formatted, reset };
}
