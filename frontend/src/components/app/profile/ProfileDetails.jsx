import React, { useState, useRef } from 'react';
import axios from 'axios';

const ProfileDetails = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [profilePic, setProfilePic] = useState(null); // Estado para el archivo de imagen
  const [previewUrl, setPreviewUrl] = useState(user?.profilePic || ''); // Vista previa de la imagen
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setError('Por favor, selecciona una imagen válida');
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setError('Por favor, selecciona una imagen válida');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      if (profilePic) {
        formDataToSend.append('profile_pic', profilePic);
      }

      const response = await axios.put(
        'https://pisafondo-production.up.railway.app/users/profile',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setIsEditing(false);
      setProfilePic(null);
      setPreviewUrl(response.data.profile_pic || '');
      alert('Perfil actualizado exitosamente');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al actualizar el perfil');
    }
  };

  if (!user) {
    return <div className="text-red-500">No se encontraron datos del usuario</div>;
  }

  if (isEditing) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Editar Información Personal</h2>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Foto de Perfil</label>
              <div
                className="w-full h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-500 hover:border-blue-500 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="h-full object-cover" />
                ) : (
                  <span>Arrastra una imagen aquí o haz clic para seleccionar</span>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setProfilePic(null);
                setPreviewUrl(user.profilePic || '');
                setError(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Información Personal</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          Editar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
        <div>
          <p className="text-sm text-gray-500">Nombre</p>
          <p className="font-medium">{user.name || 'No especificado'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user.email || 'No especificado'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Foto de Perfil</p>
          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt="Foto de perfil"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <p className="font-medium">No especificada</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;