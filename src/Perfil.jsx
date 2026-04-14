import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icono from './Icono';

function Perfil() {
  const [sexo, setSexo] = useState("masculino");

  return (
    <div className="bg-[#F2F7FD] min-h-screen pb-[80px]">
      <header className="bg-[#61C5B8] h-[60px] flex items-center justify-between px-5 rounded-b-[12px]">
        <h1 className="text-xl font-extrabold m-0">
          <span className="text-[#DE7D7A]">Pet</span> <span className="text-white">Time</span>
        </h1>
        <Link to="/" className="text-white w-6 h-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
        </Link>
      </header>

      <main className="px-5 max-w-[400px] mx-auto">
        <div className="flex justify-center my-5 mb-[30px]">
          <div className="w-[160px] h-[160px] rounded-full overflow-hidden border border-white shadow-md bg-[#E8EDF2] flex items-center justify-center">
            <svg className="w-[70px] h-[70px] text-[#A4B0BE]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-5">
          <div className="bg-white px-[18px] py-[14px] rounded-xl flex items-center gap-[15px] shadow-sm">
            <Icono name="iconusuario" alt="usuario" className="w-5 h-5 shrink-0" />
            <span className="text-[#333] font-bold text-[15px]">Jack</span>
          </div>
          <div className="bg-white px-[18px] py-[14px] rounded-xl flex items-center gap-[15px] shadow-sm">
            <Icono name="iconusuario" alt="usuario" className="w-5 h-5 shrink-0" />
            <span className="text-[#333] font-bold text-[15px]">Mahir</span>
          </div>
          <div className="bg-white px-[18px] py-[14px] rounded-xl flex items-center gap-[15px] shadow-sm">
            <Icono name="iconcalendario" alt="calendario" className="w-5 h-5 shrink-0" />
            <span className="text-[#333] font-bold text-[15px]">26/06/1991</span>
          </div>
          <div className="bg-white px-[18px] py-[14px] rounded-xl flex items-center gap-[15px] shadow-sm">
            <Icono name="icondni" alt="documento" className="w-5 h-5 shrink-0" />
            <span className="text-[#333] font-bold text-[15px]">46564829</span>
          </div>
          <div className="bg-white px-[18px] py-[14px] rounded-xl flex items-center gap-[15px] shadow-sm">
            <Icono name="icontelefono" alt="telefono" className="w-5 h-5 shrink-0" />
            <span className="text-[#333] font-bold text-[15px]">955-568-256</span>
          </div>
        </div>

        <div className="my-5">
          <p className="text-[#A4B0BE] font-bold text-sm mb-[10px]">Sexo</p>
          <div className="flex gap-3">
            <label className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm cursor-pointer border-2 transition-colors ${sexo === 'masculino' ? 'bg-[#61C5B8] border-[#61C5B8] text-white' : 'bg-white border-[#D1D8E0] text-[#A4B0BE]'}`}>
              <input type="radio" name="sexo" value="masculino" checked={sexo === "masculino"} onChange={() => setSexo("masculino")} className="hidden" />
              <span className={`w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center flex-shrink-0 ${sexo === 'masculino' ? 'border-white' : 'border-[#ccc]'}`}>
                {sexo === 'masculino' && <span className="w-[7px] h-[7px] bg-white rounded-full block"></span>}
              </span>
              Masculino
            </label>
            <label className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm cursor-pointer border-2 transition-colors ${sexo === 'femenino' ? 'bg-[#61C5B8] border-[#61C5B8] text-white' : 'bg-white border-[#D1D8E0] text-[#A4B0BE]'}`}>
              <input type="radio" name="sexo" value="femenino" checked={sexo === "femenino"} onChange={() => setSexo("femenino")} className="hidden" />
              <span className={`w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center flex-shrink-0 ${sexo === 'femenino' ? 'border-white' : 'border-[#ccc]'}`}>
                {sexo === 'femenino' && <span className="w-[7px] h-[7px] bg-white rounded-full block"></span>}
              </span>
              Femenino
            </label>
          </div>
        </div>

        <Link to="/mis-mascotas" className="bg-white px-[18px] py-[14px] rounded-xl flex items-center justify-between gap-[15px] shadow-sm no-underline mb-[30px]">
          <div className="flex items-center gap-[15px]">
            <Icono name="iconperrito" alt="mascotas" className="w-5 h-5" />
            <span className="text-[#A4B0BE] font-bold">Todas mis mascotas</span>
          </div>
          <Icono name="iconflechaderecha" alt="abrir" className="w-5 h-5" />
        </Link>

        <Link to="/editar-perfil" className="w-full py-4 bg-[#61C5B8] text-white rounded-xl font-bold text-base mb-5 block text-center no-underline">
          Editar Perfil
        </Link>
        <button className="w-full bg-transparent border-none text-[#FF7675] font-bold underline cursor-pointer text-base">Cerrar sesión</button>
      </main>

      <nav className="bg-[#698DD3] fixed bottom-0 left-0 w-full h-[70px] flex justify-around items-center rounded-t-[15px] px-2.5">
        <Link to="/inicio" className="flex flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl">
          <Icono name="iconinicio" alt="inicio" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
          <span>Inicio</span>
        </Link>
        <Link to="/servicios" className="flex flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl">
          <Icono name="iconservicios" alt="servicios" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
          <span>Servicios</span>
        </Link>
        <Link to="/historial" className="flex flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl">
          <Icono name="iconhistorial" alt="historial" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
          <span>Historial</span>
        </Link>
        <Link to="/perfil" className="bg-white text-[#698DD3] flex flex-col items-center justify-center no-underline text-xs gap-1 px-[15px] py-2 rounded-xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Perfil</span>
        </Link>
      </nav>
    </div>
  );
}

export default Perfil;

