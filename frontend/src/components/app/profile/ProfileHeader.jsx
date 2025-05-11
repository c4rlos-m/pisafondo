import React from 'react';

const ProfileHeader = ({ user }) => {
  if (!user) {
    return <div className="text-red-500">No se encontraron datos del usuario</div>;
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={user.profilePic || '/src/assets/images/default_user.png'}
        alt="Foto de perfil Usuario"
        className="w-24 h-24 rounded-full object-cover"
      />
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
        <p className="text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-500">Miembro desde: {user.memberSince}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;