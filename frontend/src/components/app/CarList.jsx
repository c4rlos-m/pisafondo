import React, { useState, useEffect, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Search, RefreshCw } from 'lucide-react';
import CarCard from './CarCard';
import AdvancedFilter from './AdvancedFilter';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [fuelFilter, setFuelFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [kmFilter, setKmFilter] = useState('');

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

  // Obtener valores únicos para los filtros
  const uniqueBrands = [...new Set(cars.map((car) => car.marca))].sort();
  const uniqueFuels = [...new Set(cars.map((car) => car.combustible))].sort();

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

    // Filtro por combustible
    if (fuelFilter) {
      result = result.filter((car) => car.combustible.toLowerCase() === fuelFilter.toLowerCase());
    }

    // Filtro por marca
    if (brandFilter) {
      result = result.filter((car) => car.marca.toLowerCase() === brandFilter.toLowerCase());
    }

    // Filtro por año
    if (yearFilter) {
      const [minYear, maxYear] = yearFilter.split('-').map(Number);
      result = result.filter(
        (car) => car.year >= minYear && (!maxYear || car.year <= maxYear)
      );
    }

    // Filtro por kilometraje
    if (kmFilter) {
      const [minKm, maxKm] = kmFilter.split('-').map(Number);
      result = result.filter(
        (car) => car.kilometros >= minKm && (!maxKm || car.kilometros <= maxKm)
      );
    }

    setFilteredCars(result);

    if (result.length === 0 && (searchTerm || priceFilter || fuelFilter || brandFilter || yearFilter || kmFilter)) {
      toast.info('No se encontraron coches que coincidan con los filtros', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, [searchTerm, priceFilter, fuelFilter, brandFilter, yearFilter, kmFilter, cars]);

  return (
    <div className="container mx-auto flex gap-8">
      {/* Filtros a la izquierda */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AdvancedFilter
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          fuelFilter={fuelFilter}
          setFuelFilter={setFuelFilter}
          brandFilter={brandFilter}
          setBrandFilter={setBrandFilter}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          kmFilter={kmFilter}
          setKmFilter={setKmFilter}
          uniqueBrands={uniqueBrands}
          uniqueFuels={uniqueFuels}
        />
      </motion.div>

      {/* Contenido principal */}
      <div className="flex-1">
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
            <h2 className="text-3xl font-bold text-left mb-8 uppercase text-gray-900">
              Coches en venta: <span className='text-indigo-500'>{filteredCars.length}</span>
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
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
    </div>
  );
};

export default CarList;