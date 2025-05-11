import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import CarList from '../components/app/CarList';

function AppHome() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* <div className="text-center mb-12">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Bienvenido a PisaFondo Autos
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-lg text-gray-600"
          >
            Encuentra el coche de tus sueños al mejor precio
          </motion.p>
        </div> */}
        <CarList />
      </div>
    </motion.div>
  );
}

export default AppHome;