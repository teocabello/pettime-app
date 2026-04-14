import React from "react";
import { Link } from "react-router-dom";
import Icono from "./Icono";

function Servicios() {
  const servicios = [
    {
      to: "/reserva-cuidado",
      titulo: "Cuidado",
      descripcion: "Cuidamos a tu mascota mientras no estas. Con atencion personalizada",
      icono: "iconcuidado",
      puntos: [
        "Atencion 24/7: Supervision experta constante.",
        "Nutricion: alimentacion acorde a horarios.",
        "Higiene Total: Espacios sanitizados y comodos."
      ],
      paw: "iconpatitarosa"
    },
    {
      to: "/reserva-limpieza",
      titulo: "Limpieza",
      descripcion: "Mantenemos a tu mascota limpia y saludable en todo momento",
      icono: "iconlimpieza",
      puntos: [
        "Bano y Estetica: Productos premium segun el pelaje.",
        "Higiene Clinica: Limpieza de oidos y corte de unas.",
        "Deslanado Profundo: Reduccion de caida de pelo."
      ],
      paw: "iconpatitaverde"
    },
    {
      to: "/reserva-paseos",
      titulo: "Paseos",
      descripcion: "Sacamos a pasear a tu mascota con cuidado y diversion",
      icono: "iconpaseo",
      puntos: [
        "Rutas Seguras: Ejercicio en zonas verdes controladas.",
        "Socializacion: Manadas equilibradas por tamano.",
        "Entrenamiento: Educamos para que sean higienicos."
      ],
      paw: "iconpatitaazul"
    },
    {
      to: "/reserva-consulta",
      titulo: "Consulta veterinaria",
      descripcion: "Atencion medica profesional para el bienestar de tu mascota",
      icono: "iconveterinaria",
      puntos: [
        "Chequeo General: Evaluacion fisica y signos vitales.",
        "Prevencion: Plan de vacunas y desparasitacion.",
        "Guia Nutricional: Dieta a medida segun su edad."
      ],
      paw: "iconpatitaverde"
    }
  ];

  return (
    <div className="bg-[#F2F7FD] min-h-screen pt-[60px] pb-[80px]">

      <header className="bg-[#61C5B8] fixed top-0 left-0 w-full h-[60px] flex items-center justify-between px-5 z-[100] rounded-b-[15px]">
        <h1 className="text-xl font-extrabold m-0">
          <span className="text-[#DE7D7A]">Pet</span> <span className="text-white">Time</span>
        </h1>
        <Link to="/" className="text-white w-6 h-6">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
        </Link>
      </header>

      <main className="px-5 max-w-[500px] mx-auto">
        <h2 className="text-[16px] leading-[20px] font-bold text-black mt-0 mb-[6px]">Elegir Servicio</h2>
        <p className="text-[#6c757d] mt-0 mb-[24px] text-[14px] leading-[20px]">Elige el servicio que necesitas hoy</p>

        {servicios.map(servicio => (
          <Link key={servicio.titulo} to={servicio.to} className="w-full max-w-[353px] min-h-[190px] bg-[#EAF0F7] rounded-[15px] p-5 mb-[18px] shadow-sm block no-underline border border-[#E1E8F0] mx-auto">
            <div className="flex gap-[15px] items-start mb-[20px]">
              <Icono name={servicio.icono} alt={servicio.titulo} className="w-[45px] h-[45px] flex-shrink-0" />
              <div className="flex-1 min-w-0 space-y-[4px]">
                <h3 className="m-0 text-[16px] leading-[20px] font-bold text-black">{servicio.titulo}</h3>
                <p className="m-0 max-w-[245px] text-[10px] leading-[14px] text-[#555]">{servicio.descripcion}</p>
              </div>
            </div>
            <ul className="list-none p-0 m-0 max-w-[313px] space-y-[8px]">
              {servicio.puntos.map(punto => (
                <li key={punto} className="text-[10px] leading-[15px] text-[#555] flex items-start gap-2">
                  <Icono
                    name={servicio.paw}
                    alt="punto"
                    className="mt-1 shrink-0"
                    style={{ width: '8.93px', height: '8.93px' }}
                  />
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </main>

      <nav className="bg-[#698DD3] fixed bottom-0 left-0 w-full h-[70px] rounded-t-[15px] px-2.5">
        <div className="h-full w-full max-w-[1200px] mx-auto flex justify-around items-center">
          <Link to="/inicio" className="flex min-w-[76px] flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl">
            <Icono name="iconinicio" alt="Inicio" className="w-6 h-6" width="24" height="24" style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }} />
            <span>Inicio</span>
          </Link>

          <Link to="/servicios" className="flex min-w-[76px] flex-col items-center justify-center no-underline text-xs gap-1 px-[15px] py-2 rounded-xl bg-white text-[#698DD3]">
            <Icono name="iconservicios" alt="Servicios" className="w-6 h-6" width="24" height="24" style={{ filter: 'brightness(0) saturate(100%) invert(55%) sepia(29%) saturate(698%) hue-rotate(183deg) brightness(94%) contrast(88%)' }} />
            <span>Servicios</span>
          </Link>

          <Link to="/historial" className="flex min-w-[76px] flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl">
            <Icono name="iconhistorial" alt="Historial" className="w-6 h-6" width="24" height="24" />
            <span>Historial</span>
          </Link>

          <Link to="/perfil" className="flex min-w-[76px] flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl">
            <Icono name="iconusuario" alt="Perfil" className="w-6 h-6" width="24" height="24" style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }} />
            <span>Perfil</span>
          </Link>
        </div>
      </nav>

    </div>
  );
}

export default Servicios;


