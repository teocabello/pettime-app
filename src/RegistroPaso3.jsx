import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import logo from './assets/logo 6-2 2.svg';
import Icono from './Icono';

registerLocale('es', es);

const InputFecha = forwardRef(({ value, onClick, placeholder }, ref) => (
  <div className="bg-white rounded-2xl flex items-center px-[18px] py-5 w-full cursor-pointer shadow-sm" onClick={onClick} ref={ref}>
    <Icono name="iconcalendario" className="w-5 h-5 mr-[15px]" alt="Calendario" />
    <span className={value ? 'text-[#555] text-sm font-medium w-full' : 'text-[#A4B0BE] font-semibold text-sm w-full'}>
      {value || placeholder}
    </span>
  </div>
));

// Dropdown personalizado con opciones de forma ovalada
function SelectOvalado({ icono, placeholder, opciones, valor, onChange }) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickFuera(e) {
      if (ref.current && !ref.current.contains(e.target)) setAbierto(false);
    }
    document.addEventListener('mousedown', handleClickFuera);
    return () => document.removeEventListener('mousedown', handleClickFuera);
  }, []);

  const etiqueta = opciones.find(o => o.value === valor)?.label || placeholder;

  return (
    <div className="relative w-full" ref={ref}>
      <div className="bg-white rounded-2xl flex items-center px-[18px] py-5 cursor-pointer select-none" onClick={() => setAbierto(prev => !prev)}>
        <Icono name={icono} className="w-5 h-5 mr-[15px]" alt={placeholder} />
        <span className={`flex-1 text-sm font-semibold ${valor ? 'text-[#333]' : 'text-[#A4B0BE]'}`}>{etiqueta}</span>
        <svg className="w-4 h-4 text-[#A4B0BE] ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {abierto && (
        <ul className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl shadow-xl list-none m-0 p-2 z-[100] overflow-hidden">
          {opciones.map(op => (
            <li
              key={op.value}
              className={`px-4 py-2.5 rounded-full cursor-pointer text-sm font-medium transition-colors ${valor === op.value ? 'bg-[#61C5B8] text-white font-semibold' : 'text-[#555] hover:bg-[#61C5B8] hover:text-white'}`}
              onClick={() => { onChange(op.value); setAbierto(false); }}
            >
              {op.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function RegistroPaso3() {
  const [nombre, setNombre] = useState(() => {
    try { return localStorage.getItem('pettime_reg3_nombre') || ''; } catch { return ''; }
  });
  const [raza, setRaza] = useState(() => {
    try { return localStorage.getItem('pettime_reg3_raza') || ''; } catch { return ''; }
  });
  const [peso, setPeso] = useState(() => {
    try { return localStorage.getItem('pettime_reg3_peso') || ''; } catch { return ''; }
  });
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [calAbierto, setCalAbierto] = useState(false);
  const [tipoMascota, setTipoMascota] = useState('');
  const [sexo, setSexo] = useState('');
  const [condicion, setCondicion] = useState('');
  const [gravedad, setGravedad] = useState('');
  const [alergia, setAlergia] = useState('');
  const [tipoAlergia, setTipoAlergia] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('pettime_reg3_nombre', nombre);
      localStorage.setItem('pettime_reg3_raza', raza);
      localStorage.setItem('pettime_reg3_peso', peso);
    } catch {}
  }, [nombre, raza, peso]);

  return (
    <div className="bg-[#F2F7FD] min-h-screen flex flex-col items-center justify-start px-5 py-10">
      
      <div className="mb-1">
        <img src={logo} alt="Logo de PetTime" className="w-[190px] max-w-full h-auto" width="190" height="208" fetchPriority="high" />
      </div>

      <h1 className="text-[#DE7D7A] text-[22px] mb-[15px] font-bold">Datos de la Mascota</h1>

      {/* Indicador de pasos */}
      <div className="flex items-center justify-center mb-5">
        <div className="w-[50px] h-[50px] bg-[#698DD3] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">1</div>
        <div className="w-[35px] h-0.5 bg-[#698DD3]"></div>
        <div className="w-[50px] h-[50px] bg-[#698DD3] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">2</div>
        <div className="w-[35px] h-0.5 bg-[#698DD3]"></div>
        <div className="w-[50px] h-[50px] bg-[#61C5B8] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">3</div>
      </div>

      <form className="w-full max-w-[400px] flex flex-col gap-4">
        
        <div className="bg-white rounded-2xl flex items-center px-[18px] py-5 shadow-sm">
          <Icono name="iconusuario" className="w-5 h-5 mr-[15px]" alt="Usuario" />
          <input type="text" placeholder="Nombres" value={nombre} onChange={e => setNombre(e.target.value)} className="border-none outline-none bg-transparent w-full text-sm text-[#555] placeholder-[#A4B0BE] placeholder:font-semibold" />
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
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          yearDropdownItemNumber={30}
          scrollableYearDropdown
          customInput={<InputFecha />}
          popperPlacement="bottom-start"
          popperProps={{ strategy: 'fixed' }}
          showPopperArrow={false}
        />

        <SelectOvalado
          icono="iconperrito"
          placeholder="Tipo de Mascota"
          opciones={[
            { value: 'perro', label: 'Perro' },
            { value: 'gato', label: 'Gato' },
          ]}
          valor={tipoMascota}
          onChange={setTipoMascota}
        />

        <div className="bg-white rounded-2xl flex items-center px-[18px] py-5 shadow-sm">
          <Icono name="iconhuelladoble" className="w-5 h-5 mr-[15px]" alt="Raza" />
          <input type="text" placeholder="Raza" value={raza} onChange={e => setRaza(e.target.value)} className="border-none outline-none bg-transparent w-full text-sm text-[#555] placeholder-[#A4B0BE] placeholder:font-semibold" />
        </div>

        <div className="bg-white rounded-2xl flex items-center px-[18px] py-5 shadow-sm">
          <Icono name="iconpeso" className="w-5 h-5 mr-[15px]" alt="Peso" />
          <input type="text" placeholder="Peso" value={peso} onChange={e => setPeso(e.target.value)} className="border-none outline-none bg-transparent w-full text-sm text-[#555] placeholder-[#A4B0BE] placeholder:font-semibold" />
        </div>

        <SelectOvalado
          icono="iconsexo"
          placeholder="Sexo"
          opciones={[
            { value: 'macho', label: 'Macho' },
            { value: 'hembra', label: 'Hembra' },
          ]}
          valor={sexo}
          onChange={setSexo}
        />

        <SelectOvalado
          icono="iconmedica"
          placeholder="¿Tiene condición médica?"
          opciones={[
            { value: 'si', label: 'Sí' },
            { value: 'no', label: 'No' },
          ]}
          valor={condicion}
          onChange={(val) => { setCondicion(val); setGravedad(''); }}
        />
        {condicion === 'si' && (
          <SelectOvalado
            icono="iconmedica"
            placeholder="Nivel de gravedad"
            opciones={[
              { value: 'simple', label: 'Simple' },
              { value: 'medio', label: 'Medio' },
              { value: 'critico', label: 'Crítico' },
            ]}
            valor={gravedad}
            onChange={setGravedad}
          />
        )}

        <SelectOvalado
          icono="iconalergia"
          placeholder="¿Tiene alergias?"
          opciones={[
            { value: 'si', label: 'Sí' },
            { value: 'no', label: 'No' },
          ]}
          valor={alergia}
          onChange={(val) => { setAlergia(val); setTipoAlergia(''); }}
        />
        {alergia === 'si' && (
          <SelectOvalado
            icono="iconalergia"
            placeholder="Tipo de alergia"
            opciones={[
              { value: 'polvo', label: 'Polvo' },
              { value: 'polen', label: 'Polen' },
              { value: 'alimentos', label: 'Alimentos' },
              { value: 'pulgas', label: 'Pulgas' },
              { value: 'medicamentos', label: 'Medicamentos' },
              { value: 'otra', label: 'Otra' },
            ]}
            valor={tipoAlergia}
            onChange={setTipoAlergia}
          />
        )}

        {/* Caja punteada de archivo */}
        <label className="border-2 border-dashed border-[#A4B0BE] rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-[#A4B0BE] text-sm font-semibold cursor-pointer hover:bg-white transition-colors mt-1">
          <input type="file" className="hidden" />
          <Icono name="iconagregardoc" className="w-[30px] h-[30px]" alt="Agregar documento" />
          <span>Añadir cartilla de vacunación</span>
        </label>

        {/* Botones */}
        <div className="flex gap-[15px] mt-2.5">
          <Link to="/registro-paso2" className="flex-1 bg-white text-[#DE7D7A] border border-[#DE7D7A] rounded-2xl py-5 text-[15px] font-bold flex items-center justify-center no-underline hover:bg-[#FFF5F5] transition-colors">
            Atrás
          </Link>
          <Link to="/" className="flex-1 bg-[#61C5B8] hover:bg-[#4FB0A4] text-white rounded-2xl py-5 text-[15px] font-bold flex items-center justify-center no-underline transition-colors">
            Regístrate
          </Link>
        </div>

        <Link to="/" className="text-center text-[#5C85D6] no-underline font-bold text-sm mt-1 hover:underline">
          Omitir
        </Link>

      </form>

      <p className="mt-8 text-[#9CA8B4] text-sm font-medium">
        ¿Ya tienes una cuenta? <Link to="/" className="text-[#DE7D7A] no-underline font-bold hover:underline">Inicia Sesión</Link>
      </p>

    </div>
  );
}

export default RegistroPaso3;

