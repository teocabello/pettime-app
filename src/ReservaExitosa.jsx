import React from "react";
import { Link } from "react-router-dom";
import Icono from "./Icono";

function ReservaExitosa() {
  return (
    <div className="bg-[#F2F7FD] min-h-screen flex flex-col">
      <header className="bg-[#61C5B8] h-[60px] flex items-center justify-between px-5 rounded-b-[15px]">
        <h1 className="text-xl font-extrabold m-0">
          <span className="text-[#DE7D7A]">Pet</span> <span className="text-white">Time</span>
        </h1>
        <Link to="/servicios" className="text-white w-6 h-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-5">
        <div className="bg-white rounded-[20px] p-8 text-center shadow-xl w-full max-w-[320px] flex flex-col items-center gap-4">
          <Icono name="iconhuellacheck" alt="Reserva exitosa" className="w-24 h-24" />
          <h2 className="text-[#61C5B8] text-2xl font-black tracking-wide m-0">RESERVA EXITOSA</h2>
          <p className="text-[#9CA8B4] text-sm m-0">Tu reserva ha sido confirmada. ¡Te esperamos!</p>
          <Link to="/historial" className="bg-[#61C5B8] hover:bg-[#4FB0A4] text-white rounded-xl py-3 px-8 text-sm font-bold no-underline transition-colors mt-2 w-full text-center">
            Ver historial
          </Link>
          <Link to="/inicio" className="text-[#A4B0BE] text-sm no-underline hover:text-[#61C5B8] transition-colors">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReservaExitosa;

