import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import CarDetail from '../components/app/CarDetail';

const CarDetailPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      <CarDetail />
    </motion.div>
  );
};

export default CarDetailPage;