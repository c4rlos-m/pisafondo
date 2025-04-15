// Primero, el archivo de página principal: src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import ProfileHeader from '../../components/app/profile/ProfileHeader';
import ProfileDetails from '../../components/app/profile/ProfileDetails';
import ProfileCars from '../../components/app/profile/ProfileCars';
import ProfileSettings from '../../components/app/profile/ProfileSettings';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    // Aquí normalmente harías una llamada a la API para obtener los datos del usuario
    const fetchUserData = async () => {
      // Simulando una llamada a la API con datos estáticos
      setTimeout(() => {
        setUser({
          id: 1,
          name: "Usuario Demo",
          email: "usuario@ejemplo.com",
          phone: "123456789",
          address: "Calle Ejemplo 123, Madrid",
          profilePic: "src/assets/images/default_user.png",
          memberSince: "Enero 2023",
          cars: [
            { id: 1, brand: "Toyota", model: "Corolla", year: 2020, status: "En venta" },
            { id: 2, brand: "Honda", model: "Civic", year: 2019, status: "Vendido" }
          ]
        });
        setLoading(false);
      }, 1000);
    };

    fetchUserData();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <ProfileDetails user={user} />;
      case 'cars':
        return <ProfileCars cars={user?.cars || []} />;
      case 'settings':
        return <ProfileSettings user={user} />;
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
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'settings' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Configuración
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;