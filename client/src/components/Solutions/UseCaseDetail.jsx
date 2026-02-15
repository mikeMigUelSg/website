import { motion } from 'framer-motion';
import { ArrowRight, Battery } from 'lucide-react';
import styles from './Solutions.module.css';

export default function UseCaseDetail({ useCase }) {
  const Icon = useCase.icon;

  return (
    <motion.div
      className={styles.detailPanel}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={styles.detailInner}>
        <div className={styles.detailHeader}>
          <div className={styles.detailIcon}>
            <Icon size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h4 className={styles.detailTitle}>{useCase.name}</h4>
            <div className={styles.detailCapacity}>
              <Battery size={14} />
              <span>{useCase.capacity}</span>
            </div>
          </div>
        </div>

        <p className={styles.detailDesc}>{useCase.description}</p>

        <ul className={styles.detailBenefits}>
          {useCase.benefits.map((benefit, i) => (
            <motion.li
              key={benefit}
              className={styles.detailBenefit}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <ArrowRight size={14} className={styles.benefitIcon} />
              <span>{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
