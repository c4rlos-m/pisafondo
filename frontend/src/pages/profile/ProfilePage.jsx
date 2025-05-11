import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileHeader from '../../components/app/profile/ProfileHeader';
import ProfileDetails from '../../components/app/profile/ProfileDetails';
import ProfileCars from '../../components/app/profile/ProfileCars';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setError('No se encontró el token de autenticación');
        setLoading(false);
        return;
      }

      try {
        const userResponse = await axios.get('http://localhost:5000/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const carsResponse = await axios.get('http://localhost:5000/cars/cochesUsuario/:id', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Datos del usuario:', userResponse.data);
        console.log('Coches del usuario:', carsResponse.data);
        console.log('Valor de created_at:', userResponse.data.created_at);

        const userData = userResponse.data;
        const memberSince = userData.created_at
          ? new Date(userData.created_at).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })
          : 'Fecha no disponible';

        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          profilePic: userData.profile_pic || '',
          memberSince,
        });
        console.log('Datos del usuario:', user);

        setCars(carsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar datos:', err.response?.data, err.response?.status);
        setError(err.response?.data?.error || 'Error al cargar los datos del perfil');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <ProfileDetails user={user} />;
      case 'cars':
        return <ProfileCars cars={cars} />;
      
      default:
        return <ProfileDetails user={user} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Cargando perfil...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <ProfileHeader user={user} />
      <div className="bg-white rounded-lg shadow-md mt-6">
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'details'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Detalles del Perfil
            </button>
            <button
              onClick={() => setActiveTab('cars')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'cars'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Mis Coches
            </button>
            
          </nav>
        </div>
        <div className="p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default ProfilePage;