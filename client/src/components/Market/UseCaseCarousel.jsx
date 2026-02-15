import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './UseCaseCarousel.module.css';

export default function UseCaseCarousel({ useCases }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % useCases.length);
  }, [useCases.length]);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
  }, [useCases.length]);

  const goToSlide = useCallback((index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Autoplay com timer de 30 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 30000); // 30 segundos

    return () => clearInterval(timer);
  }, [goToNext]);

  const currentCase = useCases[currentIndex];
  // Primeiros 3 slides são verticais, último (index 3) é horizontal
  const isVerticalLayout = currentIndex < 3;
  const isTextTop = currentIndex % 2 === 0; // Alterna texto entre cima/baixo
  const isImageLeft = currentIndex % 2 === 0; // Para layout horizontal

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className={styles.carouselSection}>
      <h3 className={styles.carouselTitle}>Casos de Uso Reais</h3>

      <div className={styles.carouselContainer}>
        {/* Botão Anterior */}
        <button
          onClick={goToPrevious}
          className={`${styles.navButton} ${styles.navButtonPrev}`}
          aria-label="Caso anterior"
        >
          <ChevronLeft size={32} strokeWidth={2} />
        </button>

        {/* Conteúdo do Slide */}
        <div className={styles.carouselContent}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className={`${styles.slideWrapper} ${
                isVerticalLayout
                  ? `${styles.verticalLayout} ${isTextTop ? styles.textTop : styles.textBottom}`
                  : `${styles.horizontalLayout} ${isImageLeft ? styles.imageLeft : styles.imageRight}`
              }`}
            >
              {/* Imagem */}
              <div className={`${styles.imageContainer} ${isVerticalLayout ? styles.horizontalImage : styles.verticalImage}`}>
                <div className={styles.imagePlaceholder}>
                  {currentCase.image ? (
                    <img
                      src={currentCase.image}
                      alt={currentCase.title}
                      className={styles.image}
                    />
                  ) : (
                    <div className={styles.placeholderContent}>
                      <currentCase.icon size={80} strokeWidth={1.5} />
                      <p className={styles.placeholderText}>Adicione a imagem aqui</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Texto */}
              <div className={styles.textContainer}>
                <div className={styles.iconWrapper}>
                  <currentCase.icon size={32} strokeWidth={1.5} />
                </div>
                <h4 className={styles.slideTitle}>{currentCase.title}</h4>
                <p className={styles.slideDescription}>{currentCase.description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Botão Próximo */}
        <button
          onClick={goToNext}
          className={`${styles.navButton} ${styles.navButtonNext}`}
          aria-label="Próximo caso"
        >
          <ChevronRight size={32} strokeWidth={2} />
        </button>
      </div>

      {/* Indicadores (dots) */}
      <div className={styles.indicators}>
        {useCases.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
            aria-label={`Ir para caso ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
