import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-dark-blue-gray text-light-gray flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-extrabold text-blue-500 mb-4 animate-fade-in">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">¡Oops! Página no encontrada</h2>
        <p className="text-lg md:text-xl mb-8 text-gray-400">
          Parece que te has perdido en la carretera. ¡Volvamos al camino correcto!
        </p>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;