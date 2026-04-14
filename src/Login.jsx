import React, { useState, useContext } from 'react';
import logo from './assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import Icono from './Icono';
import { AuthContext } from './AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const correoLimpio = correo.trim();
    const passwordLimpia = password.trim();

    if (!correoLimpio || !passwordLimpia) {
      setMensaje('Todos los campos son obligatorios');
      setTipoMensaje('error');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(correoLimpio)) {
      setMensaje('Correo no válido');
      setTipoMensaje('error');
      return;
    }

    const resultado = login({
      email: correoLimpio,
      password: passwordLimpia,
    });

    if (!resultado.ok) {
      setMensaje(resultado.message);
      setTipoMensaje('error');
      return;
    }

    setMensaje('Inicio de sesión exitoso');
    setTipoMensaje('success');

    setTimeout(() => {
      navigate('/inicio');
    }, 900);
  };

  return (
    <div className="bg-[#F2F7FD] min-h-screen flex flex-col items-center justify-center px-5 pt-8 pb-10 sm:pt-10 sm:pb-12">
      <div className="mb-5">
        <img src={logo} alt="Logo de PetTime" className="w-[190px] max-w-full h-auto" />
      </div>

      <h1 className="text-[#DE7D7A] text-4xl mb-6 font-bold">Iniciar sesión</h1>

      {mensaje && (
        <div
          className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium w-full max-w-[400px] ${
            tipoMensaje === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
          }`}
        >
          {mensaje}
        </div>
      )}

      <form onSubmit={handleLogin} className="w-full max-w-[400px] flex flex-col gap-5">
        <div className="bg-white rounded-2xl flex items-center px-5 py-5 shadow-sm">
          <Icono name="iconcorreo" className="w-5 h-5 mr-4" alt="Correo" />
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => {
              setCorreo(e.target.value);
              setMensaje('');
            }}
            className="border-none outline-none bg-transparent w-full text-base text-[#555]"
          />
        </div>

        <div className="bg-white rounded-2xl flex items-center px-5 py-5 shadow-sm">
          <Icono name="iconcontrasena" className="w-5 h-5 mr-4" alt="Contraseña" />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setMensaje('');
            }}
            className="border-none outline-none bg-transparent w-full text-base text-[#555]"
          />
        </div>

        <button
          type="submit"
          className="bg-[#61C5B8] hover:bg-[#4FB0A4] text-white rounded-2xl py-[22px] text-lg font-semibold mt-4 transition-colors"
        >
          Iniciar Sesión
        </button>
      </form>

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