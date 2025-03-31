// components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = ({ isAuthenticated, setIsAuthenticated, userProfilePic }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token
    setIsAuthenticated(false); // Actualiza el estado
    navigate("/"); // Redirige a la página pública de inicio
    setIsMenuOpen(false); // Cierra el menú móvil
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 px-6 sticky top-0 z-20 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo a la izquierda */}
        <div className="flex items-center">
          <Link to={isAuthenticated ? "/app" : "/"} className="flex items-center space-x-2">
            <img
              src="/path-to-your-logo.png" // Reemplaza con la ruta real de tu logo
              alt="Logo"
              className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
            <span className="text-xl font-semibold tracking-tight hidden md:block">
              PISAFONDO
            </span>
          </Link>
        </div>

        {/* Menú en el centro (escritorio) */}
        <nav className="hidden md:flex flex-1 justify-center space-x-10">
          <Link
            to={isAuthenticated ? "/app" : "/"}
            className="text-gray-200 hover:text-white font-medium text-sm uppercase tracking-wider transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Inicio
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/app/cars"
                className="text-gray-200 hover:text-white font-medium text-sm uppercase tracking-wider transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Coches
              </Link>
              <Link
                to="/app/sell"
                className="text-gray-200 hover:text-white font-medium text-sm uppercase tracking-wider transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Vender
              </Link>
              <Link
                to="/app/about"
                className="text-gray-200 hover:text-white font-medium text-sm uppercase tracking-wider transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Sobre nosotros
              </Link>
              <Link
                to="/app/contact"
                className="text-gray-200 hover:text-white font-medium text-sm uppercase tracking-wider transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Contacto
              </Link>
            </>
          )}
        </nav>

        {/* Imagen de usuario/logout o Login (escritorio) */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={handleProfileClick}
                className="focus:outline-none group"
                aria-label="Ir al perfil"
              >
                <img
                  src={userProfilePic || "/default-profile-pic.png"}
                  alt="Perfil"
                  className="h-10 w-10 rounded-full object-cover border-2 border-gray-600 group-hover:border-white transition-all duration-300 shadow-md"
                />
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-red-400 text-sm font-medium transition-colors duration-300"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-gray-200 hover:text-white font-medium text-sm uppercase tracking-wider transition-colors duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Botón hamburguesa para móviles */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil (desplegable) */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4 px-6 absolute top-full left-0 w-full shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link
              to={isAuthenticated ? "/app" : "/"}
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-200 hover:text-white font-medium text-sm uppercase tracking-wider transition-colors duration-300"
            >
              Inicio
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/app/cars"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-200 hover:text-white font-medium text-sm uppercase tracking-wider transition-colors duration-300"
                >
                  Coches
                </Link>
                <Link
                  to="/app/sell"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-200 hover:text-white font-medium text-sm uppercase tracking-wider transition-colors duration-300"
                >
                  Vender
                </Link>
                <Link
                  to="/app/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-200 hover:text-white font-medium text-sm uppercase tracking-wider transition-colors duration-300"
                >
                  Sobre nosotros
                </Link>
                <Link
                  to="/app/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-200 hover:text-white font-medium text-sm uppercase tracking-wider transition-colors duration-300"
                >
                  Contacto
                </Link>
              </>
            )}
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleProfileClick}
                  className="text-gray-200 hover:text-white font-medium text-sm uppercase tracking-wider transition-colors duration-300 text-left flex items-center"
                >
                  <img
                    src={userProfilePic || "/default-profile-pic.png"}
                    alt="Perfil"
                    className="h-8 w-8 rounded-full object-cover border-2 border-gray-600 mr-2"
                  />
                  Perfil
                </button>
                <button
                  onClick={handleLogout}
                  className="text-gray-200 hover:text-red-400 font-medium text-sm uppercase tracking-wider transition-colors duration-300 text-left"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-200 hover:text-white font-medium text-sm uppercase tracking-wider transition-colors duration-300"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;