import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar el formulario');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Resetear el formulario después de 3 segundos
      setTimeout(() => {
        setIsSubmitted(false);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Hubo un problema al enviar el mensaje. Intenta de nuevo.');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-apple-light flex items-center justify-center">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-apple-accent font-medium text-sm uppercase tracking-wider mb-2">Estamos para ayudarte</span>
          <h2 className="text-4xl md:text-5xl font-bold text-apple-dark mb-4">Contáctanos</h2>
          <p className="text-gray-600 max-w-lg mx-auto">Nuestro equipo está disponible para resolver tus dudas y ofrecerte la mejor experiencia automovilística.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-apple-dark mb-2">¡Mensaje enviado!</h3>
              <p className="text-gray-600">Gracias por contactarnos. Te responderemos a la brevedad.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 block">Nombre</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre completo"
                      className="w-full pl-10 p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-apple-accent focus:border-transparent transition duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">Correo electrónico</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full pl-10 p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-apple-accent focus:border-transparent transition duration-300"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-1 block">Asunto</label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="¿Sobre qué quieres hablar?"
                  className="w-full p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-apple-accent focus:border-transparent transition duration-300"
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-1 block">Mensaje</label>
                <div className="relative">
                  <div className="absolute top-4 left-3 flex items-start pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tu mensaje detallado aquí..."
                    className="w-full pl-10 p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-apple-accent focus:border-transparent transition duration-300 h-36"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="privacy-policy"
                  type="checkbox"
                  className="h-4 w-4 text-apple-accent border-gray-300 rounded focus:ring-apple-accent"
                  required
                />
                <label htmlFor="privacy-policy" className="ml-2 block text-sm text-gray-600">
                  He leído y acepto la <a href="/privacy" className="text-apple-accent hover:underline">política de privacidad</a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-apple-accent text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar mensaje <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between text-sm text-gray-500">
              <p className="mb-2 md:mb-0">También puedes contactarnos directamente:</p>
              <div className="flex space-x-4">
                <a href="tel:+34911234567" className="hover:text-apple-accent">+34 911 234 567</a>
                <a href="mailto:info@tuempresa.com" className="hover:text-apple-accent">info@tuempresa.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Nos pondremos en contacto contigo en un plazo máximo de 24 horas laborables.</p>
        </div>

      </div>
    </section>
  );
};

export default ContactForm;