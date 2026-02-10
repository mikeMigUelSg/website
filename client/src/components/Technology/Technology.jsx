import { motion } from 'framer-motion';
import { Brain, Shield, Clock, Award } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import EnergySystem3D from './EnergySystem3D';
import styles from './Technology.module.css';

const aiAdvantages = [
  {
    icon: Clock,
    title: 'Teste Acelerado',
    description: 'A IA reduz drasticamente o tempo de avaliação do SOH de cada módulo, eliminando dias de ciclos de carga/descarga manuais.',
  },
  {
    icon: Shield,
    title: 'Monitorização Preditiva',
    description: 'Gestão dinâmica que assegura operação dentro dos parâmetros ideais de longevidade, maximizando a vida útil do sistema.',
  },
  {
    icon: Award,
    title: 'Garantia 8+ Anos',
    description: 'A gestão de precisão da IA permite oferecer garantia de desempenho superior a 8 anos, desbloqueando a confiança no mercado.',
  },
];

export default function Technology() {
  return (
    <section id="technology" className={`section ${styles.technology}`}>
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">Tecnologia</span>
            <h2 className="section-title">
              Como Funciona o <span className={styles.accent}>Sistema BESS</span>
            </h2>
            <p className="section-subtitle">
              Visualização interativa 3D mostrando a integração completa do sistema de armazenamento
              de energia na sua casa ou empresa.
            </p>
          </div>
        </AnimatedSection>

        {/* 3D Energy System Visualization */}
        <AnimatedSection delay={0.1}>
          <EnergySystem3D />
        </AnimatedSection>

        {/* AI Advantage Section */}
        <AnimatedSection delay={0.2}>
          <div className={styles.aiSection}>
            <h3 className={styles.aiTitle}>
              <Brain size={28} />
              A Vantagem da Inteligência Artificial
            </h3>
            <p className={styles.aiSubtitle}>
              O coração da nossa vantagem competitiva — permitindo gerir o risco inerente às baterias de segunda vida.
            </p>
            <div className={styles.aiGrid}>
              {aiAdvantages.map((item, i) => (
                <motion.div
                  key={item.title}
                  className={styles.aiCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <div className={styles.aiCardIcon}>
                    <item.icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className={styles.aiCardTitle}>{item.title}</h4>
                    <p className={styles.aiCardDesc}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
