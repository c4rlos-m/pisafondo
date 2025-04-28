import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ContactManagement from '../../components/app/ContactManagement';

const ContactsPageAdmin = () => {

  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      <ContactManagement />
    </motion.div>
  );
};

export default ContactsPageAdmin;