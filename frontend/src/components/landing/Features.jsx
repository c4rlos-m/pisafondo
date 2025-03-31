// components/landing/Features.jsx
import React from 'react';
import { ShieldCheck, CreditCard, Search } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const Feature = ({ icon: Icon, title, description }) => {
  return (
    <div className="px-4 py-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-lg font-medium text-white">{title}</h3>
      <p className="mt-2 text-base text-gray-300">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Transacciones Seguras",
      description: "Todas las compraventas están protegidas por nuestro sistema de verificación y garantía."
    },
    {
      icon: Search,
      title: "Búsqueda Avanzada",
      description: "Filtra por marca, modelo, año, precio y muchas más características para encontrar tu coche ideal."
    },
    {
      icon: CreditCard,
      title: "Facilidades de Pago",
      description: "Ofrecemos distintas opciones de financiación adaptadas a tus necesidades."
    }
  ];

  return (
    <div className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            ¿Por qué elegir PISAFONDO?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
            La plataforma que revoluciona la forma de comprar y vender coches.
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