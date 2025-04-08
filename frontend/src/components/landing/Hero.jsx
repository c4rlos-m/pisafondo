// components/landing/Hero.js
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-apple-light flex flex-col items-center justify-center pt-16 px-6 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-apple-light via-transparent to-apple-light opacity-70"></div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-5xl mx-auto text-center z-10">
        <span className="inline-block text-apple-accent font-medium tracking-wider text-sm uppercase mb-3">Premium Automotive Experience</span>
        
        <h1 className="text-5xl md:text-7xl font-bold text-apple-dark mb-6 tracking-tight leading-tight">
          Diseñado para <span className="bg-clip-text text-blue-600">conducir</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Explora una selección de vehículos premium con una experiencia simple y elegante.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a 
            href="/app" 
            className="group inline-flex items-center justify-center bg-apple-accent text-white py-4 px-10 rounded-full text-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Descubre Ahora
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a 
            href="/catalog" 
            className="inline-flex items-center justify-center bg-transparent border border-apple-dark text-apple-dark py-4 px-10 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300"
          >
            Ver Catálogo
          </a>
        </div>
        
        <div className="flex items-center justify-center gap-8 text-gray-500">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span>Disponibilidad inmediata</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
            <span>Prueba sin compromiso</span>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent opacity-50"></div>
    </section>
  );
};

export default Hero;