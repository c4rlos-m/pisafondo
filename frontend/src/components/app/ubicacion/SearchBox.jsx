import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';

const SearchBox = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => onSearch(`${position.coords.latitude},${position.coords.longitude}`),
        (err) => {
          console.error('Error obteniendo ubicación:', err);
          alert('No pudimos acceder a tu ubicación. Por favor, permite el acceso.');
        }
      );
    } else {
      alert('Tu navegador no soporta geolocalización.');
    }
  };

  return (
    <div className="mb-8 w-full max-w-4xl mx-auto">
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-800">Localiza tu concesionario</h2>
        {/* <p className="text-gray-600 text-sm">Encuentra el concesionario autorizado más cercano a tu ubicación</p> */}
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className={`relative flex-grow transition-all duration-300 ${focused ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch className="text-blue-500" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Introduce código postal o ciudad"
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none bg-white text-gray-700 placeholder-gray-400"
            disabled={loading}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {loading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500">
              <FaSpinner className="animate-spin" />
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:w-auto w-full">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:bg-blue-400 disabled:cursor-not-allowed font-medium tracking-wide"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
          
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={loading}
            className="bg-white text-gray-700 border border-gray-300 px-6 py-4 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
          >
            <FaMapMarkerAlt className="text-blue-500" /> 
            <span>{loading ? 'Localizando...' : 'Mi Ubicación'}</span>
          </button>
        </div>
      </form>
      
      <div className="mt-3 text-xs text-gray-500 flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Utilizamos tu ubicación solo para mostrarte los concesionarios más cercanos
      </div>
    </div>
  );
};

export default SearchBox;