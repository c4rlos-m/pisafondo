// components/landing/FeaturedCars.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 transform hover:scale-105">
      <img
        className="w-full h-56 object-cover"
        src={car.imagen && car.imagen[0]} // Usamos la primera imagen del array
        alt={`${car.marca} ${car.modelo}`}
      />
      <div className="p-6">
        <h3 className="font-bold text-xl text-white truncate">
          {car.marca} {car.modelo}
        </h3>
        <p className="text-gray-300 text-sm mt-1">
          {car.creado_en ? new Date(car.creado_en).getFullYear() : "N/A"} ·{" "}
          {car.kilometros || "N/A"} km
        </p>
        <p className="text-blue-400 font-bold text-lg mt-2">
          {car.precio.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-xs font-semibold">
            {car.user_id.slice(0, 8)}... {/* Ejemplo de "ubicación" */}
          </span>
          <Link
            to={`/coches/${car.id}`}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedCars = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/cars/destacados");
        if (!response.ok) throw new Error("Error al cargar los coches destacados");
        const data = await response.json();
        setFeaturedCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedCars();
  }, []);

  return (
    <div className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Coches Destacados
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
            Explora una selección única de vehículos en oferta
          </p>
        </div>

        {loading && <p className="text-center text-gray-300 mt-10">Cargando...</p>}
        {error && <p className="text-center text-red-400 mt-10">{error}</p>}
        {!loading && !error && (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/app"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
          >
            Ver todos los coches
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCars;