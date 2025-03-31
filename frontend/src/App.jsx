import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/app/Header';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import AppHome from './pages/AppHome';
import NotFound from './pages/NotFound';
import SellCar from './pages/SellCar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfilePic, setUserProfilePic] = useState(null);

  // Verifica si el usuario está autenticado al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setUserProfilePic("assets/images/toyota.webp"); // Ejemplo, reemplaza con la lógica real
    }
  }, []);

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userProfilePic={userProfilePic}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/app"
          element={isAuthenticated ? <AppHome /> : <Navigate to="/login" />}
        />
        <Route
          path="/app/sell"
          element={isAuthenticated ? <SellCar /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;