import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";

const LoginForm = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://pisafondo-production.up.railway.app/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        setSuccessMessage("Inicio de sesión exitoso. Redirigiendo...");
        setErrorMessage("");
        setTimeout(() => navigate("/app"), 1500);
      } else {
        setErrorMessage(data.error || "Credenciales incorrectas.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorMessage("Error de conexión. Intenta de nuevo.");
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Sección izquierda (visible solo en md y superiores) */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 text-white flex-col justify-center items-center">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Bienvenido de nuevo</h2>
          <p className="text-blue-100 text-sm mb-4">
            Accede a tu cuenta para gestionar tus vehículos y más.
          </p>
          <div className="bg-blue-500/30 p-4 rounded-xl backdrop-blur-sm">
            <blockquote className="italic text-blue-50 text-sm">
              "PISAFONDO me ayudó a encontrar mi coche ideal en tiempo récord."
            </blockquote>
            <p className="mt-2 text-blue-200 text-xs">— María G., Madrid</p>
          </div>
        </div>
      </div>

      {/* Sección derecha: formulario de login */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="mb-4 text-center">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Iniciar Sesión</h1>
            <p className="text-gray-600 text-sm">Accede a tu cuenta</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-gray-700 text-xs font-medium">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="tuemail@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-gray-700 text-xs font-medium">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-xs text-blue-600 hover:text-blue-800 transition-colors">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 space-x-1
                ${isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                } text-white`}
            >
              <span>{isLoading ? "Procesando..." : "Iniciar Sesión"}</span>
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-xs text-gray-500">O continúa con</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="flex items-center justify-center py-1.5 px-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center py-1.5 px-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <svg className="h-4 w-4 mr-1" fill="" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.153-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.349-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12c0-5.523-4.477-10-10-10z" />
                </svg>
                Github
              </button>
            </div>

            <div className="text-center text-xs mt-2">
              <p className="text-gray-600">
                ¿No tienes cuenta?{" "}
                <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Regístrate
                </Link>
              </p>
            </div>
          </form>

          {errorMessage && (
            <div className="mt-4 flex items-center p-2 bg-red-50 border-l-4 border-red-500 rounded-r-md">
              <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
              <p className="text-red-700 text-xs">{errorMessage}</p>
            </div>
          )}
          {successMessage && (
            <div className="mt-4 flex items-center p-2 bg-green-50 border-l-4 border-green-500 rounded-r-md">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <p className="text-green-700 text-xs">{successMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;