import { motion } from 'framer-motion';
import { Brain, Battery, Cpu, Shield, Clock, Award } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import GlowCard from '../ui/GlowCard';
import styles from './Technology.module.css';

const techFeatures = [
  {
    icon: Battery,
    title: 'Módulos NMC de Alta Densidade',
    description: 'Módulos de bateria NMC provenientes de veículos Tesla Model 3, com calibração de capacidade para desempenho seguro e previsível.',
  },
  {
    icon: Cpu,
    title: 'BMS Industrial',
    description: 'Battery Management System robusto de nível industrial (Orion BMS 2), garantindo segurança e conformidade operacional.',
  },
  {
    icon: Brain,
    title: 'IA Preditiva',
    description: 'Modelo de Inteligência Artificial para avaliação rápida do State-of-Health (SOH) e gestão dinâmica de carga em tempo real.',
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

export default function Technology() {
  return (
    <section id="technology" className={`section ${styles.technology}`}>
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">Tecnologia</span>
            <h2 className="section-title">
              BESS Modular com <span className={styles.accent}>Inteligência Artificial</span>
            </h2>
            <p className="section-subtitle">
              Sistema totalmente integrado e modular, desenhado para flexibilidade Behind-the-Meter,
              desde cabinets (10-100 kWh) a contentores (até 500 kWh).
            </p>
          </div>
        </AnimatedSection>

        {/* Architecture Diagram */}
        <AnimatedSection delay={0.1}>
          <div className={styles.architecture}>
            <div className={styles.archTitle}>Arquitetura do Sistema</div>
            <div className={styles.archFlow}>
              {[
                { label: 'Baterias EV\n2ª Vida', sublabel: 'NMC / 70-80% SOH', icon: '🔋' },
                { label: 'AI-BMS\nAnálise SOH', sublabel: 'Raspberry Pi 5', icon: '🧠' },
                { label: 'Orion BMS 2\nGestão', sublabel: 'Nível Industrial', icon: '⚙️' },
                { label: 'Inversor\n48V DC', sublabel: 'Saída AC/DC', icon: '⚡' },
                { label: 'Energia\nLimpa', sublabel: 'Casas & Empresas', icon: '🏭' },
              ].map((step, i) => (
                <div key={step.label} className={styles.archStep}>
                  <motion.div
                    className={styles.archNode}
                    whileInView={{ scale: [0, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                  >
                    <span className={styles.archIcon}>{step.icon}</span>
                    <span className={styles.archLabel}>{step.label}</span>
                    <span className={styles.archSublabel}>{step.sublabel}</span>
                  </motion.div>
                  {i < 4 && (
                    <motion.div
                      className={styles.archConnector}
                      whileInView={{ scaleX: [0, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.15, duration: 0.3 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Tech Features */}
        <div className={styles.grid}>
          {techFeatures.map((item, i) => (
            <GlowCard key={item.title} delay={i * 0.1}>
              <div className={styles.iconWrapper}>
                <item.icon size={26} strokeWidth={1.5} color="#1DB9A0" />
              </div>
              <h4 className={styles.cardTitle}>{item.title}</h4>
              <p className={styles.cardDesc}>{item.description}</p>
            </GlowCard>
          ))}
        </div>

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
