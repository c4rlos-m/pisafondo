import React, { useState, useRef } from "react";
import { X, Upload, Check, AlertCircle, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SellCarForm = () => {
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    precio: "",
    year: "",
    kilometros: "",
    combustible: "",
    descripcion: "",
    ubicacion: "",
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const combustibleOptions = ["Gasolina", "Diésel", "Híbrido", "Eléctrico", "GLP", "Otro"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "precio" || name === "kilometros" || name === "year") {
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
    console.log("Datos del formulario enviados:", formData);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      images.forEach((image) => data.append("images", image));

      const token = localStorage.getItem("token");
      const response = await fetch("https://pisafondo-production.up.railway.app/cars/createCar", {
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
      return formData.ubicacion.trim() !== "";
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
    <div className="max-w-3xl mx-auto bg-white rounded-2xl  mt-8 mb-8 ">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Vende tu vehículo
      </h2>
      <p className="text-gray-400 text-center mb-6">
                Completa el formulario para poner tu vehículo en el mercado
              </p>
      {/* Mensaje */}
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message.type === "success" ? (
            <Check className="w-5 h-5 mr-2" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-2" />
          )}
          <p>{message.text}</p>
          <button
            onClick={() => setMessage({ text: "", type: "" })}
            className="ml-auto text-gray-500 hover:text-gray-700"
            aria-label="Cerrar mensaje"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Indicador de pasos */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4 w-full max-w-md">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
              activeStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            1
          </div>
          <div
            className={`flex-1 h-1 ${activeStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`}
          ></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
              activeStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
          <div
            className={`flex-1 h-1 ${activeStep >= 3 ? "bg-blue-600" : "bg-gray-200"}`}
          ></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
              activeStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            3
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Paso 1: Información básica */}
        {activeStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Información básica del vehículo
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-2">
                  Marca <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="marca"
                  name="marca"
                  value={formData.marca}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
                  placeholder="Ej: Toyota, Volkswagen..."
                />
              </div>

              <div>
                <label htmlFor="modelo" className="block text-sm font-medium text-gray-700 mb-2">
                  Modelo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="modelo"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
                  placeholder="Ej: Corolla, Golf..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (€) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
                  placeholder="Ej: 15000"
                />
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Año <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
                  placeholder="Ej: 2018"
                />
              </div>

              <div>
                <label htmlFor="kilometros" className="block text-sm font-medium text-gray-700 mb-2">
                  Kilómetros <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="kilometros"
                  name="kilometros"
                  value={formData.kilometros}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
                  placeholder="Ej: 50000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="combustible" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de combustible <span className="text-red-500">*</span>
              </label>
              <select
                id="combustible"
                name="combustible"
                value={formData.combustible}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 appearance-none"
              >
                <option value="" className="text-gray-400">Seleccionar tipo</option>
                {combustibleOptions.map((option) => (
                  <option key={option} value={option} className="text-gray-900">
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
                className={`px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 ${
                  validateStep(1)
                    ? "hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* Paso 2: Descripción y ubicación */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Descripción y ubicación del vehículo
            </h3>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción detallada
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 resize-none"
                placeholder="Describe las características de tu vehículo, su estado, equipamiento, extras..."
              ></textarea>
            </div>

            <div>
              <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="ubicacion"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
                placeholder="Ej: Madrid"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all duration-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!validateStep(2)}
                className={`px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 ${
                  validateStep(2)
                    ? "hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* Paso 3: Imágenes */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Fotos del vehículo
            </h3>

            <div
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                multiple
                accept="image/*"
                className="hidden"
                required={previews.length === 0}
              />
              <div className="flex flex-col items-center">
                <Camera className="w-12 h-12 text-gray-400 mb-3" />
                <p className="text-gray-700 font-medium mb-1">Sube fotos de tu vehículo</p>
                <p className="text-sm text-gray-500 mb-3">
                  Arrastra o haz clic para seleccionar (mínimo 1 imagen)
                </p>
                <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200">
                  <Upload className="w-4 h-4 mr-2" />
                  Seleccionar imágenes
                </span>
              </div>
            </div>

            {previews.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Imágenes seleccionadas ({previews.length})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                        <img
                          src={preview.url}
                          alt={preview.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-all duration-200"
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
                className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all duration-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                Anterior
              </button>
              <button
                type="submit"
                disabled={loading || images.length === 0}
                className={`px-6 py-3 bg-green-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center ${
                  loading || images.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
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