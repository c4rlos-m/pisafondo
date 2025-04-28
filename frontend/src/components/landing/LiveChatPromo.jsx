import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { MessageCircle, ChevronRight, ArrowRight, Users, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatPromoComponent = ({ onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('chatPromoSeen', 'true');
    }
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl shadow-xl overflow-hidden w-full max-w-[400px] mx-auto border border-indigo-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 p-1 bg-white bg-opacity-80 rounded-full text-slate-500 hover:text-slate-800 hover:bg-opacity-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 z-10"
        aria-label="Cerrar modal"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Header gradient decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"></div>

      <div className="flex flex-col sm:flex-row">
        {/* Visual Section with improved gradient and animation */}
        <div className="w-full sm:w-1/3 bg-gradient-to-br from-indigo-600 to-purple-700 p-3 flex items-center justify-center relative overflow-hidden">
          {/* Decorative circles in background */}
          <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-indigo-400 opacity-20 -translate-y-8 translate-x-4"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 rounded-full bg-purple-300 opacity-20 translate-y-4 -translate-x-4"></div>
          
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-white opacity-30 rounded-full blur-sm"></div>
                <MessageCircle
                  size={36}
                  className="relative text-white drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full sm:w-2/3 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
              <span className="flex h-1.5 w-1.5 relative mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600"></span>
              </span>
              En línea ahora
            </span>
            
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-100 text-indigo-700 border border-indigo-200">
              <Users size={10} className="mr-1" />
              125 usuarios
            </span>
          </div>

          <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center">
            ¡Chatea en vivo ahora!
          </h2>

          <p className="text-xs text-slate-600 mb-3">
            Conecta en tiempo real y únete a la conversación.
          </p>

          <div className="space-y-2 mb-3">
            <div className="flex items-center p-1.5 rounded-lg bg-white bg-opacity-70 border border-indigo-100">
              <Shield size={12} className="text-indigo-600 mr-1.5" />
              <p className="text-xs text-slate-700">Chat en tiempo real</p>
            </div>
            <div className="flex items-center p-1.5 rounded-lg bg-white bg-opacity-70 border border-indigo-100">
              <Globe size={12} className="text-indigo-600 mr-1.5" />
              <p className="text-xs text-slate-700">Accesible en cualquier dispositivo</p>
            </div>
          </div>

          <Link
            to="/app/liveChat"
            onClick={handleClose}
            className={`inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium rounded-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm hover:shadow ${
              isHovered ? 'translate-y-px shadow-md' : ''
            }`}
            aria-label="Unirse al chat en vivo"
          >
            Unirse ahora
            <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <p id="login-disclaimer" className="mt-1.5 text-[10px] italic text-slate-500">
            Requiere iniciar sesión para chatear.
          </p>
          <div className="mt-3 flex items-center">
            <input
              type="checkbox"
              id="dontShowAgain"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="h-3 w-3 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              aria-label="No volver a mostrar este mensaje"
            />
            <label htmlFor="dontShowAgain" className="ml-1.5 text-xs text-slate-500">
              No volver a mostrar
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatPromoComponent;