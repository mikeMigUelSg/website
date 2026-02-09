import styles from './FloatingShapes.module.css';

export default function FloatingShapes({ count = 6, section = 'default' }) {
  const shapes = Array.from({ length: count }, (_, i) => {
    const size = 20 + Math.random() * 60;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 6 + Math.random() * 8;
    const rotation = Math.random() * 45;
    const opacity = 0.05 + Math.random() * 0.1;

    return (
      <div
        key={`${section}-${i}`}
        className={styles.shape}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          top: `${top}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          transform: `rotate(${rotation}deg)`,
          opacity,
        }}
      />
    );
  });

  return <div className={styles.container}>{shapes}</div>;
}
