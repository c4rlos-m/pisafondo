import React from 'react';
import LoginForm from '../components/LoginForm';

function Login({ setIsAuthenticated }) {
  return (
    <LoginForm setIsAuthenticated={setIsAuthenticated} />
  );
}

export default Login;