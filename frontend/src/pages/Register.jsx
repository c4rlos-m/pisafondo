import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="min-h-screen bg-dark-blue-gray text-light-gray flex items-center justify-center">
      <div className="bg-card-bg p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Regístrate</h2>
        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nombre"
              className="w-full p-3 bg-gray-700 rounded text-light-gray placeholder-gray-400"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-700 rounded text-light-gray placeholder-gray-400"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-3 bg-gray-700 rounded text-light-gray placeholder-gray-400"
            />
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold">
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-center">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-400 hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;