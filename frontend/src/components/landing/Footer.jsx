// components/landing/Footer.js
/*
import React from 'react';

const Footer = () => {
  return (
    <>
    <hr className="border-t border-gray-700 my-12 mx-6" />


    <footer id="contact" className="bg-apple-dark text-gray-400 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Premium Cars</h3>
          <p>Simplificando la excelencia automotriz.</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Enlaces</h3>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-apple-accent transition duration-300">Inicio</a></li>
            <li><a href="#features" className="hover:text-apple-accent transition duration-300">Características</a></li>
            <li><a href="/app" className="hover:text-apple-accent transition duration-300">Explorar</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Contacto</h3>
          <p>Email: info@premiumcars.com</p>
          <p>Tel: +34 123 456 789</p>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-500 text-sm">
        <p>© 2025 Premium Cars. Todos los derechos reservados.</p>
      </div>
    </footer>
    </>
  );
};

export default Footer;

*/

import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
  return (
    <>
      <br></br>
      <footer id="contact" className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3 className="footer-title">Premium Cars</h3>
            <p>Simplificando la excelencia automotriz.</p>
          </div>
          <div className="footer-section">
            <h3 className="footer-subtitle">Enlaces</h3>
            <ul className="footer-links">
              <li><a href="#home">Inicio</a></li>
              <li><a href="#features">Características</a></li>
              <li><a href="/app">Explorar</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-subtitle">Contacto</h3>
            <p>Email: info@premiumcars.com</p>
            <p>Tel: +34 123 456 789</p>
          </div>
        </div>
        <div className="footer-bottom">
          <br></br><br></br>
          © 2025 PISAFONDO. Todos los derechos reservados.
        </div>
      </footer>
    </>
  );
};

export default Footer;
