import { motion } from 'framer-motion';
import { Zap, TrendingUp, Shield } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import EnergySystem3D from './EnergySystem3D';
import styles from './Technology.module.css';

const vppAdvantages = [
  {
    icon: Zap,
    title: 'aFRR & Novo MPGGs',
    description: 'Com a entrada do aFRR (automatic Frequency Restoration Reserve) no novo Manual de Procedimentos, abre-se a porta a unidades físicas agregadas participarem ativamente no mercado de serviços de sistema.',
  },
  {
    icon: TrendingUp,
    title: 'BSP — Balance Service Provider',
    description: 'As baterias agregadas comportam-se como um BSP, disponibilizando uma banda flexível no programa de funcionamento base e sendo remuneradas por essa capacidade de reserva.',
  },
  {
    icon: Shield,
    title: 'A Bateria como Ativo',
    description: 'A bateria de segunda vida permite exatamente isto: oferecer flexibilidade à rede, gerar receita passiva e contribuir para a estabilidade do sistema elétrico nacional.',
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
              Virtual Power Plant — <span className={styles.accent}>VPP</span>
            </h2>
            <p className="section-subtitle">
              Com a introdução do aFRR no novo MPGGs, unidades físicas agregadas podem comportar-se
              como um BSP (Balance Service Provider), disponibilizando uma banda flexível no seu programa
              de funcionamento base — e sendo remuneradas por isso. A bateria permite exatamente isto.
            </p>
          </div>
        </AnimatedSection>

        {/* 3D Energy System Visualization */}
        <AnimatedSection delay={0.1}>
          <EnergySystem3D />
        </AnimatedSection>

        {/* VPP Advantage Section */}
        <AnimatedSection delay={0.2}>
          <div className={styles.aiSection}>
            <h3 className={styles.aiTitle}>
              <Zap size={28} />
              Como Funciona o VPP com aFRR
            </h3>
            <p className={styles.aiSubtitle}>
              Cada bateria residencial torna-se parte de uma central virtual — agregadas, fornecem reserva de frequência à rede e geram receita para os seus proprietários.
            </p>
            <div className={styles.aiGrid}>
              {vppAdvantages.map((item, i) => (
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
