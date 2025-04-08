import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../../styles/Hero.css'; 

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-subtitle">Explora la experiencia automotriz premium</span>
        <h1 className="hero-title">
          Diseñado para <span className="highlight-text">conducir</span>
        </h1>
        <p className="hero-description">
          Descubre una selección exclusiva de vehículos de lujo con una experiencia intuitiva y elegante.
        </p>

        <div className="cta-buttons">
          <a href="/app" className="cta-button primary-btn">
            Descubre Ahora
            <ArrowRight className="cta-icon" />
          </a>

          <a href="/catalog" className="cta-button secondary-btn">
            Ver Catálogo
          </a>
        </div>

        <div className="info">
          <div className="info-item">
            <div className="indicator available"></div>
            <span>Disponibilidad inmediata</span>
          </div>
          <div className="info-item">
            <div className="indicator test-drive"></div>
            <span>Prueba sin compromiso</span>
          </div>
        </div>
      </div>

      <div className="hero-footer"></div>
    </section>
  );
};

export default Hero;
