import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import DealerMap from './DealerMap';
import DealerList from './DealerList';
import { searchDealersByLocation } from '../../services/api';

const DealerLocator = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); // Para búsquedas manuales

  // Geolocalización inicial sin afectar el estado de error
  useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const location = { lat: position.coords.latitude, lng: position.coords.longitude };
            setUserLocation(location);
            try {
              const result = await searchDealersByLocation(`${location.lat},${location.lng}`);
              setDealers(result.dealers || []);
            } catch (err) {
              console.error('Error en geolocalización inicial:', err);
              setDealers([]); // Sin resultados, pero no mostramos error
            }
            setLoading(false);
          },
          (err) => {
            console.error('Error obteniendo ubicación:', err);
            setLoading(false);
          }
        );
      }
    };
    fetchUserLocation();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setLoading(true);
    setError(null); // Reseteamos el error antes de buscar
    setHasSearched(true); // Marcamos que es una búsqueda manual
    try {
      const result = await searchDealersByLocation(query);
      setDealers(result.dealers || []);
      if (result.location) setUserLocation(result.location);
      if (!result.dealers || result.dealers.length === 0) {
        setError('No se encontraron concesionarios para esta ubicación. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error en búsqueda manual:', error);
      setError('No se encontraron concesionarios para esta ubicación. Intenta de nuevo.');
      setDealers([]);
    }
    setLoading(false);
  };

  const handleDealerSelect = (dealer) => {
    setSelectedDealer(dealer === selectedDealer ? null : dealer);
  };

  return (
    <div className="dealer-locator-container max-w-7xl mx-auto py-10 px-4">
      
      <SearchBox onSearch={handleSearch} loading={loading} />
      {error && hasSearched && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg shadow-md animate-fade-in">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DealerList
            dealers={dealers}
            loading={loading}
            selectedDealer={selectedDealer}
            onDealerSelect={handleDealerSelect}
            userLocation={userLocation}
            hasSearched={hasSearched}
          />
        </div>
        <div className="lg:col-span-2">
          <DealerMap
            dealers={dealers}
            userLocation={userLocation}
            selectedDealer={selectedDealer}
            onDealerSelect={handleDealerSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default DealerLocator;