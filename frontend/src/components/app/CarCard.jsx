import React, { useState, useEffect, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight, Calendar, Activity, MapPin } from "lucide-react";
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
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
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
    <div className="relative w-full h-full overflow-hidden group">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <img
        src={images[currentIndex]}
        alt={`${marca} ${modelo}`}
        className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-105"
        style={{ opacity: isLoading ? 0 : 1 }}
      />
      
      {/* Image counter - More elegant style */}
      {images.length > 1 && (
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          {currentIndex + 1}/{images.length}
        </div>
      )}
      
      {/* Navigation buttons - Only visible on hover */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 p-1.5 rounded-full hover:bg-white transition-all duration-200 shadow-md opacity-0 group-hover:opacity-100"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 p-1.5 rounded-full hover:bg-white transition-all duration-200 shadow-md opacity-0 group-hover:opacity-100"
            aria-label="Imagen siguiente"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
      
      {/* Image dots indicator - Refined style */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`rounded-full transition-all duration-200 ${
                currentIndex === index 
                  ? "w-2.5 h-2.5 bg-white shadow-sm" 
                  : "w-2 h-2 bg-white/60 hover:bg-white/80"
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
      className="w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Image container with gradient overlay */}
      <div className="relative w-full h-60 bg-gray-100 overflow-hidden">
        <ImageSlider images={imagen} marca={marca} modelo={modelo} />
        
        {/* Badges on image - availability and location */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm ${
              disponible 
                ? "bg-green-100 text-green-700 border border-green-200" 
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {disponible ? "En venta" : "Reservado"}
          </span>
          
          {/* Ubicación badge - Mantenida como estaba antes pero mejorada */}
          {ubicacion && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm bg-purple-100 text-purple-700 border border-purple-100 flex items-center">
              <MapPin size={12} className="mr-1" />
              {ubicacion}
            </span>
          )}
        </div>
      </div>

      {/* Content section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          {/* Title */}
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              {marca} {modelo}
            </h3>
          </div>
          
          {/* Price */}
          <div>
            <p className="text-xl font-bold text-gray-900">
              {formatPrice(precio)}
            </p>
          </div>
        </div>

        {/* Description - if exists */}
        {descripcion && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{descripcion}</p>
        )}

        {/* Specs - Refined and responsive */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <Calendar size={16} className="mr-1.5 text-blue-500" />
            <span>{year}</span>
          </div>
          <div className="flex items-center">
            <Activity size={16} className="mr-1.5 text-blue-500" />
            <span>{kilometros.toLocaleString("es-ES")} km</span>
          </div>
          <div className="flex items-center">
            <svg width="16" height="16" viewBox="0 0 24 24" className="mr-1.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 7h-1V4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3H5a3 3 0 0 0-3 3v9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4h8v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-9a3 3 0 0 0-3-3Z" />
              <circle cx="8" cy="14" r="1" />
              <circle cx="16" cy="14" r="1" />
            </svg>
            <span>{combustible}</span>
          </div>
        </div>
      </div>
      
      {/* Animated subtle overlay on hover */}
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
});

export default CarCard;