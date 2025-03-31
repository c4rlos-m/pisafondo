// components/landing/Testimonials.js
import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-apple-light">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-apple-dark mb-12">Voces de Conductores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <p className="text-gray-600 mb-4">"Una experiencia simple y elegante. Encontré mi coche ideal en minutos."</p>
            <h4 className="text-lg font-semibold text-apple-dark">— Ana M.</h4>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <p className="text-gray-600 mb-4">"El diseño y la calidad del servicio son incomparables."</p>
            <h4 className="text-lg font-semibold text-apple-dark">— Luis P.</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;