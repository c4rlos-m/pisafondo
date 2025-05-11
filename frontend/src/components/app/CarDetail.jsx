import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { ChevronLeft, Calendar, Activity, Phone, Mail, Check } from 'lucide-react';
import ImageSlider from './ImageSlider';
import ContactForm from '../landing/ContactForm';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/cars/${id}`);
        if (!response.ok) throw new Error('No se encontró el coche');
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error('Error al cargar los datos del coche:', error);
        setError(error.message);
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleBuyClick = () => {
    toast.info('Redirigiendo al proceso de compra...', {
      position: 'top-right',
      autoClose: 3000,
    });
    // Aquí podrías redirigir a una página de compra
    navigate(`/app/compra/${id}`);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Coche no encontrado</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/app')}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ChevronLeft size={20} />
          <span>Volver al catálogo</span>
        </motion.button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Barra de navegación superior */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-sm rounded-xl mb-6"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/app')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={20} />
            <span className="ml-1">Volver</span>
          </motion.button>
          <h1 className="text-xl font-bold text-gray-800 ml-4">
            {car.marca} {car.modelo}
          </h1>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna de fotos e información principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Galería de imágenes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden h-96"
          >
            <ImageSlider images={car.imagen} marca={car.marca} modelo={car.modelo} />
          </motion.div>

          {/* Información principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {car.marca} {car.modelo}
                </h2>
                <p className="text-gray-600">
                  {car.year} · {car.kilometros.toLocaleString('es-ES')} km · {car.combustible}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{formatPrice(car.precio)}</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${
                    car.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {car.disponible ? 'En venta' : 'Reservado'}
                </span>
              </div>
            </div>

            {/* Características clave */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Año', value: car.year },
                { label: 'Kilómetros', value: `${car.kilometros.toLocaleString('es-ES')} km` },
                { label: 'Combustible', value: car.combustible },
                { label: 'Ubicación', value: car.ubicacion },
                // { label: 'Color', value: car.color },
                // { label: 'Transmisión', value: car.transmision },
                // { label: 'Puertas', value: car.puertas },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="font-medium">{item.value || 'N/A'}</p>
                </div>
              ))}
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
              <p className="text-gray-600">{car.descripcion || 'No hay descripción disponible'}</p>
            </div>

            {/* Características */}
            {Array.isArray(car.caracteristicas) && car.caracteristicas.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Características</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {car.caracteristicas.map((caracteristica, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{caracteristica}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>

        {/* Columna lateral con formulario de contacto y botón de compra */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Botón de compra */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBuyClick}
              className={`w-full py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                car.disponible
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!car.disponible}
            >
              {car.disponible ? 'Comprar ahora' : 'No disponible'}
            </motion.button>
            {!car.disponible && (
              <p className="text-center text-sm text-red-600 mt-2">
                Este vehículo ya está reservado
              </p>
            )}
            <p className="text-center text-sm text-gray-500 mt-4">
              Financiación disponible. Consulta condiciones.
            </p>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">¿Tienes alguna pregunta?</h3>
            <ContactForm carId={id} />
            <div className="mt-6 flex flex-col space-y-2">
              <p className="text-sm text-gray-500">O contacta directamente:</p>
              <a
                href="tel:+34600000000"
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
              >
                <Phone size={16} className="mr-2" />
                <span>+34 600 000 000</span>
              </a>
              <a
                href="mailto:info@tuempresa.com"
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
              >
                <Mail size={16} className="mr-2" />
                <span>info@tuempresa.com</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CarDetail;