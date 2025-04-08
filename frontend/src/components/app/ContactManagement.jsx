import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [selectedContactId, setSelectedContactId] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/contact/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContacts(response.data);
      } catch (error) {
        console.error('Error al obtener contactos:', error);
      }
    };
    fetchContacts();
  }, []);

  const handleReply = async (contactId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/contact/reply',
        { contactId: parseInt(contactId, 10), replyMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Respuesta enviada');
      
      // Actualizar el estado para marcar el contacto como respondido
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === contactId ? { ...contact, replied: true } : contact
        )
      );
      
      setReplyMessage('');
      setSelectedContactId(null);
    } catch (error) {
      console.error('Error al enviar respuesta:', error);
      alert('Error al enviar la respuesta');
    }
  };
  
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestión de Contactos</h2>
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`border p-4 rounded-lg transition-colors duration-300 ${
              contact.replied ? 'bg-green-100' : 'bg-white'
            }`}
          >
            <p><strong>Nombre:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Asunto:</strong> {contact.subject}</p>
            <p><strong>Mensaje:</strong> {contact.message}</p>
            <p><strong>Fecha:</strong> {new Date(contact.created_at).toLocaleString()}</p>
            <button
              onClick={() => setSelectedContactId(contact.id)}
              className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
            >
              Responder
            </button>
            {selectedContactId === contact.id && (
              <div className="mt-2">
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={() => handleReply(contact.id)}
                  className="mt-2 bg-green-500 text-white py-1 px-3 rounded"
                >
                  Enviar Respuesta
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactManagement;
