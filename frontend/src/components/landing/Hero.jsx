// components/landing/Hero.js
import React from 'react';

const Hero = () => {
  return (
    <section className="min-h-screen bg-apple-light flex items-center justify-center pt-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-apple-dark mb-6 tracking-tight">Diseñado para conducir</h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Explora una selección de vehículos premium con una experiencia simple y elegante.</p>
        <a href="/app" className="inline-block bg-blue-700 text-white py-4 px-10 rounded-full text-lg font-medium hover:bg-blue-700 transition duration-300">Descubre Ahora</a>
      </div>
    </section>
  );
};

export default Hero;