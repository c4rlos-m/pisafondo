import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Obtener la imagen de perfil actual al cargar el componente
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/users/me", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setProfilePic(data.profile_pic || "https://via.placeholder.com/150"); // Imagen por defecto
        } else {
          setErrorMessage("Error al cargar el perfil.");
        }
      } catch (error) {
        setErrorMessage("Error de conexión. Intenta de nuevo.",error);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Manejar la selección del archivo
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Subir la imagen al servidor
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setErrorMessage("Por favor, selecciona una imagen.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("profile_pic", selectedFile);

    try {
      const res = await fetch("http://localhost:5000/users/me", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setProfilePic(data.profile_pic); // Actualiza la imagen en el frontend
        setSuccessMessage("¡Imagen subida exitosamente!");
        setErrorMessage("");
        setSelectedFile(null); // Limpia el input
      } else {
        setErrorMessage(data.error || "Error al subir la imagen.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorMessage("Error de conexión. Intenta de nuevo.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-2xl shadow-indigo-900/20 border border-gray-700">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Tu Perfil
        </h1>

        {/* Mostrar la imagen actual */}
        <div className="flex justify-center mb-6">
          <img
            src={profilePic}
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full object-cover border-2 border-indigo-500"
          />
        </div>

        {/* Formulario para subir imagen */}
        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Subir nueva foto de perfil
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              Guardar imagen
            </button>
          </div>

          {errorMessage && (
            <p className="text-red-400 text-sm text-center mt-4 bg-red-900/20 p-2 rounded-lg">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-green-400 text-sm text-center mt-4 bg-green-900/20 p-2 rounded-lg">
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;