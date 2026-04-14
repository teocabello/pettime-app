import React from "react";
import { Link } from "react-router-dom";
import Icono from "./Icono";

const serviciosHistorial = [
  { id: 1, tipo: "paseos", nombre: "Paseo de mascotas", mascota: "Tobby", fecha: "10/05/2025", hora: "08:00 AM", estado: "reservado", icono: "iconpaseo", color: "bg-[#C3E0FC]" },
  { id: 2, tipo: "limpieza", nombre: "Limpieza y Baño", mascota: "Tobby", fecha: "05/05/2025", hora: "10:00 AM", estado: "en-proceso", icono: "iconlimpieza", color: "bg-[#B2F2BB]" },
  { id: 3, tipo: "cuidado", nombre: "Cuidado temporal", mascota: "Luna", fecha: "01/05/2025", hora: "09:00 AM", estado: "completado", icono: "iconcuidado", color: "bg-[#F8D1D1]" },
  { id: 4, tipo: "paseos", nombre: "Paseo de mascotas", mascota: "Luna", fecha: "25/04/2025", hora: "08:00 AM", estado: "completado", icono: "iconpaseo", color: "bg-[#C3E0FC]" },
  { id: 5, tipo: "limpieza", nombre: "Limpieza y Baño", mascota: "Tobby", fecha: "20/04/2025", hora: "11:00 AM", estado: "completado", icono: "iconlimpieza", color: "bg-[#B2F2BB]" },
];

const estadoBadge = {
  "reservado": "bg-[#698DD3] text-white",
  "en-proceso": "bg-[#61C5B8] text-white",
  "completado": "bg-[#D1D8E0] text-[#555]",
};

const estadoLabel = {
  "reservado": "Reservado",
  "en-proceso": "En proceso",
  "completado": "Completado",
};

function HistorialB() {
  return (
    <div className="bg-[#F2F7FD] min-h-screen pb-[80px]">
      <header className="bg-[#61C5B8] fixed top-0 left-0 w-full h-[60px] flex items-center justify-between px-5 z-[100] rounded-b-[15px]">
        <h1 className="text-xl font-extrabold m-0">
          <span className="text-[#DE7D7A]">Pet</span> <span className="text-white">Time</span>
        </h1>
        <Link to="/" className="text-white w-6 h-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
        </Link>
      </header>

      <main className="px-5 max-w-[500px] mx-auto pt-[80px]">
        <h2 className="text-black text-xl font-bold mb-4">Historial</h2>
        {serviciosHistorial.map((s) => (
          <div key={s.id} className="bg-white rounded-xl p-4 flex flex-col gap-3 shadow-sm mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center flex-shrink-0`}>
                <Icono name={s.icono} alt={s.tipo} className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#333] m-0">{s.nombre}</p>
                <p className="text-xs text-[#9CA8B4] m-0">{s.mascota}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${estadoBadge[s.estado]}`}>
                {estadoLabel[s.estado]}
              </span>
            </div>
            <div className="flex gap-4 text-xs text-[#A4B0BE]">
              <span>📅 {s.fecha}</span>
              <span>🕐 {s.hora}</span>
            </div>
          </div>
        ))}
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

export default HistorialB;

