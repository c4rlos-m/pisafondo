import React from 'react';
import SellCarForm from '../components/app/sellCarForm.jsx';

const SellCar = () => {
  return (
    <div className="p-8 flex items-center justify-center bg-white">
      <div className="w-full max-w-4xl rounded-xl shadow-2xl border border-blue-700 p-6">
        
        
        <SellCarForm />
      </div>
    </div>
  );
};

export default SellCar;