import React, { useState, useEffect, useRef } from "react";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Star, Calendar, MapPin, Tag } from "lucide-react";

const FeaturedCarsScroll = () => {
  const [coches, setCoches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [width, setWidth] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/cars/destacados");
        if (!response.ok) throw new Error("Error al cargar los coches");
        const data = await response.json();
        setCoches(data);
      } catch (err) {
        setError(err.message);
        // Datos de fallback para desarrollo
        setCoches([
          {
            id: 1,
            marca: "Audi",
            modelo: "A7 Sportback",
            creado_en: "2023-01-15",
            kilometros: 15000,
            precio: 65000,
            imagen: ["https://via.placeholder.com/600x400"],
            combustible: "Híbrido",
            destacado: true,
            ubicacion: "Madrid"
          },
          {
            id: 2,
            marca: "BMW",
            modelo: "X5 xDrive40i",
            creado_en: "2022-11-20",
            kilometros: 22000,
            precio: 78500,
            imagen: ["https://via.placeholder.com/600x400"],
            combustible: "Diésel",
            destacado: true,
            ubicacion: "Barcelona"
          },
          {
            id: 3,
            marca: "Mercedes-Benz",
            modelo: "CLS 350",
            creado_en: "2023-03-01",
            kilometros: 8000,
            precio: 82000,
            imagen: ["https://via.placeholder.com/600x400"],
            combustible: "Gasolina",
            destacado: true,
            ubicacion: "Valencia"
          },
          {
            id: 4,
            marca: "Porsche",
            modelo: "Taycan",
            creado_en: "2023-04-15",
            kilometros: 5000,
            precio: 105000,
            imagen: ["https://via.placeholder.com/600x400"],
            combustible: "Eléctrico",
            destacado: true,
            ubicacion: "Sevilla"
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedCars();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [coches]);

  const handleNextCar = () => {
    setAutoScroll(false);
    setActiveIndex((prev) => (prev === coches.length - 1 ? 0 : prev + 1));
    
    // Reanudar el auto-scroll después de 5 segundos de inactividad
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setAutoScroll(true);
    }, 5000);
  };

  const handlePrevCar = () => {
    setAutoScroll(false);
    setActiveIndex((prev) => (prev === 0 ? coches.length - 1 : prev - 1));
    
    // Reanudar el auto-scroll después de 5 segundos de inactividad
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setAutoScroll(true);
    }, 5000);
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
    setAutoScroll(false);
    
    // Reanudar el auto-scroll después de 5 segundos de inactividad
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setAutoScroll(true);
    }, 5000);
  };

  const variants = {
    animate: {
      x: autoScroll ? [0, -width] : 0,
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section id="cars" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-apple-accent font-medium text-sm uppercase tracking-wider mb-2">Nuestra Selección</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Coches Destacados</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección de vehículos premium con las mejores prestaciones y condiciones del mercado.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-apple-accent"></div>
          </div>
        )}
        
        {error && !coches.length && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
            <p>{error}</p>
            <p className="mt-2 text-sm">Por favor, inténtelo de nuevo más tarde.</p>
          </div>
        )}
        
        {!loading && coches.length > 0 && (
          <div className="relative">
            {/* Carousel de vista previa a pantalla completa */}
            <div className="mb-8 relative overflow-hidden rounded-xl shadow-2xl">
              <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="flex items-center text-sm font-medium text-apple-accent">
                  <Star className="h-4 w-4 mr-1 fill-apple-accent" />
                  Destacado
                </span>
              </div>
              
              <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-gray-800">
                  {activeIndex + 1}/{coches.length}
                </span>
              </div>
              
              <div className="relative h-96 w-full overflow-hidden">
                {coches.map((coche, index) => (
                  <motion.div
                    key={`featured-${index}`}
                    className="absolute top-0 left-0 w-full h-full"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ 
                      opacity: activeIndex === index ? 1 : 0,
                      x: activeIndex === index ? 0 : 100,
                      zIndex: activeIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={coche.imagen && coche.imagen[0]}
                      alt={`${coche.marca} ${coche.modelo}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/api/placeholder/800/400";
                      }}
                    />
                  </motion.div>
                ))}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex justify-between items-end text-white">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {coches[activeIndex]?.marca} {coches[activeIndex]?.modelo}
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-2">
                      <span className="flex items-center text-sm bg-black/30 px-3 py-1 rounded-full">
                        <Calendar className="h-4 w-4 mr-1" />
                        {coches[activeIndex]?.creado_en
                          ? new Date(coches[activeIndex].creado_en).getFullYear()
                          : "N/A"}
                      </span>
                      <span className="flex items-center text-sm bg-black/30 px-3 py-1 rounded-full">
                        <MapPin className="h-4 w-4 mr-1" />
                        {coches[activeIndex]?.ubicacion || "N/A"}
                      </span>
                      <span className="flex items-center text-sm bg-black/30 px-3 py-1 rounded-full">
                        {coches[activeIndex]?.combustible || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm mb-1">Precio</span>
                    <span className="text-2xl font-bold">
                      {coches[activeIndex]?.precio.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
                onClick={handlePrevCar}
                aria-label="Anterior coche"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
                onClick={handleNextCar}
                aria-label="Siguiente coche"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            
            {/* Carousel de miniaturas */}
            <div className="overflow-hidden relative">
              <motion.div
                ref={carouselRef}
                className="flex"
                variants={variants}
                animate="animate"
                initial="initial"
              >
                {coches.map((coche, index) => (
                  <motion.div
                    key={`thumbnail-${index}`}
                    className={`min-w-[280px] mx-3 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${
                      activeIndex === index ? "ring-2 ring-apple-accent" : ""
                    }`}
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={() => handleCardClick(index)}
                  >
                    <div className="relative">
                      <img
                        src={coche.imagen && coche.imagen[0]}
                        alt={`${coche.marca} ${coche.modelo}`}
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/api/placeholder/400/200";
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white text-xs font-medium">
                            {coches[index]?.kilometros?.toLocaleString() || "N/A"} km
                          </span>
                          <span className="text-white text-xs font-medium">
                            {coches[index]?.combustible || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-gray-800 truncate">
                        {coche.marca} {coche.modelo}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {coche.creado_en
                            ? new Date(coche.creado_en).getFullYear()
                            : "N/A"}
                        </span>
                        <span className="text-base font-bold text-apple-accent">
                          {coche.precio.toLocaleString("es-ES", {
                            style: "currency",
                            currency: "EUR",
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <div className="text-center mt-8">
              <a
                href="/catalogo"
                className="inline-flex items-center bg-apple-accent text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-md"
              >
                Ver catálogo completo
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCarsScroll;