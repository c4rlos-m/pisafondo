import React from 'react';
import { FaPhone, FaDirections, FaClock, FaCheckCircle, FaMapMarkerAlt, FaSpinner, FaStar } from 'react-icons/fa';

const DealerList = ({ dealers, loading, selectedDealer, onDealerSelect, userLocation, hasSearched }) => {
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  // Estado de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-700 font-medium">Buscando concesionarios cercanos...</span>
      </div>
    );
  }

  // Estado inicial: no se ha buscado aún
  if (!hasSearched && dealers.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="bg-blue-50 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FaMapMarkerAlt className="text-3xl text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Encuentra tu concesionario</h3>
          <p className="text-gray-600 text-sm">
            Introduce un código postal, ciudad o usa tu ubicación actual para encontrar concesionarios cercanos.
          </p>
        </div>
      </div>
    );
  }

  // Búsqueda realizada pero sin resultados
  if (hasSearched && dealers.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="bg-gray-50 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No encontramos resultados</h3>
          <p className="text-gray-600 text-sm">
            No hay concesionarios cerca de esa ubicación. Prueba con otro código postal o ciudad.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="sticky top-0 z-10">
        <h2 className="text-lg font-semibold text-gray-800 p-3 bg-gradient-to-r from-blue-50 to-white border-b border-gray-200 flex items-center justify-between">
          <span>Concesionarios Cercanos</span>
          <span className="bg-blue-600 text-white text-xs py-1 px-2.5 rounded-full font-medium">{dealers.length}</span>
        </h2>
      </div>
      
      {/* Altura reducida para que coincida con el mapa */}
      <div className="h-64 sm:h-80 md:h-96 lg:h-[400px] overflow-y-auto divide-y divide-gray-100 scrollbar-thin">
        {dealers.map(dealer => {
          const distance = userLocation 
            ? calculateDistance(userLocation.lat, userLocation.lng, dealer.latitude, dealer.longitude)
            : null;

          // Determinar si está abierto (esto es un ejemplo, deberías adaptar la lógica a tus datos reales)
          const isOpen = dealer.is_open || Math.random() > 0.3; // Simulación para el ejemplo
          
          // Determinar si es un concesionario destacado
          const isFeatured = dealer.services && dealer.services.includes('official');

          return (
            <div
              key={dealer.id}
              onClick={() => onDealerSelect(dealer)}
              className={`p-4 cursor-pointer transition-all duration-200 hover:bg-blue-50 relative ${
                selectedDealer?.id === dealer.id ? 'bg-blue-50' : ''
              }`}
            >
              {selectedDealer?.id === dealer.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
              )}
              
              {isFeatured && (
                <div className="absolute right-2 top-2">
                  <span className="flex items-center text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                    <FaStar className="mr-1 text-yellow-500" /> Recomendado
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-start pr-20">
                <h3 className="text-base font-bold text-gray-900 line-clamp-1">{dealer.name}</h3>
                {distance && (
                  <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full ml-2">
                    {distance} km
                  </span>
                )}
              </div>
              
              <div className="mt-1.5 flex items-start">
                <FaMapMarkerAlt className="text-red-500 mt-1 mr-1.5 flex-shrink-0 text-xs" />
                <div className="text-sm text-gray-700 line-clamp-2">
                  {dealer.address}, {dealer.city}, {dealer.postal_code}
                </div>
              </div>
              
              <div className="mt-2 flex items-center flex-wrap text-xs">
                <span className={`flex items-center mr-3 ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
                  <FaClock className="mr-1" />
                  {isOpen ? 'Abierto ahora' : 'Cerrado ahora'}
                </span>
                
                {dealer.services && dealer.services.includes('official') && (
                  <span className="flex items-center text-blue-700 mr-3">
                    <FaCheckCircle className="mr-1" /> Oficial
                  </span>
                )}
                
                {/* Servicios como badges horizontales */}
                {dealer.services && dealer.services.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-0">
                    {dealer.services.slice(0, 2).map((service, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                        {service}
                      </span>
                    ))}
                    {dealer.services.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                        +{dealer.services.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-3 flex gap-2 text-xs">
                <a
                  href={`tel:${dealer.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center bg-white text-blue-700 hover:bg-blue-700 hover:text-white px-2 py-1.5 rounded-md shadow-sm border border-blue-200 transition-colors duration-200"
                >
                  <FaPhone className="mr-1" /> {dealer.phone}
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${dealer.latitude},${dealer.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center bg-white text-blue-700 hover:bg-blue-700 hover:text-white px-2 py-1.5 rounded-md shadow-sm border border-blue-200 transition-colors duration-200"
                >
                  <FaDirections className="mr-1" /> Cómo llegar
                </a>
              </div>
            </div>
          );
        })}
      </div>
      
      
    </div>
  );
};

export default DealerList;