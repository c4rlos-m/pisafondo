// components/landing/ContactForm.js
import React, { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log({ name, email, message });
  };

  return (
    <section className="py-20 px-6 bg-apple-light">
      <div className="max-w-lg mx-auto">
        <h2 className="text-4xl font-bold text-apple-dark text-center mb-12">Contáctanos</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-apple-accent transition duration-300"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-apple-accent transition duration-300"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tu mensaje"
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-apple-accent transition duration-300 h-32"
            required
          />
          <button
            type="submit"
            className="w-full bg-apple-accent text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;