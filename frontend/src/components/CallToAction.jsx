import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-header-footer text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-light-gray">
          ¿Listo para pisar el acelerador?
        </h2>
        <p className="text-lg mb-8 text-gray-400">
          Regístrate y empieza a comprar o vender coches hoy mismo.
        </p>
        <Link
          to="/register"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-10 rounded-lg transition-all duration-300 animate-pulse subtle"
        >
          Únete ahora
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;