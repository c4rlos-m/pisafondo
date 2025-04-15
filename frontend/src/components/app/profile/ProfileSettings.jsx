import React, { useState } from 'react';

// eslint-disable-next-line no-unused-vars
const ProfileSettings = ({ user }) => {
  const [notifications, setNotifications] = useState({
    email: true,
    app: true,
    marketing: false
  });

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSaveSettings = () => {
    // Aquí iría la lógica para guardar las configuraciones
    console.log('Configuraciones guardadas:', notifications);
    // En un caso real, aquí harías una llamada a la API
  };

  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      // Aquí iría la lógica para eliminar la cuenta
      console.log('Cuenta eliminada');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Configuración</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Notificaciones</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              id="email-notifications"
              name="email"
              type="checkbox"
              checked={notifications.email}
              onChange={handleNotificationChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="email-notifications" className="ml-3 text-gray-700">
              Recibir notificaciones por email
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="app-notifications"
              name="app"
              type="checkbox"
              checked={notifications.app}
              onChange={handleNotificationChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="app-notifications" className="ml-3 text-gray-700">
              Recibir notificaciones en la aplicación
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="marketing-notifications"
              name="marketing"
              type="checkbox"
              checked={notifications.marketing}
              onChange={handleNotificationChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="marketing-notifications" className="ml-3 text-gray-700">
              Recibir emails de marketing y ofertas
            </label>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Cambiar Contraseña</h3>
        <div className="space-y-3">
          <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña actual
            </label>
            <input
              type="password"
              id="current-password"
              name="currentPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
              Nueva contraseña
            </label>
            <input
              type="password"
              id="new-password"
              name="newPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar nueva contraseña
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Cambiar contraseña
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <button
          onClick={handleSaveSettings}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Guardar configuración
        </button>
        
        <button
          onClick={handleDeleteAccount}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;