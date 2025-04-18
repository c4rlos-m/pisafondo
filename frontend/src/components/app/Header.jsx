import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = ({ isAuthenticated, setIsAuthenticated, userProfilePic, userRole }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/app/profile");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-100 text-black py-4 px-6 sticky top-0 z-20 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img

              src="/Logo_big_v.svg"

              alt="Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />

            <span className="text-2xl font-bold tracking-tight">PISAFONDO</span>
          </Link>
        </div>

        {/* Menú en el centro (escritorio) */}
        <nav className="hidden md:flex flex-1 justify-center space-x-8">
          {[
            { to: "/", label: "Inicio" },
            { to: "/app", label: "Coches" },
            { to: "/app/sell", label: "Vender" },
            { to: "/app/about", label: "Sobre nosotros" },
            { to: "/app/contact", label: "Contacto" },

            ...(isAuthenticated && userRole === 'admin' // Agrega Gestión de Contactos solo para admins
              ? [
                { to: "/app/administracion", label: "Administración" },
                // { to: "/app/admin", label: "Gestión de Contactos" },
                // { to: "/app/validacion_coches", label: "Validación de vehículos" },
              ]
              : []
            
            ),

              
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-gray-700 hover:text-blue-500 font-medium text-sm uppercase tracking-wide transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Botones de acción o perfil (escritorio) */}

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={handleProfileClick}
                className="focus:outline-none group cursor_pointer"
                aria-label="Ir al perfil"
              >
                <img
                  src={userProfilePic || "src/assets/images/default_user.png"}
                  alt="Perfil"
                  className="h-9 w-9 rounded-full object-cover border-2 cursor_pointer border-white transition-all duration-300"
                />
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Cerrar sesión
              </button>
            </>
          ) : (

            <div className="flex space-x-3">
              <Link
                to="/login"
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"

 
              >
                Login
              </Link>
              <Link
                to="/register"

                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Registrar
              </Link>
            </div>

          )}
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 py-4 px-6 absolute top-full left-0 w-full shadow-lg">
          <nav className="flex flex-col space-y-4">

            {[
              { to: "/", label: "Inicio" },
              { to: "/app", label: "Coches" },
              { to: "/app/sell", label: "Vender" },
              { to: "/app/about", label: "Sobre nosotros" },
              { to: "/app/contact", label: "Contacto" },
              ...(isAuthenticated && userRole === 'admin' // Agrega Gestión de Contactos solo para admins
                ? [{ to: "/app/admin", label: "Gestión de Contactos" }]
                : []),
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wide transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <button
                  onClick={handleProfileClick}
                  className="text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wide transition-colors duration-300 text-left flex items-center cursor_pointer"
                >
                  <img
                    src={userProfilePic || "/assets/images/default_user.png"}
                    alt="Perfil"
                    className="h-8 w-8 rounded-full object-cover border-2 cursor_pointer border-white mr-2"
                  />
                  Perfil
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-left"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (

              <div className="flex flex-col space-y-3">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-center"

                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}

                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-center"
                >
                  Registrar
                </Link>
              </div>

            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
