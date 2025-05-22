import { useState } from "react";
import axios from "axios";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Aquí cambia la URL por donde tengas corriendo tu backend
      const response = await axios.post(`https://pisafondo-production.up.railway.app/auth/forgot-password`, { email });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Ocurrió un error');
      setMessage('');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-xl font-semibold mb-4 text-center">¿Olvidaste tu contraseña?</h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Correo electrónico
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tuemail@ejemplo.com"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Enviar enlace de recuperación
        </button>
      </form>

      {/* Mensaje de éxito o error */}
      {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
    </div>
  );
}

export default ForgotPasswordForm;
