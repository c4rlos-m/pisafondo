import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CallToAction = ({
  title = '¿Tienes dudas? ¡Contáctanos!',
  subtitle = 'Estamos aquí para ayudarte con cualquier pregunta.',
  ctaText = 'Contactar Ahora',
  href = '/app/contact',
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12 px-4 bg-gradient-to-br from-slate-50 to-indigo-50 text-center"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">{title}</h2>
        <p className="text-lg sm:text-xl text-slate-600 mb-6">{subtitle}</p>
        <Link
          to={href}
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-base font-medium rounded-full hover:from-indigo-700 hover:to-purple-700 hover:shadow-md hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Ir al formulario de contacto"
        >
          {ctaText}
        </Link>
      </div>
    </motion.section>
  );
};

export default CallToAction;