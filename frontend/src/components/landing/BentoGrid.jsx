// components/landing/BentoGrid.js
import React from 'react';

const BentoGrid = () => {
  return (
    <section className="py-20 px-6 bg-apple-gray text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-apple-dark p-8 rounded-xl col-span-2">
          <h3 className="text-2xl font-semibold mb-4">Diseño Premium</h3>
          <p className="text-gray-300">Cada vehículo está diseñado para impresionar, dentro y fuera de la carretera.</p>
        </div>
        <div className="bg-apple-dark p-8 rounded-xl">
          <h3 className="text-2xl font-semibold mb-4">Tecnología</h3>
          <p className="text-gray-300">Innovación al volante.</p>
        </div>
        <div className="bg-apple-dark p-8 rounded-xl">
          <h3 className="text-2xl font-semibold mb-4">Soporte</h3>
          <p className="text-gray-300">Asistencia en cada kilómetro.</p>
        </div>
        <div className="bg-apple-dark p-8 rounded-xl col-span-2">
          <h3 className="text-2xl font-semibold mb-4">Personalización</h3>
          <p className="text-gray-300">Haz que tu coche sea único con nuestras opciones exclusivas.</p>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;