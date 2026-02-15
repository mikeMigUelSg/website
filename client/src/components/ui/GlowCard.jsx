import { motion } from 'framer-motion';
import styles from './GlowCard.module.css';

export default function GlowCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={`${styles.card} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className={styles.glowBorder} />
      <div className={styles.content}>
        {children}
      </div>
    </motion.div>
  );
}
