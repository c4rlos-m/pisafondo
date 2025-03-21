import { useState } from "react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");  
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 

  const handleRegister = async (e) => {
    e.preventDefault();

    // Realizar el registro
    const res = await fetch("http://localhost:5000/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }), 
    });

    const data = await res.json();

    if (res.ok) {
      setSuccessMessage("Registro exitoso. Ahora puedes iniciar sesión.");
      setErrorMessage(""); 
    } else {
      setErrorMessage(data.error || "Error desconocido");
      setSuccessMessage(""); 
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6">
      {/* Campo de nombre */}
      <div>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

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
          Registrarse
        </button>
      </div>

      {/* Mensajes de error y éxito */}
      {errorMessage && (
        <p className="text-red-500 text-sm text-center mt-4">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-green-500 text-sm text-center mt-4">{successMessage}</p>
      )}
    </form>
  );
};

export default RegisterForm;