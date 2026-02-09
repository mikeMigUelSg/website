import { motion } from 'framer-motion';
import { TrendingUp, Coins, Leaf, Check } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import Counter from '../ui/Counter';
import styles from './Advantages.module.css';

const advantages = [
  {
    icon: TrendingUp,
    title: 'Custos Reduzidos, Uptime Elevado',
    description:
      'Entregamos uma solução BESS com CAPEX significativamente mais baixo que o mercado, focada em proteger a continuidade operacional — onde cada hora de downtime na indústria custa milhares de euros.',
    stats: [
      { label: 'Redução CAPEX', value: 40, suffix: '%' },
      { label: 'Uptime Garantido', value: 99.5, suffix: '%', decimals: 1 },
    ],
  },
  {
    icon: Coins,
    title: 'Duplo Fluxo de Receitas',
    description:
      'Além da poupança de energia, o nosso sistema está preparado para gerar receita extra ao participar nos mercados de serviços de sistema e agregação (como o aFRR em Portugal).',
    stats: [
      { label: 'Poupança Energia', value: 30, suffix: '%' },
      { label: 'Receita Adicional', value: 15, suffix: '%' },
    ],
  },
  {
    icon: Leaf,
    title: 'Liderança em ESG',
    description:
      'A PortEV é um caso de sucesso da Economia Circular, transformando um problema ambiental (resíduos de baterias) numa solução de infraestrutura essencial.',
    stats: [
      { label: 'CO₂ Evitado', value: 70, suffix: '%' },
      { label: 'Circularidade', value: 95, suffix: '%' },
    ],
  },
];

const comparisons = [
  { feature: 'Custo CAPEX', portev: 'Redução até 40%', traditional: 'Preço cheio', advantage: true },
  { feature: 'Sustentabilidade', portev: 'Economia Circular', traditional: 'Baterias novas', advantage: true },
  { feature: 'Garantia IA', portev: '8+ anos com AI-BMS', traditional: '5-7 anos padrão', advantage: true },
  { feature: 'Receita Passiva', portev: 'aFRR & Agregação', traditional: 'Limitada', advantage: true },
  { feature: 'Resiliência', portev: 'UPS + Ride-through', traditional: 'Variável', advantage: true },
];

export default function Advantages() {
  return (
    <section id="advantages" className={`section ${styles.advantages}`}>
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">Vantagens</span>
            <h2 className="section-title">
              O Diferencial Competitivo da <span className={styles.accent}>PortEV</span>
            </h2>
            <p className="section-subtitle">
              A única solução que combina eficazmente a poupança de custos com inteligência técnica e sustentabilidade.
            </p>
          </div>
        </AnimatedSection>

        <div className={styles.grid}>
          {advantages.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.15}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>
                    <item.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
                <p className={styles.cardDesc}>{item.description}</p>
                <div className={styles.statsRow}>
                  {item.stats.map((stat) => (
                    <div key={stat.label} className={styles.statItem}>
                      <span className={styles.statValue}>
                        <Counter
                          end={stat.value}
                          suffix={stat.suffix}
                          decimals={stat.decimals || 0}
                        />
                      </span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Comparison Table */}
        <AnimatedSection delay={0.3}>
          <div className={styles.comparison}>
            <h3 className={styles.compTitle}>PortEV vs. BESS Tradicional</h3>
            <div className={styles.compTable}>
              <div className={`${styles.compRow} ${styles.compHeader}`}>
                <div className={styles.compFeature}>Característica</div>
                <div className={styles.compPortev}>PortEV</div>
                <div className={styles.compTraditional}>Tradicional</div>
              </div>
              {comparisons.map((row, i) => (
                <motion.div
                  key={row.feature}
                  className={styles.compRow}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <div className={styles.compFeature}>{row.feature}</div>
                  <div className={`${styles.compPortev} ${styles.compHighlight}`}>
                    <Check size={16} className={styles.checkIcon} />
                    {row.portev}
                  </div>
                  <div className={styles.compTraditional}>{row.traditional}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
