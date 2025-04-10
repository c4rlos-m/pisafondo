import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar, Activity, Phone, Mail, Check } from "lucide-react";
import ImageSlider from "./ImageSlider";
import ContactForm from "../landing/ContactForm";
const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: ""
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/cars/${id}`);
        if (!response.ok) {
          throw new Error("No se encontró el coche");
        }
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error("Error al cargar los datos del coche:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCar();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Aquí procesarías el formulario de contacto
    // Por ejemplo: sendContactForm(formData, car.id)
    console.log("Formulario enviado:", formData);
    
    // Mostrar confirmación
    setShowConfirmation(true);
    
    // Resetear el formulario
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      mensaje: ""
    });
    
    // Ocultar confirmación después de unos segundos
    setTimeout(() => {
      setShowConfirmation(false);
    }, 5000);
  };

  const handleBuyClick = () => {
    // Aquí podrías redirigir a una página de compra o proceso de pago
    // Por ejemplo: navigate(`/comprar/${id}`)
    alert("Redirigiendo al proceso de compra...");
  };

  const formatPrice = (price) => {
    return price.toLocaleString("es-ES", { 
      style: "currency", 
      currency: "EUR",
      maximumFractionDigits: 0
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Coche no encontrado</h2>
        <button 
          onClick={() => navigate('/app')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft size={20} />
          <span>Volver al catálogo</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Barra de navegación superior */}
      <div className=" shadow-sm bg-white mt-2 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => navigate('/app')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={20} />
            <span className="ml-1">Volver</span>
          </button>
          <h1 className="text-xl font-bold text-gray-800 ml-4">
            {car.marca} {car.modelo}
          </h1>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna de fotos e información principal */}
          <div className="lg:col-span-2">
            {/* Galería de imágenes */}
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6 h-96">
              <ImageSlider 
                images={car.imagen} 
                marca={car.marca} 
                modelo={car.modelo} 
              />
            </div>
            
            {/* Información principal */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {car.marca} {car.modelo}
                  </h2>
                  <p className="text-gray-600">{car.year} · {car.kilometros.toLocaleString("es-ES")} km · {car.combustible}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">
                    {formatPrice(car.precio)}
                  </p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${
                    car.disponible 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {car.disponible ? "En venta" : "Reservado"}
                  </span>
                </div>
              </div>
              
              {/* Características clave */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Año</p>
                  <p className="font-medium">{car.year}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Kilómetros</p>
                  <p className="font-medium">{car.kilometros.toLocaleString("es-ES")} km</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Combustible</p>
                  <p className="font-medium">{car.combustible}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Ubicación</p>
                  <p className="font-medium">{car.ubicacion}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Color</p>
                  <p className="font-medium">{car.color}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Transmisión</p>
                  <p className="font-medium">{car.transmision}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Puertas</p>
                  <p className="font-medium">{car.puertas}</p>
                </div>
              </div>
              
              {/* Descripción */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
                <p className="text-gray-600">{car.descripcion}</p>
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

            </div>
          </div>
          
          {/* Columna lateral con formulario de contacto y botón de compra */}
          <div className="space-y-6">
            {/* Botón de compra */}
            <div className="bg-white rounded-lg shadow p-6">
              <button 
                onClick={handleBuyClick}
                className="w-full bg-blue-600 text-white py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-200"
                disabled={!car.disponible}
              >
                {car.disponible ? "Comprar ahora" : "No disponible"}
              </button>
              
              {!car.disponible && (
                <p className="text-center text-sm text-red-600 mt-2">
                  Este vehículo ya está reservado
                </p>
              )}
              
              <p className="text-center text-sm text-gray-500 mt-4">
                Financiación disponible. Consulta condiciones.
              </p>
            </div>
            
            {/* Formulario de contacto
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">¿Tienes alguna pregunta?</h3>
              
              {showConfirmation && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
                  Mensaje enviado correctamente. Nos pondremos en contacto contigo lo antes posible.
                </div>
              )}
              
              <form onSubmit={handleContactSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                      placeholder="Me interesa este vehículo, ¿podría darme más información?"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gray-800 text-white py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
                  >
                    Enviar mensaje
                  </button>
                </div>
              </form> */}
              <ContactForm 
                onSubmit={handleContactSubmit} 
                formData={formData} 
                handleInputChange={handleInputChange} 
                showConfirmation={showConfirmation}
                setShowConfirmation={setShowConfirmation} 
                />
              
              <div className="mt-6 flex flex-col space-y-2">
                <p className="text-sm text-gray-500">O contacta directamente:</p>
                <a href="tel:+34600000000" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                  <Phone size={16} className="mr-2" />
                  <span>+34 600 000 000</span>
                </a>
                <a href="mailto:info@tuempresa.com" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                  <Mail size={16} className="mr-2" />
                  <span>info@tuempresa.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default CarDetail;