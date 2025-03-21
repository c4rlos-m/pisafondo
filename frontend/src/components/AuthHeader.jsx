import React from 'react';
import { Link } from 'react-router-dom';

const AuthHeader = () => {
  return (
    <header className="bg-gray-800 text-white py-4 fixed w-full top-0 z-10 border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold tracking-tight text-indigo-400">
          PisaFondo Autos
        </h1>
        <nav className="flex items-center space-x-6">
        <Link to="/" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
  Volver al Inicio
</Link>
        </nav>
      </div>
    </header>
  );
};

export default AuthHeader;