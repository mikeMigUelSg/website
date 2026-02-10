import { motion } from 'framer-motion';
import { Globe, TrendingUp, Zap, AlertTriangle, Factory, CloudLightning, TrendingDown } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import Counter from '../ui/Counter';
import FloatingShapes from '../ui/FloatingShapes';
import UseCaseCarousel from './UseCaseCarousel';
import styles from './Market.module.css';

// Importar imagens
import BlackoutImg from '../../img/Blackout.png';
import KristinImg from '../../img/Kristin.jpeg';
import SinesImg from '../../img/Sines.png';
import CellsImg from '../../img/Cells.png';

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
    title: 'Blackout 28 de Abril',
    description:
      'O apagão de 28 de abril de 2025, desencadeado por uma falha nas interligações e perda súbita de produção solar na Andaluzia, deixou a Península Ibérica isolada, provando que a segurança da rede exige descentralização real.',
    icon: AlertTriangle,
    image: BlackoutImg,
  },
  {
    title: 'Tempestade Kristin',
    description:
      'A tempestade Kristin, que levou à declaração de Estado de Calamidade em 2026, deixou meio milhão de portugueses sem luz e destruiu infraestruturas críticas, expondo a incapacidade da rede atual em resistir a eventos climáticos extremos locais.',
    icon: CloudLightning,
    image: KristinImg,
  },
  {
    title: 'Sines 4.0 & Grid Strain',
    description:
      'Com o Start Campus em Sines a atingir 1.2 GW de capacidade (mais de 10% do pico de consumo nacional), a pressão na rede dispara. Sem armazenamento local, esta procura massiva inflaciona os preços e aumenta o risco de falhas no abastecimento.',
    icon: TrendingDown,
    image: SinesImg,
  },
  {
    title: 'Baterias "Second Life" 2030',
    description:
      'Até 2030, a primeira geração de VEs em Portugal chega ao fim de vida. Milhares de baterias com 70-80% de capacidade estarão disponíveis, criando uma oportunidade única para armazenamento estacionário de baixo custo e apoio à rede.',
    icon: Factory,
    image: CellsImg,
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

        {/* Use Cases Carousel */}
        <AnimatedSection delay={0.2}>
          <UseCaseCarousel useCases={useCases} />
        </AnimatedSection>
      </div>
    </section>
  );
}
