import React from 'react';
import AuthForm from '../components/AuthForm';

const Register = () => (
  <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>
      <AuthForm />
    </div>
  </div>
);

export default Register;
