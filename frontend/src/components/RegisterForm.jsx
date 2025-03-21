import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");  
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccessMessage("Registro exitoso. ¡Prepárate para conducir tu experiencia!");
      setErrorMessage(""); 
    } else {
      setErrorMessage(data.error || "Error en el arranque. Intenta de nuevo.");
      setSuccessMessage(""); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-2xl shadow-indigo-900/20 border border-gray-700">
        {/* Encabezado con toque automovilístico */}
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Únete al viaje
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Regístrate para acelerar hacia tu próximo coche
        </p>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Campo de nombre */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Nombre del conductor
            </label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-500"
            />
          </div>

          {/* Campo de correo */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="tuemail@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-500"
            />
          </div>

          {/* Campo de contraseña */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Llave de encendido (Contraseña)
            </label>
            <input
              type="password"
              placeholder="Crea tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-500"
            />
          </div>

          {/* Botón de envío */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              Arrancar registro
            </button>
          </div>

          {/* Enlace a login */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>

          {/* Mensajes de error y éxito */}
          {errorMessage && (
            <p className="text-red-400 text-sm text-center mt-4 bg-red-900/20 p-2 rounded-lg">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-green-400 text-sm text-center mt-4 bg-green-900/20 p-2 rounded-lg">
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;