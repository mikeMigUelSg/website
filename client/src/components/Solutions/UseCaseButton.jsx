import { motion } from 'framer-motion';
import styles from './Solutions.module.css';

export default function UseCaseButton({ useCase, isActive, onClick, index }) {
  const Icon = useCase.icon;

  return (
    <motion.button
      className={`${styles.pill} ${isActive ? styles.pillActive : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Icon size={16} className={styles.pillIcon} />
      <span>{useCase.name}</span>
    </motion.button>
  );
}
