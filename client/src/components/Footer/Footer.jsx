import { ArrowUp } from 'lucide-react';
import styles from './Footer.module.css';

const navLinks = [
  { label: 'Sobre', href: '#about' },
  { label: 'Soluções', href: '#solutions' },
  { label: 'Tecnologia', href: '#technology' },
  { label: 'Vantagens', href: '#advantages' },
  { label: 'Mercado', href: '#market' },
  { label: 'Contacto', href: '#contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src="/logo.png" alt="PortEV" className={styles.logo} />
            <p className={styles.brandDesc}>
              Repurpose. Unlock. Earn.
              <br />
              Sistemas de armazenamento de energia a partir de baterias de VE de segunda vida.
            </p>
          </div>

          <div className={styles.nav}>
            <h4 className={styles.navTitle}>Navegação</h4>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={styles.navLink}
                    onClick={(e) => handleClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.badges}>
            <h4 className={styles.navTitle}>Compromisso</h4>
            <div className={styles.badgeList}>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>♻️</span>
                <span>Economia Circular</span>
              </div>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>🌱</span>
                <span>ESG Compliance</span>
              </div>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>⚡</span>
                <span>Energia Limpa</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} PortEV. Todos os direitos reservados.
          </p>
          <button className={styles.backToTop} onClick={scrollToTop} aria-label="Voltar ao topo">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
