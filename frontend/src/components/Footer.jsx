import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-header-footer text-gray-400 py-6">
      <div className="container mx-auto text-center">
        <p>© 2025 PisaFondo Autos. Todos los derechos reservados.</p>
        <div className="mt-2">
          <a href="#privacy" className="hover:text-blue-400 mx-2 transition-colors">Privacidad</a>
          <a href="#terms" className="hover:text-blue-400 mx-2 transition-colors">Términos</a>
          <a href="#contact" className="hover:text-blue-400 mx-2 transition-colors">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;