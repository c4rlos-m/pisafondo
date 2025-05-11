// AdvancedFilter.jsx
import React from 'react';
import { Fuel, Calendar, Gauge, Euro, Car } from 'lucide-react';

const AdvancedFilter = ({
  priceFilter,
  setPriceFilter,
  fuelFilter,
  setFuelFilter,
  brandFilter,
  setBrandFilter,
  yearFilter,
  setYearFilter,
  kmFilter,
  setKmFilter,
  uniqueBrands,
  uniqueFuels,
}) => {
  return (
    <div className="w-64 bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Filtros Avanzados</h3>
      
      {/* Filtro por Precio */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Euro size={16} /> Precio
        </label>
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Todos los precios</option>
          <option value="0-10000">Hasta 10,000 €</option>
          <option value="10000-20000">10,000 € - 20,000 €</option>
          <option value="20000-30000">20,000 € - 30,000 €</option>
          <option value="30000-50000">30,000 € - 50,000 €</option>
          <option value="50000-">Más de 50,000 €</option>
        </select>
      </div>

      {/* Filtro por Combustible */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Fuel size={16} /> Combustible
        </label>
        <select
          value={fuelFilter}
          onChange={(e) => setFuelFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Todos los combustibles</option>
          {uniqueFuels.map((fuel) => (
            <option key={fuel} value={fuel}>
              {fuel}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro por Marca */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Car size={16} /> Marca
        </label>
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Todas las marcas</option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro por Año */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Calendar size={16} /> Año
        </label>
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Todos los años</option>
          <option value="2020-2025">2020 - 2025</option>
          <option value="2015-2020">2015 - 2020</option>
          <option value="2010-2015">2010 - 2015</option>
          <option value="2005-2010">2005 - 2010</option>
          <option value="0-2005">Antes de 2005</option>
        </select>
      </div>

      {/* Filtro por Kilometraje */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Gauge size={16} /> Kilometraje
        </label>
        <select
          value={kmFilter}
          onChange={(e) => setKmFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Todos los km</option>
          <option value="0-50000">0 - 50,000 km</option>
          <option value="50000-100000">50,000 - 100,000 km</option>
          <option value="100000-150000">100,000 - 150,000 km</option>
          <option value="150000-200000">150,000 - 200,000 km</option>
          <option value="200000-">Más de 200,000 km</option>
        </select>
      </div>
    </div>
  );
};

export default AdvancedFilter;