import React, { useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import { subYears } from 'date-fns';
import logo from './assets/logo 6-2 2.svg';
import Icono from './Icono';

registerLocale('es', es);

const InputFecha = forwardRef(({ value, onClick, placeholder }, ref) => (
  <div className="bg-white rounded-2xl flex items-center px-5 py-5 w-full cursor-pointer shadow-sm" onClick={onClick} ref={ref}>
    <Icono name="iconcalendario" alt="calendario" className="w-5 h-5 mr-4" />
    <span className={value ? 'text-[#555] text-sm font-medium w-full' : 'text-[#A4B0BE] font-semibold text-sm w-full'}>
      {value || placeholder}
    </span>
  </div>
));

function RegistroPaso2() {
  const [nombres, setNombres] = useState(() => {
    try { return localStorage.getItem('pettime_reg_nombres') || ''; } catch { return ''; }
  });
  const [apellidos, setApellidos] = useState(() => {
    try { return localStorage.getItem('pettime_reg_apellidos') || ''; } catch { return ''; }
  });
  const [dni, setDni] = useState(() => {
    try { return localStorage.getItem('pettime_reg_dni') || ''; } catch { return ''; }
  });
  const [telefono, setTelefono] = useState(() => {
    try { return localStorage.getItem('pettime_reg_telefono') || ''; } catch { return ''; }
  });
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [sexo, setSexo] = useState('masculino');
  const [calAbierto, setCalAbierto] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('pettime_reg_nombres', nombres);
      localStorage.setItem('pettime_reg_apellidos', apellidos);
      localStorage.setItem('pettime_reg_dni', dni);
      localStorage.setItem('pettime_reg_telefono', telefono);
    } catch {}
  }, [nombres, apellidos, dni, telefono]);

  const fechaMaxima = subYears(new Date(), 18);
  return (
    <div className="bg-[#F2F7FD] min-h-screen flex flex-col items-center justify-start px-5 py-10">
      
      <div className="mb-2.5">
        <img src={logo} alt="Logo de PetTime" className="w-[190px] max-w-full h-auto" width="190" height="208" fetchPriority="high" />
      </div>

      <h1 className="text-[#DE7D7A] text-2xl mb-5 font-bold">Datos Del Dueño</h1>

      {/* Indicador de pasos */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-[50px] h-[50px] bg-[#698DD3] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">1</div>
        <div className="w-[35px] h-0.5 bg-[#698DD3]"></div>
        <div className="w-[50px] h-[50px] bg-[#61C5B8] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">2</div>
        <div className="w-[35px] h-0.5 bg-[#D1D8E0]"></div>
        <div className="w-[50px] h-[50px] bg-white text-[#A4B0BE] rounded-full flex items-center justify-center font-bold text-lg shadow-sm">3</div>
      </div>

      <form className="w-full max-w-[400px] flex flex-col gap-4">
        
        <div className="bg-white rounded-2xl flex items-center px-5 py-5 shadow-sm">
          <Icono name="iconusuario" alt="usuario" className="w-5 h-5 mr-4" />
          <input type="text" placeholder="Nombres" value={nombres} onChange={e => setNombres(e.target.value)} className="border-none outline-none bg-transparent w-full text-sm text-[#555] placeholder-[#A4B0BE] placeholder:font-semibold" />
        </div>

        <div className="bg-white rounded-2xl flex items-center px-5 py-5 shadow-sm">
          <Icono name="iconusuario" alt="usuario" className="w-5 h-5 mr-4" />
          <input type="text" placeholder="Apellidos" value={apellidos} onChange={e => setApellidos(e.target.value)} className="border-none outline-none bg-transparent w-full text-sm text-[#555] placeholder-[#A4B0BE] placeholder:font-semibold" />
        </div>

        <DatePicker
          selected={fechaNacimiento}
          onChange={(date) => { setFechaNacimiento(date); setCalAbierto(false); }}
          open={calAbierto}
          onInputClick={() => setCalAbierto(prev => !prev)}
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
          popperProps={{ strategy: 'fixed' }}
          showPopperArrow={false}
        />

        <div className="bg-white rounded-2xl flex items-center px-5 py-5 shadow-sm">
          <Icono name="icondni" alt="dni" className="w-5 h-5 mr-4" />
          <input type="text" placeholder="DNI" value={dni} onChange={e => setDni(e.target.value)} className="border-none outline-none bg-transparent w-full text-sm text-[#555] placeholder-[#A4B0BE] placeholder:font-semibold" />
        </div>

        <div className="bg-white rounded-2xl flex items-center px-5 py-5 shadow-sm">
          <Icono name="icontelefono" alt="teléfono" className="w-5 h-5 mr-4" />
          <input type="tel" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} className="border-none outline-none bg-transparent w-full text-sm text-[#555] placeholder-[#A4B0BE] placeholder:font-semibold" />
        </div>

        {/* Sección Sexo */}
        <div>
          <p className="text-[#555] text-sm font-semibold mb-2">Sexo</p>
          <div className="flex gap-4">
            <label
              className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full text-sm font-medium border transition-colors ${sexo === 'masculino' ? 'bg-[#61C5B8] text-white border-[#61C5B8]' : 'bg-white text-[#A4B0BE] border-[#D1D8E0]'}`}
              onClick={() => setSexo('masculino')}
            >
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${sexo === 'masculino' ? 'border-white' : 'border-[#A4B0BE]'}`}>
                {sexo === 'masculino' && <span className="w-2 h-2 rounded-full bg-white" />}
              </span>
              Masculino
            </label>
            <label
              className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full text-sm font-medium border transition-colors ${sexo === 'femenino' ? 'bg-[#61C5B8] text-white border-[#61C5B8]' : 'bg-white text-[#A4B0BE] border-[#D1D8E0]'}`}
              onClick={() => setSexo('femenino')}
            >
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${sexo === 'femenino' ? 'border-white' : 'border-[#A4B0BE]'}`}>
                {sexo === 'femenino' && <span className="w-2 h-2 rounded-full bg-white" />}
              </span>
              Femenino
            </label>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-[15px] mt-2.5">
          <Link to="/registro" className="flex-1 min-w-0 bg-white text-[#DE7D7A] border border-[#DE7D7A] rounded-2xl py-5 text-[15px] font-bold flex items-center justify-center no-underline hover:bg-[#FFF5F5] transition-colors">
            Atrás
          </Link>
          <Link to="/registro-paso3" className="flex-1 min-w-0 bg-[#61C5B8] hover:bg-[#4FB0A4] text-white rounded-2xl py-5 text-[15px] font-bold flex items-center justify-center gap-2 no-underline transition-colors">
            Siguiente
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>

      </form>

      <p className="mt-8 text-[#9CA8B4] text-sm font-medium">
        ¿Ya tienes una cuenta? <Link to="/" className="text-[#DE7D7A] no-underline font-bold hover:underline">Inicia Sesión</Link>
      </p>

    </div>
  );
}

export default RegistroPaso2;

