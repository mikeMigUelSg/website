import { motion } from 'framer-motion';
import { Recycle, TrendingDown, ShieldCheck,Clock,Shield,Award } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import GlowCard from '../ui/GlowCard';
import styles from './About.module.css';

const problems = [
  {
    icon: Recycle,
    title: 'Crise de Resíduos de Baterias',
    description:
      'Damos uma segunda vida útil a milhões de baterias de VE que chegam ao fim da sua vida útil em automóveis, transformando um fluxo de resíduos num ativo de alto valor.',
    color: '#1DB9A0',
  },
  {
    icon: TrendingDown,
    title: 'Custo do Armazenamento',
    description:
      'Reduzimos significativamente o CAPEX para os clientes finais em comparação com o baseline do mercado, tornando o armazenamento de energia acessível.',
    color: '#17A08A',
  },
  {
    icon: ShieldCheck,
    title: 'Qualidade de Energia',
    description:
      'Protegemos operações críticas de clientes industriais e comerciais contra micro-interrupções, afundamentos de tensão e picos de demanda.',
    color: '#1DB9A0',
  },
];

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

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">Sobre Nós</span>
            <h2 className="section-title">
              A Solução de <span className={styles.accent}>Economia Circular</span> para a Resiliência Energética
            </h2>
            <p className="section-subtitle">
              A PortEV desenvolve e comercializa Sistemas Modulares de Armazenamento de Energia (BESS),
              utilizando baterias de veículos elétricos.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className={styles.circularEconomy}>
            <div className={styles.economyFlow}>
              {['Baterias EV', 'Reaproveitamento', 'Sistema BESS', 'Energia Limpa'].map((step, i) => (
                <div key={step} className={styles.flowStep}>
                  <motion.div
                    className={styles.flowCircle}
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
                  >
                    <span className={styles.flowNumber}>{i + 1}</span>
                  </motion.div>
                  <span className={styles.flowLabel}>{step}</span>
                  {i < 3 && <div className={styles.flowArrow} />}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
          {/* testye */}
        <AnimatedSection delay={0.2}>
          <div className={styles.aiSection}>
            <h3 className={styles.aiTitle}>
              <Brain size={28} />
              A Vantagem da Inteligência Artificial
            </h3>
            <p className={styles.aiSubtitle}>
              O cerne da nossa vantagem competitiva — permitindo gerir o risco inerente às baterias de segunda vida.
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
