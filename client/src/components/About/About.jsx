import { motion } from 'framer-motion';
import { Recycle, TrendingDown, ShieldCheck } from 'lucide-react';
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
      'Reduzimos significativamente o CAPEX para os clientes finais em comparação com sistemas de baterias novos, tornando o armazenamento de energia acessível.',
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
              utilizando baterias de veículos elétricos de segunda vida com capacidade residual comprovada de 70% a 80%.
            </p>
          </div>
        </AnimatedSection>

        <div className={styles.grid}>
          {problems.map((item, i) => (
            <GlowCard key={item.title} delay={i * 0.15}>
              <div className={styles.iconWrapper}>
                <item.icon size={28} strokeWidth={1.5} color={item.color} />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </GlowCard>
          ))}
        </div>

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
      </div>
    </section>
  );
}
