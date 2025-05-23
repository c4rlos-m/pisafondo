import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';

const Header = ({ isAuthenticated, setIsAuthenticated, userProfilePic, userRole }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/app/profile');
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
            { to: '/', label: 'Inicio' },
            { to: '/app', label: 'Coches' },
            { to: '/app/sell', label: 'Vender' },
            { to: '/app/ubicacion', label: 'Concesionarios' },
            { to: '/app/about', label: 'Sobre nosotros' },
            { to: '/app/contact', label: 'Contacto' },
            ...(isAuthenticated && userRole === 'admin'
              ? [{ to: '/app/administracion', label: 'Administración' }]
              : []),
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
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              {/* Live Chat Button */}
              <Link
                to="/app/liveChat"
                className="flex items-center justify-center h-9 w-9 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Ir al chat en vivo"
              >
                <MessageCircle size={20} />
              </Link>
              <button
                onClick={handleProfileClick}
                className="focus:outline-none group"
                aria-label="Ir al perfil"
              >
                {userProfilePic ? (
                  <img
                    src={userProfilePic}
                    alt="Perfil"
                    className="h-9 w-9 rounded-full object-cover border-2 border-white transition-all duration-300"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white">
                    <span className="text-gray-600 text-sm font-medium">
                      {userRole?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
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

        {/* Botón de menú móvil */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-blue-500 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 py-4 px-6 absolute top-full left-0 w-full shadow-lg">
          <nav className="flex flex-col space-y-4">
            {[
              { to: '/', label: 'Inicio' },
              { to: '/app', label: 'Coches' },
              { to: '/app/sell', label: 'Vender' },
              { to: '/app/ubicacion', label: 'Concesionarios' },
              { to: '/app/about', label: 'Sobre nosotros' },
              { to: '/app/contact', label: 'Contacto' },
              ...(isAuthenticated && userRole === 'admin'
                ? [{ to: '/app/administracion', label: 'Administración' }]
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
                {/* Live Chat Button (Mobile) */}
                <Link
                  to="/app/liveChat"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wide transition-colors duration-300"
                >
                  <span className="flex items-center justify-center h-8 w-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full">
                    <MessageCircle size={16} />
                  </span>
                  Chat en vivo
                </Link>
                <button
                  onClick={handleProfileClick}
                  className="text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wide transition-colors duration-300 text-left flex items-center"
                >
                  {userProfilePic ? (
                    <img
                      src={userProfilePic}
                      alt="Perfil"
                      className="h-8 w-8 rounded-full object-cover border-2 border-white mr-2"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white mr-2">
                      <span className="text-gray-600 text-sm font-medium">
                        {userRole?.[0]?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
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