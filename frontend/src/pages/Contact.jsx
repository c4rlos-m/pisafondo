import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import ContactForm from '../components/landing/ContactForm';

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=" bg-gradient-to-b from-gray-50 to-white flex flex-col justify-center py-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Encabezado */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Contáctanos
          </h1>
          <p className="mt-2 text-base text-gray-600 max-w-xl mx-auto">
            Completa el formulario o contáctanos por teléfono o correo.
          </p>
        </motion.div>

        {/* Contenedor principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg p-4"
          >
            <ContactForm />
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-1 bg-white rounded-xl shadow-lg px-12 py-8"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Información de Contacto
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-indigo-600 mr-2" />
                <a
                  href="tel:+34600000000"
                  className="text-gray-600 hover:text-indigo-600 text-sm"
                  aria-label="Llamar al +34 600 000 000"
                >
                  +34 600 000 000
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-indigo-600 mr-2" />
                <a
                  href="mailto:info@tuempresa.com"
                  className="text-gray-600 hover:text-indigo-600 text-sm"
                  aria-label="Enviar correo a info@tuempresa.com"
                >
                  info@tuempresa.com
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-indigo-600 mr-2" />
                <span className="text-gray-600 text-sm">
                  Calle Ejemplo 123, Madrid
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h3 className="text-base font-semibold text-gray-800 mb-2">
                Horario
              </h3>
              <p className="text-gray-600 text-xs">
                Lunes a Viernes: 9:00 - 18:00
                <br />
                Sábado: 10:00 - 14:00
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;