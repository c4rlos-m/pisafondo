import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const adminLinks = [
  {
    title: 'Gestión de Contactos',
    description: 'Administra los mensajes y consultas de los usuarios.',
    path: '/app/admin',
    icon: (
      <svg
        className="w-8 h-8 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l4-4h3.414A1.994 1.994 0 0017 12.414"
        />
      </svg>
    ),
  },
  {
    title: 'Validación de Vehículos',
    description: 'Revisa y aprueba los vehículos subidos por los usuarios.',
    path: '/app/validacion_coches',
    icon: (
      <svg
        className="w-8 h-8 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export const Administracion = () => {
  const navigate = useNavigate();

  // Verificar permisos antes de navegar
  const handleNavigation = (path) => {
   
    navigate(path);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">Panel de Administración</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {adminLinks.map((link) => (
            <motion.div
              key={link.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex items-start gap-4 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex-shrink-0">{link.icon}</div>
              <div className="flex-1">
                <Link
                  to={link.path}
                  onClick={(e) => {
                    e.preventDefault(); // Prevenir navegación directa
                    handleNavigation(link.path);
                  }}
                  className="text-xl font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {link.title}
                </Link>
                <p className="text-sm text-gray-600 mt-1">{link.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};