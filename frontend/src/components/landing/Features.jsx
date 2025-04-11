// components/landing/Features.jsx
import React, { useState } from 'react';
import { ShieldCheck, CreditCard, Search } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const Feature = ({ icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative px-6 py-8 bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-300 ${
        isHovered 
          ? 'h-76 shadow-lg border-blue-200' 
          : 'h-44'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center">
        <div className={`flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4 transition-transform duration-300 ${isHovered ? 'transform -translate-y-2' : ''}`}>
          <Icon className="h-8 w-8" />
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {title}
        </h3>
        
        <div className={`overflow-hidden transition-all duration-300 ${
          isHovered ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
        }`}>
          <p className="text-gray-600 text-center mt-2">
            {description}
          </p>
          
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Marketplace Seguro",
      description: "Ofrecemos un entorno protegido tanto para la compra de vehículos nuevos de nuestro concesionario como para transacciones entre particulares, garantizando la máxima seguridad en cada operación."
    },
    {
      icon: Search,
      title: "Amplio Catálogo",
      description: "Explore nuestra extensa selección de vehículos nuevos y usados, con opciones para todos los gustos y presupuestos. Filtros avanzados le ayudarán a encontrar exactamente lo que busca."
    },
    {
      icon: CreditCard,
      title: "Opciones de Financiación",
      description: "Disponemos de planes de financiación personalizados con tasas competitivas, aprobación rápida y condiciones flexibles para hacer realidad la adquisición de su vehículo ideal."
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Ventajas Exclusivas
          </h2>
          <div className="mt-4 max-w-2xl mx-auto">
            <p className="text-xl text-gray-600">
              Descubra por qué miles de clientes confían en nuestra plataforma para encontrar el vehículo perfecto.
            </p>
          </div>
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