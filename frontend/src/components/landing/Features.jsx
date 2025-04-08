// components/landing/Features.jsx
import React, { useState } from 'react';
import { ShieldCheck, CreditCard, Search } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const Feature = ({ icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative px-6 py-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700 transition-all duration-500 hover:scale-105" // Cuadro más grande
      onMouseEnter={() => setIsHovered(true)} // Muestra la respuesta al pasar el ratón
      onMouseLeave={() => setIsHovered(false)} // Oculta la respuesta al quitar el ratón
    >
      <div className={`flex items-center justify-center h-16 w-16 rounded-md bg-blue-500 text-white transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}> {/* Íconos más grandes y desaparecen al mostrar mensaje */}
        <Icon className="h-8 w-8" /> {/* Icono más grande */}
      </div>

      {/* Título visible siempre */}
      <h3 className={`mt-5 text-xl font-medium text-white transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        {title}
      </h3>
      
      {/* Respuesta que se muestra solo cuando está siendo hover */}
      <p className={`absolute inset-0 text-base text-gray-300 transition-opacity duration-500 flex items-center justify-center p-4 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        {description}
      </p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Marketplace Seguro",
      description: "Ofrecemos un mercado seguro tanto para la compra de vehículos nuevos de nuestro concesionario, como para que otros usuarios puedan vender sus coches a través de nuestra plataforma."
    },
    {
      icon: Search,
      title: "Elige el coche que más te guste",
      description: "Ya sea un coche nuevo de nuestro concesionario o uno usado de otro vendedor, puedes explorar diversas opciones y elegir el que más te guste según tus preferencias de marca, modelo, año y más."
    },
    {
      icon: CreditCard,
      title: "Facilidades de Pago",
      description: "Ofrecemos distintas opciones de financiación adaptadas a tus necesidades, para que puedas adquirir el coche de tus sueños de una forma cómoda y accesible."
    }
  ];

  return (
    <div className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            ¿Por qué elegirnos?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
            Descubre las ventajas de nuestra plataforma y cómo podemos ayudarte a encontrar el coche perfecto.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;