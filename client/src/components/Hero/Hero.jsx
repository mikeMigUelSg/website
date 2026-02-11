import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import ParticleBackground from '../ui/ParticleBackground';
import FloatingShapes from '../ui/FloatingShapes';
import styles from './Hero.module.css';

export default function Hero() {
  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={styles.hero}>
      <ParticleBackground />
      <FloatingShapes count={8} section="hero" />

      <div className={styles.gradientOverlay} />

      <div className={`container ${styles.content}`}>
        <motion.div
          className={styles.logoContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img src="/logo_slogan.png" alt="PortEV - Repurpose. Unlock. Earn." className={styles.logoImg} />
        </motion.div>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Transformamos baterias de veículos elétricos de segunda vida
          em soluções de armazenamento de energia acessíveis para
          <span className={styles.highlight}> Casas e Empresas</span>.
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <button
            className="btn btn-primary"
            onClick={() => scrollToSection('#solutions')}
          >
            Descubra as Nossas Soluções
            <ArrowRight size={18} />
          </button>
          <button
            className="btn btn-outline"
            onClick={() => scrollToSection('#contact')}
          >
            Contacte-nos
          </button>
        </motion.div>

        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <div className={styles.stat}>
            <span className={styles.statValue}>Até 90% de redução *</span>
            <span className={styles.statLabel}>Payback</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>10-500 kWh</span>
            <span className={styles.statLabel}>Sistemas Modulares</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>8+ Anos</span>
            <span className={styles.statLabel}>Garantia de Desempenho</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => scrollToSection('#about')}
      >
        <span>Descubra mais</span>
        <ChevronDown size={20} className={styles.scrollArrow} />
      </motion.div>
    </section>
  );
}
