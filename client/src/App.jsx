import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Solutions from './components/Solutions/Solutions';
import Technology from './components/Technology/Technology';
import Advantages from './components/Advantages/Advantages';
import Market from './components/Market/Market';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function LoadingScreen() {
  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        gap: '24px',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src="/logo.png"
        alt="PortEV"
        style={{ height: '60px' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        style={{
          width: '120px',
          height: '3px',
          background: '#e0f7f1',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            background: '#1DB9A0',
            borderRadius: '4px',
          }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <main>
            <Hero />
            <About />
            <Solutions />
            <Technology />
            <Advantages />
            <Market />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}
