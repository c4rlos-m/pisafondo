import React, { useState, useEffect, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Search, RefreshCw } from 'lucide-react';
import CarCard from './CarCard';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/cars/all');
      if (!response.ok) throw new Error('Error al obtener los coches');
      const data = await response.json();
      setCars(data);
      setFilteredCars(data);
    } catch (err) {
      setError(err.message);
      toast.error('Error al cargar los coches', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  // Filtrar coches según búsqueda y filtros
  useEffect(() => {
    let result = cars;

    // Búsqueda por marca o modelo
    if (searchTerm) {
      result = result.filter(
        (car) =>
          car.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.modelo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por precio
    if (priceFilter) {
      const [minPrice, maxPrice] = priceFilter.split('-').map(Number);
      result = result.filter(
        (car) => car.precio >= minPrice && (!maxPrice || car.precio <= maxPrice)
      );
    }

    // Filtro por marca
    if (brandFilter) {
      result = result.filter((car) => car.marca.toLowerCase() === brandFilter.toLowerCase());
    }

    setFilteredCars(result);

    if (result.length === 0 && (searchTerm || priceFilter || brandFilter)) {
      toast.info('No se encontraron coches que coincidan con los filtros', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, [searchTerm, priceFilter, brandFilter, cars]);

  // Obtener marcas únicas para el filtro
  const uniqueBrands = [...new Set(cars.map((car) => car.marca))].sort();

  const handleRefresh = () => {
    setSearchTerm('');
    setPriceFilter('');
    setBrandFilter('');
    fetchCars();
    toast.success('Lista de coches actualizada', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por marca o modelo..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todas las marcas</option>
              {uniqueBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todos los precios</option>
              <option value="0-10000">Hasta 10,000 €</option>
              <option value="10000-20000">10,000 € - 20,000 €</option>
              <option value="20000-30000">20,000 € - 30,000 €</option>
              <option value="30000-50000">30,000 € - 50,000 €</option>
              <option value="50000-">Más de 50,000 €</option>
            </select>
            <button
              onClick={handleRefresh}
              className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              title="Refrescar lista"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <svg
            className="animate-spin h-10 w-10 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-lg flex items-center gap-3">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm flex-1">{error}</p>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-center mb-8">
            Coches en venta: {filteredCars.length}
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No hay coches disponibles que coincidan con los filtros.
              </p>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default CarList;