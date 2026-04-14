import React from "react";
import { Link } from "react-router-dom";
import Icono from "./Icono";

function Historial() {
  return (
    <div className="bg-[#F2F7FD] min-h-screen pb-[80px]">
      <header className="bg-[#61C5B8] h-[60px] flex items-center justify-between px-5 rounded-b-[15px]">
        <h1 className="text-xl font-extrabold m-0">
          <span className="text-[#DE7D7A]">Pet</span> <span className="text-white">Time</span>
        </h1>
        <Link to="/" className="text-white w-6 h-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
        </Link>
      </header>

      <main className="px-5 max-w-[500px] mx-auto pt-5">
        <h2 className="text-black text-xl font-bold mb-6">Historial</h2>
        
        <div className="bg-white rounded-[20px] p-8 flex flex-col items-center text-center shadow-sm">
          <Icono name="iconhuellaagregar" alt="sin reservas" className="w-16 h-16 mb-4" />
          <p className="text-[#A4B0BE] text-sm mb-1">Aun no tienes reservas.</p>
          <p className="text-[#9CA8B4] font-bold text-base">¡Agenda tu primer servicio!</p>
        </div>

        <Link to="/servicios" className="bg-[#61C5B8] hover:bg-[#4FB0A4] text-white rounded-xl py-[15px] text-[15px] font-bold flex items-center justify-center no-underline transition-colors mt-6">
          Reservar servicio
        </Link>
      </main>

      <nav className="bg-[#698DD3] fixed bottom-0 left-0 w-full h-[70px] flex justify-around items-center rounded-t-[15px] px-2.5">
        <Link to="/inicio" className="flex flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span>Inicio</span>
        </Link>
        <Link to="/servicios" className="flex flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Servicios</span>
        </Link>
        <Link to="/historial" className="bg-white text-[#698DD3] flex flex-col items-center justify-center no-underline text-xs gap-1 px-[15px] py-2 rounded-xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <span>Historial</span>
        </Link>
        <Link to="/perfil" className="flex flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          <span>Perfil</span>
        </Link>
      </nav>
    </div>
  );
}

export default Historial;

