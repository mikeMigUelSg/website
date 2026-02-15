import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Battery, ArrowRight } from 'lucide-react';
import styles from './Solutions.module.css';

export default function CategoryCard({ category }) {
  const [activeId, setActiveId] = useState(null);
  const Icon = category.icon;

  const handleClick = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryHeader}>
        <div className={styles.categoryIcon}>
          <Icon size={28} strokeWidth={1.5} />
        </div>
        <div>
          <h3 className={styles.categoryTitle}>{category.title}</h3>
          <p className={styles.categorySubtitle}>{category.subtitle}</p>
        </div>
      </div>

      <div className={styles.useCasesList}>
        {category.useCases.map((useCase, i) => {
          const UseCaseIcon = useCase.icon;
          const isActive = activeId === useCase.id;

          return (
            <motion.div
              key={useCase.id}
              className={styles.useCaseItem}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                className={`${styles.useCaseButton} ${isActive ? styles.useCaseButtonActive : ''}`}
                onClick={() => handleClick(useCase.id)}
              >
                <div className={styles.useCaseButtonLeft}>
                  <div className={styles.useCaseButtonIcon}>
                    <UseCaseIcon size={18} strokeWidth={1.5} />
                  </div>
                  <span className={styles.useCaseButtonText}>{useCase.name}</span>
                </div>
                <motion.div
                  animate={{ rotate: isActive ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={18} className={styles.useCaseChevron} />
                </motion.div>
              </button>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className={styles.useCaseContent}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div className={styles.useCaseContentInner}>
                      <div className={styles.useCaseCapacity}>
                        <Battery size={14} />
                        <span>{useCase.capacity}</span>
                      </div>

                      <p className={styles.useCaseDescription}>{useCase.description}</p>

                      <ul className={styles.useCaseBenefits}>
                        {useCase.benefits.map((benefit, idx) => (
                          <motion.li
                            key={benefit}
                            className={styles.useCaseBenefit}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + idx * 0.06 }}
                          >
                            <ArrowRight size={14} className={styles.benefitIcon} />
                            <span>{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
