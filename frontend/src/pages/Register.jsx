import React from 'react';
import LoginForm from '../components/LoginForm';
import AuthHeader from '../components/AuthHeader';

function Login() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <AuthHeader />
      <main className="flex-1 flex items-center justify-center pt-16">
        <LoginForm />
      </main>
    </div>
  );
}

export default Login;