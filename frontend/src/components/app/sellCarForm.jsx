import React, { useState, useRef } from "react";
import { X, Upload, Check, AlertCircle, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const SellCarForm = () => {
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    precio: "",
    year: "",
    kilometros: "",
    combustible: "",
    descripcion: "",
    ubicacion: "", // Asegúrate de que esté aquí
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // Hook para redirigir


  const combustibleOptions = ["Gasolina", "Diésel", "Híbrido", "Eléctrico", "GLP", "Otro"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "precio" || name === "kilometros" || name === "year") { // Cambia "año" por "year"
      if (value === "" || /^\d+$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
      }));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index].url);
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  console.log("Datos del formulario enviados:", formData); // Verifica que ubicacion esté aquí

  try {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    images.forEach((image) => data.append("images", image));

    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/cars/createCar", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.error || "Error en la solicitud");
    }

    console.log("Coche subido:", responseData);
    setMessage({
      text: "¡Felicidades! Tu vehículo ha sido publicado correctamente. Redirigiendo...",
      type: "success",
      
    });
    setFormData({
      marca: "",
      modelo: "",
      precio: "",
      year: "",
      kilometros: "",
      combustible: "",
      descripcion: "",
      ubicacion: "", 
    });
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
      setImages([]);
      setPreviews([]);
      setActiveStep(1);
      setTimeout(() => {
        navigate("/app");
      }, 2000); 
    } catch (error) {
      console.error("Error al subir el coche:", error);
      setMessage({
        text: error.message,
        type: "error",
      });
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const validateStep = (step) => {
    if (step === 1) {
      return (
        formData.marca.trim() !== "" &&
        formData.modelo.trim() !== "" &&
        formData.precio.trim() !== "" &&
        formData.year.trim() !== "" &&
        formData.kilometros.trim() !== "" &&
        formData.combustible.trim() !== ""
      );
    }
    if (step === 2) {
      return formData.ubicacion.trim() !== ""; // Validar ubicación
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setActiveStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-xl shadow-indigo-900/20 border border-gray-700 p-8">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Vende tu vehículo
      </h2>

      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center ${message.type === "success"
            ? "bg-green-900/20 text-green-400 border border-green-900/50"
            : "bg-red-900/20 text-red-400 border border-red-900/50"
            }`}
        >
          {message.type === "success" ? (
            <Check className="w-5 h-5 mr-2 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          )}
          <p>{message.text}</p>
          <button
            onClick={() => setMessage({ text: "", type: "" })}
            className="ml-auto text-gray-400 hover:text-gray-300"
            aria-label="Cerrar mensaje"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Indicador de pasos */}
      <div className="flex items-center justify-between mb-8">
        <div className="w-full flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${activeStep >= 1 ? "bg-indigo-600 text-white" : "bg-gray-600 text-gray-300"
              }`}
          >
            1
          </div>
          <div
            className={`flex-1 h-1 ${activeStep >= 2 ? "bg-indigo-600" : "bg-gray-600"}`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${activeStep >= 2 ? "bg-indigo-600 text-white" : "bg-gray-600 text-gray-300"
              }`}
          >
            2
          </div>
          <div
            className={`flex-1 h-1 ${activeStep >= 3 ? "bg-indigo-600" : "bg-gray-600"}`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${activeStep >= 3 ? "bg-indigo-600 text-white" : "bg-gray-600 text-gray-300"
              }`}
          >
            3
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Paso 1: Información básica */}
        {activeStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Información básica del vehículo
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="marca" className="block text-sm font-medium text-gray-300 mb-1">
                  Marca <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="marca"
                  name="marca"
                  value={formData.marca}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-500"
                  placeholder="Ej: Toyota, Volkswagen..."
                />
              </div>

              <div>
                <label htmlFor="modelo" className="block text-sm font-medium text-gray-300 mb-1">
                  Modelo <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="modelo"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-500"
                  placeholder="Ej: Corolla, Golf..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="precio" className="block text-sm font-medium text-gray-300 mb-1">
                  Precio (€) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-500"
                  placeholder="Ej: 15000"
                />
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-1">
                  Año <span className="text-red-400">*</span> {/* Puedes dejar el label como "Año" para el usuario */}
                </label>
                <input
                  type="text"
                  id="year" // Cambia "año" por "year"
                  name="year" // Cambia "año" por "year"
                  value={formData.year} // Cambia "formData.año" por "formData.year"
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-500"
                  placeholder="Ej: 2018"
                />
              </div>

              <div>
                <label htmlFor="kilometros" className="block text-sm font-medium text-gray-300 mb-1">
                  Kilómetros <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="kilometros"
                  name="kilometros"
                  value={formData.kilometros}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-500"
                  placeholder="Ej: 50000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="combustible" className="block text-sm font-medium text-gray-300 mb-1">
                Tipo de combustible <span className="text-red-400">*</span>
              </label>
              <select
                id="combustible"
                name="combustible"
                value={formData.combustible}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-500"
              >
                <option value="" className="text-gray-500">Seleccionar tipo</option>
                {combustibleOptions.map((option) => (
                  <option key={option} value={option} className="text-white bg-gray-700">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={nextStep}
                disabled={!validateStep(1)}
                className={`px-6 py-3 bg-indigo-600 text-white rounded-lg transition-all duration-300 ${validateStep(1)
                  ? "hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/50"
                  : "opacity-50 cursor-not-allowed"
                  }`}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* Paso 2: Descripción */}
        {activeStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Descripción y ubicación del vehículo
            </h3>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-300 mb-1">
                Descripción detallada
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                rows="6"
                className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-500 resize-none"
                placeholder="Describe las características de tu vehículo, su estado, equipamiento, extras..."
              ></textarea>
            </div>

            <div>
              <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-300 mb-1">
                Ubicación <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="ubicacion"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-500"
                placeholder="Ej: Madrid"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 focus:ring-4 focus:ring-gray-500/50"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 focus:ring-4 focus:ring-indigo-500/50"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* Paso 3: Imágenes */}
        {activeStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Fotos del vehículo
            </h3>

            <div
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 transition-all duration-300"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                multiple
                accept="image/*"
                className="hidden"
                required={previews.length === 0} // Obligatorio si no hay imágenes
              />
              <div className="flex flex-col items-center">
                <Camera className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-white font-medium mb-1">Sube fotos de tu vehículo</p>
                <p className="text-sm text-gray-400 mb-2">
                  Arrastra o haz clic para seleccionar
                </p>
                <span className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300">
                  <Upload className="w-4 h-4 mr-2" />
                  Seleccionar imágenes
                </span>
              </div>
            </div>

            {previews.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-300 mb-3">
                  Imágenes seleccionadas ({previews.length})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden border border-gray-600">
                        <img
                          src={preview.url}
                          alt={preview.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-all duration-300"
                        aria-label="Eliminar imagen"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 focus:ring-4 focus:ring-gray-500/50"
              >
                Anterior
              </button>
              <button
                type="submit"
                disabled={loading || images.length === 0} // Deshabilitar si no hay imágenes
                className={`px-6 py-3 bg-green-600 text-white rounded-lg transition-all duration-300 flex items-center ${loading || images.length === 0
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-green-700 focus:ring-4 focus:ring-green-500/50"
                  }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Publicando...
                  </>
                ) : (
                  "Publicar vehículo"
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SellCarForm;