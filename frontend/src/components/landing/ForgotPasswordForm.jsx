const ForgotPasswordForm = () => {
    return (
      <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-center">¿Olvidaste tu contraseña?</h2>
        <form>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            placeholder="tuemail@ejemplo.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Enviar enlace de recuperación
          </button>
        </form>
      </div>
    );
  }
  
  export default ForgotPasswordForm;
  