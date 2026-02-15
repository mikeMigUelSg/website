import { motion } from 'framer-motion';
import { TrendingUp, Coins, Leaf, Activity} from 'lucide-react';
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
    icon: Activity, // Importar de 'lucide-react'
    title: 'Smart Care e Otimização',
    description:
      'Garantimos a segurança das suas instalações com monitorização 24/7 e manutenção preditiva. Os nossos algoritmos gerem automaticamente os ciclos de carga para acelerar o retorno do investimento (ROI) e prolongar a vida útil do equipamento.',
    stats: [
      { label: 'Resolução Remota', value: 90, suffix: '%' }, // Indica que a maioria dos problemas se resolve sem visita técnica
      { label: 'Otimização ROI', value: 20, suffix: '%' }, // A gestão inteligente reduz o tempo de payback
    ],
  },
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
              A única solução que combinade maneira eficaz a poupança de custos com inteligência técnica e sustentabilidade.
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
      </div>
    </section>
  );
}
