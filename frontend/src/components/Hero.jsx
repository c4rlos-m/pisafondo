import React from 'react';
import heroImg from '/images/hero-car.webp'; // Ajusta la ruta

const Hero = () => {
  return (
    <section
      className="bg-cover bg-center h-screen flex items-center bg-dark-blue-gray relative"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay oscuro */}
      <div className="container mx-auto text-center text-light-gray relative z-10 animate-fade-in-down">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          Acelera hacia tu próximo coche
        </h2>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Compra, vende y vive la carretera con PisaFondo
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#cars"
            className="bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
          >
            Echar un vistazo
          </a>
          <a
            href="/register"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
          >
            Regístrate ahora
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;