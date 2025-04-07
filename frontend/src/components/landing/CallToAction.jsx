// components/landing/CallToAction.js
import React from 'react';

const CallToAction = ({ title = "Explora Más", subtitle = "Tu próximo coche está a un clic.", ctaText = "Ver Coches", href = "/app" }) => {
  return (
    <section className="py-20 px-6 bg-apple-gray text-white text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">{title}</h2>
        <p className="text-xl text-gray-300 mb-10">{subtitle}</p>
        <a href={href} className="inline-block bg-blue-700 py-4 px-10 rounded-full text-lg font-medium hover:bg-blue-700 transition duration-300">{ctaText}</a>
      </div>
    </section>
  );
};

export default CallToAction;