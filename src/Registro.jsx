import React, { useState, useEffect } from 'react';
import logo from './assets/logo 6-2 2.svg';
import { Link } from 'react-router-dom';
import Icono from './Icono';


function Registro() {
  const [correo, setCorreo] = useState(() => {
    try { return localStorage.getItem('pettime_reg_correo') || ''; } catch { return ''; }
  });
  const [contrasena, setContrasena] = useState('');

  useEffect(() => {
    try { localStorage.setItem('pettime_reg_correo', correo); } catch {}
  }, [correo]);

  return (
    <div className="bg-[#F2F7FD] min-h-screen flex flex-col items-center justify-center px-5 pt-8 pb-10 sm:pt-10 sm:pb-12">
      
      <div className="mb-2.5">
        <img src={logo} alt="Logo de PetTime" className="w-[190px] max-w-full h-auto" width="190" height="208" fetchPriority="high" />
      </div>

      <h1 className="text-[#DE7D7A] text-[28px] mb-6 font-bold">Datos de la sesión</h1>

      {/* Indicador de pasos */}
      <div className="flex items-center justify-center mb-8">
        <div className="w-[50px] h-[50px] bg-[#61C5B8] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">1</div>
        <div className="w-[35px] h-0.5 bg-[#D1D8E0]"></div>
        <div className="w-[50px] h-[50px] bg-white text-[#A4B0BE] rounded-full flex items-center justify-center font-bold text-lg shadow-sm">2</div>
        <div className="w-[35px] h-0.5 bg-[#D1D8E0]"></div>
        <div className="w-[50px] h-[50px] bg-white text-[#A4B0BE] rounded-full flex items-center justify-center font-bold text-lg shadow-sm">3</div>
      </div>

      <form className="w-full max-w-[400px] flex flex-col gap-5">
        
        <div className="h-[78px] bg-white rounded-[18px] flex items-center px-6 gap-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
          <Icono name="iconcorreo" alt="correo" className="w-5 h-5" />
          <input type="email" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} className="border-none outline-none bg-transparent w-full text-base text-[#555] placeholder-[#A4B0BE] placeholder:font-medium" />
        </div>

        <div className="h-[78px] bg-white rounded-[18px] flex items-center px-6 gap-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
          <Icono name="iconcontrasena" alt="contraseña" className="w-5 h-5" />
          <input type="password" placeholder="Contraseña" value={contrasena} onChange={e => setContrasena(e.target.value)} className="border-none outline-none bg-transparent w-full text-base text-[#555] placeholder-[#A4B0BE] placeholder:font-medium" />
        </div>

        <Link to="/registro-paso2" className="h-[78px] bg-[#61C5B8] hover:bg-[#4FB0A4] text-white rounded-[18px] text-base font-bold flex items-center justify-center gap-2.5 no-underline transition-colors">
          Siguiente
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </Link>
      </form>

      <p className="mt-8 text-[#9CA8B4] text-sm font-medium">
        ¿Ya tienes una cuenta? <Link to="/" className="text-[#DE7D7A] no-underline font-bold hover:underline">Inicia Sesión</Link>
      </p>

    </div>
  );
}

export default Registro;
