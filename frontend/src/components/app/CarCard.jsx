import React, { useState, useEffect, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight, Calendar, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";


const ImageSlider = memo(({ images, marca, modelo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const handlePrevImage = useCallback((e) => {
    e?.stopPropagation?.();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images?.length]);

  const handleNextImage = useCallback((e) => {
    e?.stopPropagation?.();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images?.length]);
  
  // Preload images
  useEffect(() => {
    if (images && images.length > 0) {
      let loadedCount = 0;
      const totalImages = images.length;
      
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsLoading(false);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsLoading(false);
          }
        };
      });
      
      return () => setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [images]);

  

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-500">
        <svg
          className="w-10 h-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-full"
      
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <img
        src={images[currentIndex]}
        alt={`${marca} ${modelo}`}
        className="w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: isLoading ? 0 : 1 }}
      />
      
      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
          {currentIndex + 1}/{images.length}
        </div>
      )}
      
      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevImage}
            className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 p-1 rounded-full hover:bg-white transition-all duration-200 shadow-sm"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 p-1 rounded-full hover:bg-white transition-all duration-200 shadow-sm"
            aria-label="Imagen siguiente"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}
      
      {/* Image dots indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                currentIndex === index ? "bg-white w-3" : "bg-white/60"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
});

const CarCard = memo(({ car, onClick }) => {
  const navigate = useNavigate();

  const { 
    id,
    marca, 
    modelo, 
    precio, 
    year, 
    kilometros, 
    combustible, 
    descripcion, 
    imagen,
    disponible, 
    ubicacion 
  } = car;

  const handleCardClick = useCallback(() => {
    navigate(`/app/coches/${id}`);
    if (onClick) onClick(car);
  }, [car, onClick, navigate, id]);

  const formatPrice = useCallback((price) => {
    return price.toLocaleString("es-ES", { 
      style: "currency", 
      currency: "EUR",
      maximumFractionDigits: 0
    });
  }, []);

  return (
    <div 
      className="w-82 max-w-3xl bg-gray-200 border border-gray-300 rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-px flex flex-col cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image (top) */}
      <div className="relative w-full h-56 bg-gray-100 flex-shrink-0">
        <ImageSlider images={imagen} marca={marca} modelo={modelo} />
        
        {/* Availability badge on image */}
        <div className="absolute top-2 left-2 flex gap-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-md ${
              disponible 
                ? "bg-green-100 text-green-700 border border-green-200" 
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {disponible ? "En venta" : "Reservado"}
          </span>
          
          {/* Ubicación badge - Púrpura */}
          {ubicacion && (
            <span className="text-xs font-medium px-2 py-1 rounded-md bg-purple-200 text-purple-800 border border-purple-200">
              {ubicacion}
            </span>
          )}
        </div>
      </div>

      {/* Content (bottom) */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          {/* Title and price */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800 leading-tight">
              {marca} {modelo}
            </h3>
            <p className="text-lg font-bold text-gray-900">
              {formatPrice(precio)}
            </p>
          </div>

          {/* Details with icons */}
          <div className="text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1 mb-2">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1 text-gray-500" />
              <span>{year}</span>
            </div>
            <div className="flex items-center">
              <Activity size={14} className="mr-1 text-gray-500" />
              <span>{kilometros.toLocaleString("es-ES")} km</span>
            </div>
            <div className="flex items-center">
              <svg width="14" height="14" viewBox="0 0 24 24" className="mr-1 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 7h-1V4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3H5a3 3 0 0 0-3 3v9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4h8v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-9a3 3 0 0 0-3-3Z" />
                <circle cx="8" cy="14" r="1" />
                <circle cx="16" cy="14" r="1" />
              </svg>
              <span>{combustible}</span>
            </div>
          </div>

          {/* Description */}
          {descripcion && (
            <p className="text-gray-500 text-sm line-clamp-2 mb-2">{descripcion}</p>
          )}
        </div>

        {/* Button */}
        <div className="mt-auto">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          >
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
});

export default CarCard;