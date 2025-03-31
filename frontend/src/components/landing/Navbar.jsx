// components/landing/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-apple-gray text-white py-4 px-6 shadow-sm z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold tracking-tight">Premium Cars</Link>
        <div className="space-x-8 flex items-center">
          <a href="#home" className="text-sm hover:text-apple-accent transition duration-300">Inicio</a>
          <a href="#features" className="text-sm hover:text-apple-accent transition duration-300">Características</a>
          <a href="#cars" className="text-sm hover:text-apple-accent transition duration-300">Coches</a>
          <a href="#contact" className="text-sm hover:text-apple-accent transition duration-300">Contacto</a>
          <Link to="/app" className="bg-apple-accent text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-blue-700 transition duration-300">Explorar</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;