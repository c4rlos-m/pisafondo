import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Send, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';

const ContactForm = ({ carId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const subjectOptions = [
    { value: '', label: 'Seleccionar un asunto' },
    { value: 'consulta_general', label: 'Consulta general' },
    { value: 'problema_tecnico', label: 'Problema técnico' },
    { value: 'sugerencia', label: 'Sugerencia' },
    { value: 'compra_venta', label: 'Compra o venta de vehículo' },
    { value: 'soporte_cliente', label: 'Soporte al cliente' },
    { value: 'otro', label: 'Otro' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/contact/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          carId: carId || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar el formulario');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Mensaje enviado correctamente', {
        position: 'top-right',
        autoClose: 3000,
      });

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          message: '',
          subject: '',
        });
      }, 3000);
    } catch (err) {
      setError(err.message || 'Hubo un problema al enviar el mensaje.');
      toast.error(err.message || 'Error al enviar el mensaje', {
        position: 'top-right',
        autoClose: 3000,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center py-4 text-center"
        >
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">¡Mensaje enviado!</h3>
          <p className="text-gray-600 text-sm">Te responderemos pronto.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <p className="text-red-500 text-center bg-red-50 p-2 rounded-lg text-sm">
              {error}
            </p>
          )}
          <div className="space-y-3">
            <div className="relative">
              <label
                htmlFor="name"
                className="text-xs font-medium text-gray-700 mb-1 block"
              >
                Nombre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Tu nombre"
                  className="w-full pl-8 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="email"
                className="text-xs font-medium text-gray-700 mb-1 block"
              >
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@correo.com"
                  className="w-full pl-8 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="subject"
                className="text-xs font-medium text-gray-700 mb-1 block"
              >
                Asunto
              </label>
              <div className="relative">
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
                  required
                >
                  {subjectOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={option.value === ''}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="message"
                className="text-xs font-medium text-gray-700 mb-1 block"
              >
                Mensaje
              </label>
              <div className="relative">
                <div className="absolute top-2 left-2 flex items-start pointer-events-none">
                  <MessageSquare className="h-4 w-4 text-gray-400" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tu mensaje"
                  className="w-full pl-8 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 h-20"
                  required
                />
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Enviando...
              </>
            ) : (
              <>
                Enviar <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
};

export default ContactForm;