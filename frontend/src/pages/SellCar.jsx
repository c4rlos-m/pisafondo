import React from 'react';
import SellCarForm from '../components/app/sellCarForm.jsx';

const SellCar = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl shadow-indigo-900/20 border border-gray-700 p-6">
        <h1 className="text-3xl font-bold text-white text-center mb-4">
          Vende tu coche
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Completa el formulario para poner tu vehículo en el mercado
        </p>
        <SellCarForm />
      </div>
    </div>
  );
};

export default SellCar;