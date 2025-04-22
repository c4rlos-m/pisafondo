// src/pages/LandingPage.js
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/landing/Hero';
import CallToAction from '../components/landing/CallToAction';
import FeaturedCarsScroll from '../components/landing/FeaturedCarsScroll';
import Features from '../components/landing/Features';
import BentoGrid from '../components/landing/BentoGrid';
import Testimonials from '../components/landing/Testimonials';
import Footer from '../components/landing/Footer';
import PromoVideo from '../components/landing/video';

const LandingPage = () => {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <Features />
      <FeaturedCarsScroll />
      <CallToAction title="Tu Coche Ideal" subtitle="Explora nuestra colección ahora." />
      <BentoGrid />
      <PromoVideo />
      <Testimonials />
      <CallToAction title="Contáctanos" subtitle="Estamos aquí para ayudarte." ctaText="Enviar Mensaje" href="#contact" />
      <Footer />
    </div>
  );
};

export default LandingPage;