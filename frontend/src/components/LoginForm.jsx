import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

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
      window.location.href = "/app";  // Redirige después del login exitoso
    } else {
      // Si hay un error, actualiza el estado con el mensaje de error
      setErrorMessage(data.error || "Error desconocido");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {/* Campo de correo */}
      <div>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      {/* Campo de contraseña */}
      <div>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      {/* Botón de envío */}
      <div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          Ingresar
        </button>
      </div>

      {/* Enlace a la página de registro */}
      <div className="text-center">
        <p className="text-gray-400">¿No tienes cuenta? <a href="/register" className="text-indigo-500 hover:underline">Regístrate</a></p>
      </div>

      {/* Mensaje de error */}
      {errorMessage && (
        <p className="text-red-500 text-sm text-center mt-4">{errorMessage}</p>
      )}
    </form>
  );
};

export default LoginForm;