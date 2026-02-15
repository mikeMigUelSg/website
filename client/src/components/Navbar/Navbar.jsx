import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Sobre', href: '#about' },
  { label: 'Soluções', href: '#solutions' },
  { label: 'Tecnologia', href: '#technology' },
  { label: 'Vantagens', href: '#advantages' },
  { label: 'Mercado', href: '#market' },
  { label: 'Contacto', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={`container ${styles.inner}`}>
        <a href="#hero" onClick={(e) => handleClick(e, '#hero')} className={styles.logo}>
          <img src="/logo.png" alt="PortEV" />
        </a>

        <div className={styles.desktopNav}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={(e) => handleClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`btn btn-primary ${styles.ctaBtn}`}
            onClick={(e) => handleClick(e, '#contact')}
          >
            Fale Connosco
          </a>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileNav}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={styles.mobileLink}
                onClick={(e) => handleClick(e, link.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="#contact"
              className="btn btn-primary"
              onClick={(e) => handleClick(e, '#contact')}
              style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}
            >
              Fale Connosco
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
