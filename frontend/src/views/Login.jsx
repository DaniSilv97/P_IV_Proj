import React from 'react'
import BaseLayout from "../layouts/BaseLayout";
import LoginForm from './Login/LoginForm';
import './Login/Login.css';
import { Link } from 'react-router-dom';


function Login() {
  return (
    <BaseLayout showRegister={true}>
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-main via-secondary to-main opacity-90">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-main rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float1"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float2"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-main rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float3"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 animate-fadeInUp">
          <div className="text-center space-y-2 animate-fadeInDown animation-delay-200">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <div className="animate-fadeInUp animation-delay-400">
            <LoginForm/>          
          </div>

          <div className="text-center animate-fadeInUp animation-delay-600">
            <Link to="/register">
              <button className="text-sm text-main hover:text-secondary font-medium transition-colors transform hover:scale-105 duration-200">
                {"Don't have an account ?"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </BaseLayout>
  );
}

export default Login;