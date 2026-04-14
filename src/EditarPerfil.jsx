import React, { useState, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import { format, isValid, parse, subYears } from "date-fns";
import Icono from "./Icono";

registerLocale("es", es);

const InputFecha = forwardRef(({ value, onClick, placeholder }, ref) => (
  <div className="bg-white rounded-2xl flex items-center px-5 py-5 w-full cursor-pointer shadow-sm" onClick={onClick} ref={ref}>
    <Icono name="iconcalendario" alt="calendario" className="w-5 h-5 mr-4" />
    <span className={value ? "text-[#555] text-sm font-medium w-full" : "text-[#A4B0BE] font-semibold text-sm w-full"}>
      {value || placeholder}
    </span>
  </div>
));

InputFecha.displayName = "InputFecha";

const parseFechaLocalStorage = (valor) => {
  if (!valor) return null;
  const parsed = parse(valor, "dd/MM/yyyy", new Date());
  return isValid(parsed) ? parsed : null;
};

function EditarPerfil() {
  const [sexo, setSexo] = useState(() => {
    try { return localStorage.getItem('pettime_perfil_sexo') || 'masculino'; } catch { return 'masculino'; }
  });
  const [nombre, setNombre] = useState(() => {
    try { return localStorage.getItem('pettime_perfil_nombre') || 'Jack'; } catch { return 'Jack'; }
  });
  const [apellido, setApellido] = useState(() => {
    try { return localStorage.getItem('pettime_perfil_apellido') || 'Mahir'; } catch { return 'Mahir'; }
  });
  const [fechaNacimiento, setFechaNacimiento] = useState(() => {
    try {
      const guardada = localStorage.getItem('pettime_perfil_fecha') || '26/06/1991';
      return parseFechaLocalStorage(guardada);
    } catch {
      return parseFechaLocalStorage('26/06/1991');
    }
  });
  const [dni, setDni] = useState(() => {
    try { return localStorage.getItem('pettime_perfil_dni') || '46564829'; } catch { return '46564829'; }
  });
  const [telefono, setTelefono] = useState(() => {
    try { return localStorage.getItem('pettime_perfil_telefono') || '955-568-256'; } catch { return '955-568-256'; }
  });
  const [calAbierto, setCalAbierto] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('pettime_perfil_sexo', sexo);
      localStorage.setItem('pettime_perfil_nombre', nombre);
      localStorage.setItem('pettime_perfil_apellido', apellido);
      localStorage.setItem('pettime_perfil_fecha', fechaNacimiento ? format(fechaNacimiento, 'dd/MM/yyyy') : '');
      localStorage.setItem('pettime_perfil_dni', dni);
      localStorage.setItem('pettime_perfil_telefono', telefono);
    } catch {}
  }, [sexo, nombre, apellido, fechaNacimiento, dni, telefono]);

  const fechaMaxima = subYears(new Date(), 18);

  return (
    <div className="bg-[#F2F7FD] min-h-screen pb-[80px]">
      <header className="bg-[#61C5B8] h-[60px] flex items-center justify-between px-5 rounded-b-[12px]">
        <h1 className="text-xl font-extrabold m-0">
          <span className="text-[#DE7D7A]">Pet</span> <span className="text-white">Time</span>
        </h1>
        <Link to="/perfil" className="text-white w-6 h-6">
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
          <div className="bg-white rounded-2xl flex items-center px-5 py-5 shadow-sm">
            <Icono name="iconusuario" alt="usuario" className="w-5 h-5 mr-4" />
            <input type="text" className="border-none outline-none bg-transparent w-full text-sm text-[#555] font-medium" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="bg-white rounded-2xl flex items-center px-5 py-5 shadow-sm">
            <Icono name="iconusuario" alt="usuario" className="w-5 h-5 mr-4" />
            <input type="text" className="border-none outline-none bg-transparent w-full text-sm text-[#555] font-medium" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </div>
          <DatePicker
            selected={fechaNacimiento}
            onChange={(date) => { setFechaNacimiento(date); setCalAbierto(false); }}
            open={calAbierto}
            onInputClick={() => setCalAbierto((prev) => !prev)}
            onClickOutside={() => setCalAbierto(false)}
            locale="es"
            dateFormat="dd/MM/yyyy"
            placeholderText="Fecha de Nacimiento"
            maxDate={fechaMaxima}
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            yearDropdownItemNumber={80}
            scrollableYearDropdown
            customInput={<InputFecha />}
            popperPlacement="bottom-start"
            popperProps={{ strategy: "fixed" }}
            showPopperArrow={false}
          />
          <div className="bg-white rounded-2xl flex items-center px-5 py-5 shadow-sm">
            <Icono name="icondni" alt="documento" className="w-5 h-5 mr-4" />
            <input type="text" className="border-none outline-none bg-transparent w-full text-sm text-[#555] font-medium" value={dni} onChange={(e) => setDni(e.target.value)} />
          </div>
          <div className="bg-white rounded-2xl flex items-center px-5 py-5 shadow-sm">
            <Icono name="icontelefono" alt="telefono" className="w-5 h-5 mr-4" />
            <input type="tel" className="border-none outline-none bg-transparent w-full text-sm text-[#555] font-medium" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
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
          <svg className="w-5 text-[#A4B0BE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </Link>

        <div className="flex gap-4">
          <button className="flex-1 py-4 bg-[#61C5B8] text-white rounded-xl font-bold text-base border-none cursor-pointer">Guardar</button>
          <Link to="/perfil" className="flex-1 py-4 bg-white text-[#DE7D7A] border border-[#DE7D7A] rounded-xl font-bold text-base text-center no-underline flex items-center justify-center">
            Cancelar
          </Link>
        </div>
      </main>

      <nav className="bg-[#698DD3] fixed bottom-0 left-0 w-full h-[70px] flex justify-around items-center rounded-t-[15px] px-2.5">
        <Link to="/inicio" className="flex flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span>Inicio</span>
        </Link>
        <Link to="/servicios" className="flex flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          <span>Servicios</span>
        </Link>
        <Link to="/historial" className="flex flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <span>Historial</span>
        </Link>
        <Link to="/perfil" className="bg-white text-[#698DD3] flex flex-col items-center justify-center no-underline text-xs gap-1 px-[15px] py-2 rounded-xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          <span>Perfil</span>
        </Link>
      </nav>
    </div>
  );
}

export default EditarPerfil;

