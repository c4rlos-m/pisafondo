import React from 'react';

const CarCard = ({ car }) => {
  return (
    <div className="bg-card-bg shadow-lg rounded-lg overflow-hidden relative group">
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-48 object-cover"
        onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found')}
      />
      <div className="p-4 text-light-gray">
        <h3 className="text-xl font-semibold">{car.name}</h3>
        <p className="text-gray-300">{car.price} €</p>
        <p className="text-sm text-gray-400">{car.description}</p>
      </div>
      {/* Overlay para no registrados */}
      <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a
          href="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
        >
          Inicia sesión para comprar
        </a>
      </div>
    </div>
  );
};

export default CarCard;