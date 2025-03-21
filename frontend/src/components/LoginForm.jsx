import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Agregado para coherencia

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      setSuccessMessage("¡Encendido exitoso! Redirigiendo al tablero...");
      setErrorMessage("");
      setTimeout(() => {
        window.location.href = "/app"; // Redirige después de un breve mensaje
      }, 1500);
    } else {
      setErrorMessage(data.error || "Error en el arranque. Revisa tus credenciales.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-2xl shadow-indigo-900/20 border border-gray-700">
        {/* Encabezado con toque automovilístico */}
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Enciende tu motor
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Inicia sesión para tomar el volante
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
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
              placeholder="Ingresa tu contraseña"
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
              Arrancar sesión
            </button>
          </div>

          {/* Enlace a registro */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              ¿No tienes cuenta?{" "}
              <Link
                to="/register"
                className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
              >
                Regístrate aquí
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

export default LoginForm;