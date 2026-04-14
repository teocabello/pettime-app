import React, { useState } from 'react';
import logo from './assets/logo 6-2 2.svg';
import { Link, useNavigate } from 'react-router-dom';
import Icono from './Icono';

function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); // success | error

  const handleLogin = (e) => {
    e.preventDefault();
    if (correo === 'admin@pettime.com' && password === '123456') {
  localStorage.setItem('usuario', JSON.stringify({ correo }));

  setMensaje('Inicio de sesión exitoso');
  setTipoMensaje('success');

  setTimeout(() => {
    navigate('/inicio');
  }, 1500);
}

    // 🔴 Validación básica
    if (!correo || !password) {
      setMensaje('Todos los campos son obligatorios');
      setTipoMensaje('error');
      return;
    }

    // 🔴 Validar formato de correo
    if (!correo.includes('@')) {
      setMensaje('Correo no válido');
      setTipoMensaje('error');
      return;
    }

    // 🟢 Simulación de login correcto
    if (correo === 'admin@pettime.com' && password === '123456') {
      setMensaje('Inicio de sesión exitoso');
      setTipoMensaje('success');

      // Redirigir después de 1.5 segundos
      setTimeout(() => {
        navigate('/inicio');
      }, 1500);
    } else {
      setMensaje('Correo o contraseña incorrectos');
      setTipoMensaje('error');
    }
  };

  return (
    <div className="bg-[#F2F7FD] min-h-screen flex flex-col items-center justify-center px-5 pt-8 pb-10 sm:pt-10 sm:pb-12">
      
      {/* Logo */}
      <div className="mb-5">
        <img src={logo} alt="Logo de PetTime" className="w-[190px] max-w-full h-auto" />
      </div>

      {/* Título */}
      <h1 className="text-[#DE7D7A] text-4xl mb-6 font-bold">Iniciar sesión</h1>

      {/* 🔔 Mensaje de confirmación */}
      {mensaje && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium w-full max-w-[400px]
          ${tipoMensaje === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
          {mensaje}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleLogin} className="w-full max-w-[400px] flex flex-col gap-5">
        
        {/* Correo */}
        <div className="bg-white rounded-2xl flex items-center px-5 py-5 shadow-sm">
          <Icono name="iconcorreo" className="w-5 h-5 mr-4" />
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="border-none outline-none bg-transparent w-full text-base text-[#555]"
          />
        </div>

        {/* Contraseña */}
        <div className="bg-white rounded-2xl flex items-center px-5 py-5 shadow-sm">
          <Icono name="iconcontrasena" className="w-5 h-5 mr-4" />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-none outline-none bg-transparent w-full text-base text-[#555]"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="bg-[#61C5B8] hover:bg-[#4FB0A4] text-white rounded-2xl py-[22px] text-lg font-semibold mt-4 transition-colors"
        >
          Iniciar Sesión
        </button>
      </form>

      {/* Registro */}
      <p className="mt-8 text-[#9CA8B4] text-sm font-medium">
        ¿No tienes una cuenta?{' '}
        <Link to="/registro" className="text-[#DE7D7A] font-bold hover:underline">
          Regístrate
        </Link>
      </p>

    </div>
  );
}

export default Login;