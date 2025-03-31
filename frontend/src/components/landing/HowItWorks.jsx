// components/landing/HowItWorks.jsx
import React from 'react';
import { Car, Search, Heart, CreditCard } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const Step = ({ icon: Icon, title, description, number }) => {
  return (
    <div className="relative">
      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
        <span className="font-bold text-lg">{number}</span>
      </div>
      <div className="ml-16">
        <div className="flex items-center">
          <Icon className="h-6 w-6 text-blue-400 mr-2" />
          <h3 className="text-lg font-medium text-white">{title}</h3>
        </div>
        <p className="mt-2 text-base text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const buySteps = [
    {
      icon: Search,
      title: "Busca",
      description: "Utiliza nuestros filtros para encontrar el coche que se ajuste a tus necesidades y presupuesto.",
      number: 1
    },
    {
      icon: Heart,
      title: "Contacta",
      description: "Guarda tus favoritos y contacta directamente con los vendedores para resolver tus dudas.",
      number: 2
    },
    {
      icon: CreditCard,
      title: "Compra",
      description: "Cierra la compra de forma segura a través de nuestra plataforma con garantía de devolución.",
      number: 3
    }
  ];

  const sellSteps = [
    {
      icon: Car,
      title: "Publica",
      description: "Crea un anuncio atractivo con fotos de calidad y una descripción detallada de tu vehículo.",
      number: 1
    },
    {
      icon: Search,
      title: "Recibe",
      description: "Recibe mensajes de compradores interesados y gestiona las visitas de forma sencilla.",
      number: 2
    },
    {
      icon: CreditCard,
      title: "Vende",
      description: "Cierra la venta con seguridad y recibe el pago directamente en tu cuenta bancaria.",
      number: 3
    }
  ];

  return (
    <div className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            ¿Cómo funciona?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
            Comprar o vender nunca ha sido tan fácil
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-6">Para compradores</h3>
          <div className="space-y-10">
            {buySteps.map((step, index) => (
              <Step key={index} {...step} />
            ))}
          </div>

          <h3 className="text-2xl font-bold text-white mb-6 mt-16">Para vendedores</h3>
          <div className="space-y-10">
            {sellSteps.map((step, index) => (
              <Step key={index} {...step} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;