import React from 'react';
import CarCard from './CarCard';
import toyotaImg from '../assets/images/toyota.webp'; // Ajusta la ruta
import bmwImg from '../assets/images/bmw.avif';
import mustangImg from '../assets/images/mustang.png';

const FeaturedCars = () => {
  const cars = [
    { name: 'Toyota Corolla', price: '15,000', description: '2020, 50k km', image: toyotaImg },
    { name: 'BMW Serie 3', price: '25,000', description: '2019, 30k km', image: bmwImg },
    { name: 'Ford Mustang', price: '35,000', description: '2021, 20k km', image: mustangImg },
  ];

  return (
    <section id="cars" className="py-16 bg-dark-blue-gray">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-light-gray animate-fade-in">
          Descubre nuestros coches
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;