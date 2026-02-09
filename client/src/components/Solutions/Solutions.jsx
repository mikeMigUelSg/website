import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Factory, Sun, Zap, ArrowRight } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import styles from './Solutions.module.css';

const solutions = [
  {
    id: 'industrial',
    icon: Factory,
    title: 'Resiliência Industrial (C&I)',
    shortTitle: 'Industrial',
    segment: 'Industrial, Comercial, Serviços',
    description:
      'Proporciona funcionalidade de UPS e ride-through (milissegundos a minutos), mitigando as interrupções de energia que causam milhares de euros em perdas de produção e sucata.',
    features: [
      'Funcionalidade UPS e ride-through',
      'Proteção contra micro-interrupções',
      'Mitigação de afundamentos de tensão',
      'Proteção de equipamentos sensíveis (PLCs, drives)',
      'Desbloqueio da capacidade da rede',
    ],
    capacity: '50 - 500 kWh',
  },
  {
    id: 'renewables',
    icon: Sun,
    title: 'Integração de Renováveis',
    shortTitle: 'Renováveis',
    segment: 'Industrial, Comercial, Serviços, Residencial',
    description:
      'Permite o autoconsumo otimizado e o peak shaving para reduzir custos de eletricidade e permitir a eletrificação de processos sem a necessidade de reforços de rede lentos e caros.',
    features: [
      'Autoconsumo solar otimizado',
      'Peak shaving e redução de custos',
      'Eletrificação sem reforço de rede',
      'Integração com sistemas fotovoltaicos',
      'Gestão inteligente de carga',
    ],
    capacity: '10 - 250 kWh',
  },
  {
    id: 'grid',
    icon: Zap,
    title: 'Serviços de Sistema',
    shortTitle: 'Agregação',
    segment: 'Agregadores de Energia, Residencial',
    description:
      'Permite que os ativos BESS participem em serviços ancilares da rede (como o aFRR em Portugal), gerando uma fonte de receita passiva para o cliente e para a PortEV.',
    features: [
      'Participação no mercado aFRR',
      'Receita passiva para o cliente',
      'Conformidade com o MPGGS',
      'Agregação de múltiplos ativos',
      'Otimização em tempo real',
    ],
    capacity: '10 - 100 kWh',
  },
];

export default function Solutions() {
  const [active, setActive] = useState(0);
  const current = solutions[active];

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
              Sistemas de armazenamento modulares de 10 kWh a 500 kWh, adaptados à sua necessidade.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className={styles.tabs}>
            {solutions.map((sol, i) => (
              <button
                key={sol.id}
                className={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
                onClick={() => setActive(i)}
              >
                <sol.icon size={20} />
                <span className={styles.tabLabel}>{sol.shortTitle}</span>
              </button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className={styles.solutionContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.solutionMain}>
              <div className={styles.solutionInfo}>
                <div className={styles.solutionIcon}>
                  <current.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className={styles.solutionTitle}>{current.title}</h3>
                <p className={styles.solutionDesc}>{current.description}</p>

                <div className={styles.segment}>
                  <span className={styles.segmentLabel}>Segmento:</span>
                  <span className={styles.segmentValue}>{current.segment}</span>
                </div>

                <div className={styles.capacity}>
                  <span className={styles.capacityLabel}>Capacidade:</span>
                  <span className={styles.capacityValue}>{current.capacity}</span>
                </div>
              </div>

              <div className={styles.features}>
                <h4 className={styles.featuresTitle}>Proposta de Valor</h4>
                <ul className={styles.featuresList}>
                  {current.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      className={styles.featureItem}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <ArrowRight size={16} className={styles.featureIcon} />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
