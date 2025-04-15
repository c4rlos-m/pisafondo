import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowRight, Car, Clock, Shield } from "lucide-react";
import "../../styles/Hero.css"; // Ruta relativa para evitar problemas

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Activa la animación al cargar
    return () => setIsVisible(false); // Limpieza opcional
  }, []);

  return (
    <section className="hero-container" aria-labelledby="hero-title">
      <motion.div
        className="hero-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.5 }}
        aria-hidden="true"
      />

      <div className={`hero-content ${isVisible ? "animate-fade-in" : ""}`}>
        <motion.div
          className="badge-container"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* <span className="hero-badge">Colección 2025</span> */}
        </motion.div>

        <motion.span
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Conduce el futuro
        </motion.span>

        <motion.h1
          id="hero-title"
          className="hero-title"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Innovación que <span className="highlight-text">acelera</span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Experimenta vehículos de lujo que fusionan diseño audaz, tecnología avanzada y un rendimiento sin igual.
        </motion.p>

        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a
            href="/app"
            className="cta-button primary-btn"
            aria-label="Explorar modelos disponibles"
          >
            Descubrir Modelos
            <ArrowRight className="cta-icon" size={20} aria-hidden="true" />
          </a>
          <a
            href="/catalog"
            className="cta-button secondary-btn"
            aria-label="Reservar una prueba de conducción"
          >
            Reservar Prueba
            <Car className="cta-icon" size={18} aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div
          className="features-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="feature-item">
            <div className="feature-icon">
              <Clock size={24} className="icon" />
            </div>
            <div className="feature-text">
              <h3>Entrega Rápida</h3>
              <p>Tu coche en 24 horas</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <Shield size={24} className="icon" />
            </div>
            <div className="feature-text">
              <h3>Garantía Total</h3>
              <p>5 años sin límites</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="stat">
            <span className="stat-number">350+</span>
            <span className="stat-label">Modelos</span>
          </div>
          <div className="stat">
            <span className="stat-number">98%</span>
            <span className="stat-label">Satisfacción</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Soporte</span>
          </div>
        </motion.div>
      </div>

      <div className="hero-footer" aria-hidden="true" />
    </section>
  );
};

export default Hero;