// components/landing/WhyChooseUs.js
import React from 'react';

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-6 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">¿Por qué elegirnos?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Calidad Garantizada</h3>
            <p className="text-gray-300">Todos nuestros vehículos pasan rigurosas inspecciones.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Experiencia Premium</h3>
            <p className="text-gray-300">Atención personalizada y proceso 100% digital.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Financiación Flexible</h3>
            <p className="text-gray-300">Opciones de pago adaptadas a tus necesidades.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;