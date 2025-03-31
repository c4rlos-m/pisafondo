import React from 'react';
import CarList from '../components/app/CarList.jsx';


function AppHome() {
  return (
    <div className="justify-center  items-center flex flex-col">
      <h2 className="text-4xl font-bold">Bienvenido a PisaFondo Autos</h2>
      <CarList />
    </div>
  );
}

export default AppHome;