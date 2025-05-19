import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const FeaturedCarsScroll = () => {
  const [coches, setCoches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const response = await fetch("http://pisafondo-production.up.railway.app/cars/destacados");
        if (!response.ok) throw new Error("Error al cargar los coches");
        const data = await response.json();
        setCoches([...data, ...data]); // Duplicamos para el efecto continuo
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedCars();
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [coches]);

  const variants = {
    animate: {
      x: [0, -width], // Cambiado de [-width, 0] a [0, -width] para mover a la derecha
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20, // Velocidad del scroll
          ease: "linear",
        },
      },
    },
  };

  return (
    <section id="cars" className="py-20 px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
          Coches Destacados
        </h2>
        {loading && <p className="text-center text-gray-600">Cargando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && coches.length > 0 && (
          <div className="overflow-hidden">
            <motion.div
              ref={carouselRef}
              className="flex"
              variants={variants}
              animate="animate"
              whileHover={{ animationPlayState: "paused" }}
            >
              {coches.map((coche, index) => (
                <motion.div
                  key={index}
                  className="min-w-[300px] mx-4 bg-white rounded-xl shadow-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }} // Añadimos una pequeña animación al hacer hover
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={coche.imagen && coche.imagen[0]}
                    alt={`${coche.marca} ${coche.modelo}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {coche.marca} {coche.modelo}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {coche.creado_en
                        ? new Date(coche.creado_en).getFullYear()
                        : "N/A"}{" "}
                      | {coche.kilometros || "N/A"} km
                    </p>
                    <p className="text-lg font-bold text-blue-600 mt-3">
                      {coche.precio.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCarsScroll;