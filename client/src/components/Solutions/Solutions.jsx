import AnimatedSection from '../ui/AnimatedSection';
import CategoryCard from './CategoryCard';
import { categories } from './solutionsData';
import styles from './Solutions.module.css';

export default function Solutions() {
  return (
    <section id="solutions" className={`section ${styles.solutions}`}>
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">Soluções</span>
            <h2 className="section-title">
              Aplicações <span className={styles.accent}>Behind-the-Meter</span>
            </h2>
            <p className="section-subtitle">
              Sistemas de armazenamento modulares de 5 kWh a 1 MWh, adaptados à sua necessidade.
            </p>
          </div>
        </AnimatedSection>

        <div className={styles.categoriesGrid}>
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.id} delay={i * 0.15} direction={i === 0 ? 'left' : 'right'}>
              <CategoryCard category={cat} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
