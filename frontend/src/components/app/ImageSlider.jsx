// src/components/ImageSlider.jsx
import React, { useState } from "react";

const ImageSlider = ({ images = [], marca, modelo }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-full">
      <img
        src={images[current]}
        alt={`${marca} ${modelo} - Imagen ${current + 1}`}
        className="w-full h-full object-cover rounded"
      />
      {/* Botón anterior */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition"
      >
        &#8592;
      </button>
      {/* Botón siguiente */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition"
      >
        &#8594;
      </button>
      {/* Paginación */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === current ? "bg-white" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
