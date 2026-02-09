import { motion } from 'framer-motion';
import { Globe, TrendingUp, Zap, AlertTriangle } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import Counter from '../ui/Counter';
import FloatingShapes from '../ui/FloatingShapes';
import styles from './Market.module.css';

const marketStats = [
  {
    value: 200,
    suffix: ' GW',
    label: 'Capacidade de Armazenamento na UE até 2030',
    icon: Globe,
  },
  {
    value: 31,
    prefix: '€',
    suffix: 'M',
    label: 'Projeção de Receitas até 2035',
    icon: TrendingUp,
  },
  {
    value: 7,
    suffix: ' kWh',
    label: 'Protótipo em Desenvolvimento (48V)',
    icon: Zap,
  },
];

const useCases = [
  {
    title: 'Blackout Ibérico',
    description:
      'O apagão que afetou Portugal e Espanha demonstrou a vulnerabilidade da rede e a necessidade crítica de sistemas de armazenamento descentralizados e resilientes.',
    icon: AlertTriangle,
  },
  {
    title: 'Indústria Automóvel',
    description:
      'Afundamentos de tensão em fábricas como a Stellantis causam perdas de produção de milhares de euros por cada interrupção, demonstrando o valor da resiliência energética.',
    icon: Zap,
  },
];

const timeline = [
  { date: 'Q3 2025', title: 'Constituição Legal', description: 'Empresa constituída legalmente em Portugal.', done: true },
  { date: 'Q4 2025', title: 'Protótipo 7 kWh', description: 'Desenvolvimento de protótipo com tensão padrão de 48V para inversores.', done: true },
  { date: '2026', title: 'EDP Energy Starter', description: 'Candidatura ao programa de aceleração Track 3 2026.', done: false },
  { date: '2027', title: 'Primeiro Piloto C&I', description: 'Instalação piloto em cliente industrial.', done: false },
  { date: '2035', title: 'Escala Europeia', description: 'Projeção de receitas de €31M com operações em múltiplos mercados.', done: false },
];

export default function Market() {
  return (
    <section id="market" className={`section ${styles.market}`}>
      <FloatingShapes count={5} section="market" />
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">Mercado & Tração</span>
            <h2 className="section-title">
              Um Mercado em <span className={styles.accent}>Crescimento Exponencial</span>
            </h2>
            <p className="section-subtitle">
              O armazenamento de energia é um dos setores de maior crescimento na Europa,
              com necessidades que ultrapassam os 200 GW até 2030.
            </p>
          </div>
        </AnimatedSection>

        {/* Market Stats */}
        <div className={styles.statsGrid}>
          {marketStats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.15} direction="scale">
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <stat.icon size={28} strokeWidth={1.5} />
                </div>
                <div className={styles.statValue}>
                  <Counter
                    end={stat.value}
                    prefix={stat.prefix || ''}
                    suffix={stat.suffix}
                    duration={2500}
                  />
                </div>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Timeline */}
        <AnimatedSection delay={0.2}>
          <div className={styles.timelineSection}>
            <h3 className={styles.timelineTitle}>Roadmap</h3>
            <div className={styles.timeline}>
              {timeline.map((item, i) => (
                <motion.div
                  key={item.date}
                  className={`${styles.timelineItem} ${item.done ? styles.timelineDone : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <span className={styles.timelineDate}>{item.date}</span>
                    <h4 className={styles.timelineItemTitle}>{item.title}</h4>
                    <p className={styles.timelineDesc}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Use Cases */}
        <div className={styles.useCases}>
          <AnimatedSection>
            <h3 className={styles.useCasesTitle}>Casos de Uso Reais</h3>
          </AnimatedSection>
          <div className={styles.useCasesGrid}>
            {useCases.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.15}>
                <div className={styles.useCase}>
                  <div className={styles.useCaseIcon}>
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h4 className={styles.useCaseTitle}>{item.title}</h4>
                  <p className={styles.useCaseDesc}>{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
