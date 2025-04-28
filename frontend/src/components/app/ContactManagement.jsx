import React, { useState, useEffect } from 'react';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/contact', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContacts(response.data);
        setError('');
      } catch (error) {
        console.error('Error al obtener contactos:', error);
        setError('No se pudieron cargar los contactos');
        toast.error('Error al cargar los contactos', {
          position: 'top-right',
          autoClose: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleReply = async (contactId) => {
    if (!replyMessage.trim()) {
      toast.error('El mensaje de respuesta no puede estar vacío', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/contact/reply',
        { contactId: parseInt(contactId, 10), replyMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === contactId ? { ...contact, replied: true } : contact
        )
      );

      toast.success('Respuesta enviada correctamente', {
        position: 'top-right',
        autoClose: 3000,
      });

      setReplyMessage('');
      setSelectedContactId(null);
    } catch (error) {
      console.error('Error al enviar respuesta:', error);
      toast.error('Error al enviar la respuesta', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleCancelReply = () => {
    setReplyMessage('');
    setSelectedContactId(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-900 mb-8 text-center"
      >
        Gestión de Contactos
      </motion.h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <svg
            className="animate-spin h-10 w-10 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-lg flex items-center gap-3">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm flex-1">{error}</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center text-gray-500">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-2 text-lg font-medium">No hay contactos disponibles</p>
        </div>
      ) : (
        <div className="space-y-6">
          {contacts.map((contact) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-white border border-gray-100 rounded-xl shadow-lg p-6 transition-all duration-300 ${
                contact.replied ? 'bg-green-50' : 'bg-white'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Nombre:</strong> {contact.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {contact.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Asunto:</strong> {contact.subject}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Fecha:</strong> {new Date(contact.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Estado:</strong>{' '}
                    {contact.replied ? (
                      <span className="text-green-600">Respondido</span>
                    ) : (
                      <span className="text-red-600">Pendiente</span>
                    )}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Mensaje:</strong> {contact.message}
              </p>
              {!contact.replied && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedContactId(contact.id)}
                  className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Responder
                </motion.button>
              )}
              <AnimatePresence>
                {selectedContactId === contact.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      rows={4}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCancelReply}
                        className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancelar
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReply(contact.id)}
                        className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Enviar Respuesta
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactManagement;