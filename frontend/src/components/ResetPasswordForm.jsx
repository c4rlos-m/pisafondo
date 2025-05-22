import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // <-- añadimos useNavigate
import axios from "axios";

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate(); // <-- inicializamos navigate

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.post(`https://pisafondo-production.up.railway.app/auth/reset-password`, {
        token,
        newPassword,
      });

      setMessage(response.data.message);
      setError("");

      // ✅ Después de 2 segundos redirigimos al login
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.error || "Error al cambiar la contraseña.");
      setMessage("");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-xl font-semibold mb-4 text-center">Restablecer contraseña</h2>

      {message && <p className="text-green-600 text-center mb-4">{message}</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleResetPassword}>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Nueva contraseña
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Confirmar nueva contraseña
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Cambiar contraseña
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
