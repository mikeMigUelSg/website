import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Linkedin, ArrowRight } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import styles from './Contact.module.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Contacto PortEV - ${form.name}${form.company ? ` (${form.company})` : ''}`;
    const body = `Nome: ${form.name}\nEmail: ${form.email}\nEmpresa: ${form.company || 'N/A'}\n\nMensagem:\n${form.message}`;
    window.location.href = `mailto:info@portev.pt?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('success');
    setForm({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">Contacto</span>
            <h2 className="section-title">
              Vamos Conversar Sobre o Seu <span className={styles.accent}>Projeto</span>
            </h2>
            <p className="section-subtitle">
              Interessado nas nossas soluções de armazenamento de energia?
              Entre em contacto connosco.
            </p>
          </div>
        </AnimatedSection>

        <div className={styles.grid}>
          <AnimatedSection delay={0.1} direction="left">
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="name">Nome</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="O seu nome"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="email@empresa.com"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="company">Empresa</label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Nome da empresa"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder="Descreva o seu projeto ou necessidade..."
                  rows={5}
                  required
                />
              </div>

              <button
                type="submit"
                className={`btn btn-primary ${styles.submitBtn}`}
              >
                Enviar Mensagem
                <Send size={18} />
              </button>

              {status === 'success' && (
                <motion.p
                  className={styles.successMsg}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Mensagem enviada com sucesso! Entraremos em contacto brevemente.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  className={styles.errorMsg}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Ocorreu um erro. Por favor tente novamente ou contacte-nos diretamente.
                </motion.p>
              )}
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.2} direction="right">
            <div className={styles.info}>
              <h3 className={styles.infoTitle}>Informação de Contacto</h3>

              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>Email</span>
                    <span className={styles.infoValue}>info@portev.pt</span>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>Localização</span>
                    <span className={styles.infoValue}>Portugal</span>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>LinkedIn</span>
                    <span className={styles.infoValue}>PortEV</span>
                  </div>
                </div>
              </div>

              <div className={styles.cta}>
                <h4 className={styles.ctaTitle}>Pronto para reduzir os seus custos de energia?</h4>
                <p className={styles.ctaDesc}>
                  Agende uma consulta gratuita e descubra como a PortEV pode
                  transformar a resiliência energética do seu negócio.
                </p>
                <button
                  className="btn btn-white"
                  onClick={() => document.getElementById('name')?.focus()}
                >
                  Iniciar Conversa
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
