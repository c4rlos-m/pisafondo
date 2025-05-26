import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle, Shield } from "lucide-react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    let strength = 0;
    if (newPassword.length > 6) strength += 1;
    if (newPassword.match(/[A-Z]/)) strength += 1;
    if (newPassword.match(/[0-9]/)) strength += 1;
    if (newPassword.match(/[^A-Za-z0-9]/)) strength += 1;
    setPasswordStrength(strength);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("https://pisafondo-production.up.railway.app/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Registro exitoso. ¡Bienvenido!");

        setErrorMessage("");
        setName("");
        setEmail("");
        setPassword("");
        setPasswordStrength(0);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setErrorMessage(data.error || "Error al registrarse.");
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

  const getPasswordStrengthText = () => {
    if (password.length === 0) return "";
    if (passwordStrength === 0) return "Muy débil";
    if (passwordStrength === 1) return "Débil";
    if (passwordStrength === 2) return "Moderada";
    if (passwordStrength === 3) return "Fuerte";
    return "Muy fuerte";
  };

  const getPasswordStrengthColor = () => {
    if (password.length === 0) return "bg-gray-200";
    if (passwordStrength === 0) return "bg-red-500";
    if (passwordStrength === 1) return "bg-orange-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-green-500";
    return "bg-green-600";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Sección izquierda (visible solo en md y superiores) */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 text-white p-6 flex-col justify-center items-center">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Únete a PISAFONDO</h2>
          <p className="text-blue-100 text-sm mb-4">
            Crea tu cuenta y disfruta de todos los beneficios.
          </p>
          <div className="space-y-4">
            <div className="flex items-start bg-blue-500/30 p-3 rounded-lg backdrop-blur-sm">
              <Shield className="h-6 w-6 text-blue-200 mr-3 mt-1" />
              <div className="text-left">
                <h3 className="font-semibold text-sm text-white">Transacciones Seguras</h3>
                <p className="text-blue-100 text-xs">Operaciones protegidas por verificación.</p>
              </div>
            </div>
            <div className="flex items-start bg-blue-500/30 p-3 rounded-lg backdrop-blur-sm">
              <svg className="h-6 w-6 text-blue-200 mr-3 mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              <div className="text-left">
                <h3 className="font-semibold text-sm text-white">Comunidad Global</h3>
                <p className="text-blue-100 text-xs">Conecta con compradores y vendedores.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección derecha: formulario de registro */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="mb-4 text-center">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Crear Cuenta</h1>
            <p className="text-gray-600 text-sm">Regístrate ahora</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-gray-700 text-xs font-medium">Nombre Usuario</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

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
                  placeholder="Crea tu contraseña"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              {password && (
                <div className="mt-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Seguridad:</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength < 2 ? "text-red-500" : 
                      passwordStrength < 3 ? "text-yellow-500" : "text-green-600"
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div 
                      className={`h-1 rounded-full ${getPasswordStrengthColor()}`} 
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-xs text-gray-600">
                Acepto los <Link to="/terms" className="text-blue-600 hover:text-blue-800">Términos</Link> y la <Link to="/privacy" className="text-blue-600 hover:text-blue-800">Privacidad</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || passwordStrength < 2}
              className={`w-full py-2 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 space-x-1
                ${isLoading 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : passwordStrength < 2
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                } text-white`}
            >
              <span>{isLoading ? "Procesando..." : "Crear Cuenta"}</span>
              {!isLoading && <ArrowRight className="h-4 w-4" />}
              
            </button>

            <div className="text-center text-xs mt-2">
              <p className="text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Iniciar sesión
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

export default RegisterForm;