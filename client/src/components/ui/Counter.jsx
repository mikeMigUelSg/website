import { useState, useEffect } from 'react';
import { useInView } from '../../hooks/useInView';

export default function Counter({ end, duration = 2000, prefix = '', suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const startValue = 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (end - startValue) * eased;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}
    </span>
  );
}
