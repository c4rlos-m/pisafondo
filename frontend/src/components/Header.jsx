import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para navegación

const Header = () => {
  return (
    <header className="bg-header-footer text-light-gray py-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">PisaFondo Autos</h1>
        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Inicio</Link></li>
            <li><Link to="#cars" className="hover:text-blue-400 transition-colors">Coches</Link></li>
            <li><Link to="#about" className="hover:text-blue-400 transition-colors">Sobre Nosotros</Link></li>
          </ul>
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
           viewTransition> 
            Entrar a la App
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;