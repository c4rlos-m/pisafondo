import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaCompass, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';

const DealerMap = ({ dealers, userLocation, selectedDealer, onDealerSelect }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const defaultCenter = [40.416775, -3.703790]; // Madrid
  const defaultZoom = 6;
  const [isLoading, setIsLoading] = useState(true);

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
  };

  useEffect(() => {
    let loadingTimer;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: defaultCenter,
        zoom: defaultZoom,
        scrollWheelZoom: true,
        zoomControl: false, // Desactivamos los controles predeterminados para usar los nuestros
      });

      // Mapa base más estilizado
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
        opacity: 0.95,
      }).addTo(mapInstance.current);

      // Añadir controles personalizados
      L.control.zoom({
        position: 'bottomright'
      }).addTo(mapInstance.current);

      // Añadir una escala al mapa
      L.control.scale({
        position: 'bottomleft',
        imperial: false
      }).addTo(mapInstance.current);

      // Evento de carga del mapa
      mapInstance.current.on('load', () => {
        setIsLoading(false);
      });

      // Simulamos un tiempo de carga para la visualización del spinner
      loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }

    clearMarkers();

    // Iconos mejorados para marcadores
    const userIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-pin user-pin">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24" fill="#e53e3e">
                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/>
              </svg>
            </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    const dealerIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-pin dealer-pin">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24" fill="#3182ce">
                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/>
              </svg>
            </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    const selectedDealerIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-pin selected-dealer-pin">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="28" height="28" fill="#2c5282">
                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/>
              </svg>
            </div>`,
      iconSize: [44, 44],
      iconAnchor: [22, 44],
      popupAnchor: [0, -44]
    });

    if (userLocation) {
      const userMarker = L.marker([userLocation.lat, userLocation.lng], { 
        icon: userIcon,
        zIndexOffset: 1000
      })
        .addTo(mapInstance.current)
        .bindPopup('<div class="font-bold text-red-600 px-1">Tu ubicación</div>', {
          className: 'custom-popup',
        });
      markersRef.current.push(userMarker);
    }

    dealers.forEach(dealer => {
      const isSelected = selectedDealer?.id === dealer.id;
      const marker = L.marker([dealer.latitude, dealer.longitude], { 
        icon: isSelected ? selectedDealerIcon : dealerIcon,
        riseOnHover: true,
        zIndexOffset: isSelected ? 900 : 0
      })
        .addTo(mapInstance.current)
        .bindPopup(
          `<div class="p-4 bg-white rounded-lg shadow-lg">
            <h3 class="font-semibold text-lg text-gray-900">${dealer.name}</h3>
            <p class="text-sm text-gray-600 mt-1">${dealer.address}</p>
            <p class="text-sm text-gray-600">${dealer.city}, ${dealer.postal_code}</p>
            <div class="mt-3 flex gap-4 text-sm">
              <a href="tel:${dealer.phone}" class="text-blue-600 hover:text-blue-800 flex items-center transition-colors">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                ${dealer.phone}
              </a>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${dealer.latitude},${dealer.longitude}" target="_blank" class="text-blue-600 hover:text-blue-800 flex items-center transition-colors">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a5 5 0 00-5 5c0 1.6.75 3.02 1.92 4L10 14l3.08-3C14.25 10.02 15 8.6 15 7a5 5 0 00-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z"/></svg>
                Cómo llegar
              </a>
            </div>
          </div>`,
          {
            className: 'custom-popup',
            minWidth: 260,
            maxWidth: 300,
          }
        )
        .on('click', () => onDealerSelect(dealer));

      if (isSelected) {
        setTimeout(() => marker.openPopup(), 300);
      }
      markersRef.current.push(marker);
    });

    if (dealers.length > 0) {
      const bounds = L.latLngBounds(dealers.map(dealer => [dealer.latitude, dealer.longitude]));
      if (userLocation) bounds.extend([userLocation.lat, userLocation.lng]);
      mapInstance.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    } else if (userLocation) {
      mapInstance.current.setView([userLocation.lat, userLocation.lng], 12);
    } else {
      mapInstance.current.setView(defaultCenter, defaultZoom);
    }

    return () => {
      clearTimeout(loadingTimer);
      if (mapInstance.current) {
        mapInstance.current.off('load');
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealers, userLocation, selectedDealer, onDealerSelect]);

  // Función para centrar el mapa en la posición actual del usuario
  const centerToUserLocation = () => {
    if (userLocation && mapInstance.current) {
      mapInstance.current.flyTo([userLocation.lat, userLocation.lng], 15, {
        animate: true,
        duration: 1
      });
    }
  };

  // Función para hacer zoom in
  const zoomIn = () => {
    if (mapInstance.current) {
      mapInstance.current.zoomIn();
    }
  };

  // Función para hacer zoom out
  const zoomOut = () => {
    if (mapInstance.current) {
      mapInstance.current.zoomOut();
    }
  };

  return (
    <div className="relative rounded-xl shadow-xl overflow-hidden border border-gray-200 bg-gray-50">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white bg-opacity-75">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      )}
      {/* Altura reducida a 400px (ajustable según necesidad) */}
      <div ref={mapRef} className="h-64 sm:h-80 md:h-96 lg:h-[400px] w-full" />
      
      {/* Overlay de controles */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-2 border-b border-gray-100 flex items-center">
          <FaMapMarkerAlt className="text-red-600 w-5 h-5" />
          <span className="ml-2 text-sm font-medium text-gray-700">Concesionarios</span>
        </div>
        
        <div className="p-2">
          <button 
            onClick={centerToUserLocation}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
            title="Centrar en tu ubicación"
            disabled={!userLocation}
          >
            <FaCompass className={`w-4 h-4 ${userLocation ? 'text-blue-600' : 'text-gray-400'}`} />
          </button>
        </div>
      </div>

      {/* Controles de zoom personalizados */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button 
          onClick={zoomIn}
          className="flex items-center justify-center w-8 h-8 bg-white rounded-md shadow-md hover:bg-blue-50 transition-colors"
          title="Acercar"
        >
          <FaSearchPlus className="text-gray-700" />
        </button>
        <button 
          onClick={zoomOut}
          className="flex items-center justify-center w-8 h-8 bg-white rounded-md shadow-md hover:bg-blue-50 transition-colors"
          title="Alejar"
        >
          <FaSearchMinus className="text-gray-700" />
        </button>
      </div>

      {/* Leyenda - Movida hacia una posición más compacta */}
      <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-md shadow-md border border-gray-200 text-xs flex gap-3">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-red-600 mr-1"></div>
          <span>Tu ubicación</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-blue-600 mr-1"></div>
          <span>Concesionarios</span>
        </div>
      </div>

      
    </div>
  );
};

export default DealerMap;