import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMascota } from './MascotaContext';

function AgregarMascota() {
  const navigate = useNavigate();
  const { agregarMascota } = useMascota();
  const [nombre, setNombre] = useState('');
  const [tipoMascota, setTipoMascota] = useState('');
  const [raza, setRaza] = useState('');
  const [razas, setRazas] = useState([]);
  const [cargandoRazas, setCargandoRazas] = useState(false);
  const [errorRazas, setErrorRazas] = useState(null);
  const [foto, setFoto] = useState(null);
  const [fechaText, setFechaText] = useState('');
  const [peso, setPeso] = useState('');
  const [sexo, setSexo] = useState('');
  const [condicion, setCondicion] = useState('');
  const [alergias, setAlergias] = useState('');

  // Convierte la imagen seleccionada a base64 para mostrarla y guardarla
  const handleFoto = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    const reader = new FileReader();
    reader.onload = (ev) => setFoto(ev.target.result);
    reader.readAsDataURL(archivo);
  };

  // Llama a la API cada vez que cambia el tipo de mascota
  useEffect(() => {
    if (!tipoMascota) return;

    const url = tipoMascota === 'perro'
      ? 'https://api.thedogapi.com/v1/breeds'
      : 'https://api.thecatapi.com/v1/breeds';

    setCargandoRazas(true);
    setErrorRazas(null);
    setRaza('');
    setRazas([]);

    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        setRazas(data.map(b => b.name));
        setCargandoRazas(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setErrorRazas('No se pudieron cargar las razas');
          setCargandoRazas(false);
        }
      });

    return () => controller.abort();
  }, [tipoMascota]);

  const handleRegistrar = () => {
    if (!nombre.trim()) return;
    // Agrega la mascota al contexto global y navega sin pasar state
    agregarMascota({ id: Date.now(), nombre: nombre.trim(), foto: foto });
    navigate('/inicio');
  };

  return (
    <div className="bg-[#F2F7FD] min-h-screen pt-[60px] pb-[80px]">
      
      <header className="bg-[#61C5B8] fixed top-0 left-0 w-full h-[60px] flex items-center justify-between px-5 z-[100] rounded-b-[15px]">
        <h1 className="text-xl font-extrabold m-0"><span className="text-[#DE7D7A]">Pet</span> <span className="text-white">Time</span></h1>
        <Link to="/inicio" className="text-white w-6 h-6">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
        </Link>
      </header>

      <div className="flex justify-center pt-5 pb-2 relative">
        <label className="cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={handleFoto} />
          <div className="w-24 h-24 rounded-full bg-[#E8EDF2] flex items-center justify-center overflow-hidden">
            {foto ? (
              <img src={foto} alt="Foto mascota" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-12 h-12 text-[#A4B0BE]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            )}
          </div>
          <div className="absolute bottom-2 left-1/2 translate-x-3 w-6 h-6 bg-[#61C5B8] rounded-full flex items-center justify-center">
            <svg fill="none" stroke="white" viewBox="0 0 24 24" width="14" height="14"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
          </div>
        </label>
      </div>

      <form className="px-5 max-w-[500px] mx-auto flex flex-col gap-3 mt-4">
        <div className="bg-white rounded-xl flex items-center px-[18px] py-3 gap-3">
          <svg className="w-5 h-5 text-[#A4B0BE] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          <input type="text" placeholder="Nombres" value={nombre} onChange={e => setNombre(e.target.value)} className="border-none outline-none bg-transparent w-full text-sm text-[#555] placeholder-[#A4B0BE] placeholder:font-semibold" />
        </div>

        <div className="bg-white rounded-xl flex items-center px-[18px] py-3 gap-3">
          <svg className="w-5 h-5 text-[#A4B0BE] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <input type="text" placeholder="Fecha de Nacimiento" value={fechaText} onChange={e => setFechaText(e.target.value)} className="border-none outline-none bg-transparent w-full text-sm text-[#555] placeholder-[#A4B0BE] placeholder:font-semibold" />
        </div>

        <div className="bg-white rounded-xl flex items-center px-[18px] py-3 gap-3 relative">
          <svg className="w-5 h-5 text-[#A4B0BE] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
          <select
            className={`border-none outline-none bg-transparent w-full text-sm font-semibold appearance-none ${tipoMascota ? 'text-[#555]' : 'text-[#A4B0BE]'}`}
            value={tipoMascota}
            onChange={e => setTipoMascota(e.target.value)}
          >
            <option value="" disabled>Tipo de Mascota</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
          </select>
          <svg className="w-4 h-4 text-[#A4B0BE] shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>

        {/* Raza — se carga dinámicamente desde The Dog/Cat API */}
        <div className="bg-white rounded-xl flex items-center px-[18px] py-3 gap-3 relative">
          <svg className="w-5 h-5 text-[#A4B0BE] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          {cargandoRazas ? (
            <span className="text-[#A4B0BE] text-sm font-semibold w-full">Cargando razas...</span>
          ) : errorRazas ? (
            <span className="text-[#DE7D7A] text-sm font-semibold w-full">{errorRazas}</span>
          ) : (
            <select
              className={`border-none outline-none bg-transparent w-full text-sm font-semibold appearance-none ${raza ? 'text-[#555]' : 'text-[#A4B0BE]'}`}
              value={raza}
              onChange={e => setRaza(e.target.value)}
              disabled={!tipoMascota || razas.length === 0}
            >
              <option value="">Raza</option>
              {razas.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          )}
          {!cargandoRazas && (
            <svg className="w-4 h-4 text-[#A4B0BE] shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          )}
        </div>

        <div className="bg-white rounded-xl flex items-center px-[18px] py-3 gap-3">
          <svg className="w-5 h-5 text-[#A4B0BE] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
          <input type="text" placeholder="Peso" value={peso} onChange={e => setPeso(e.target.value)} className="border-none outline-none bg-transparent w-full text-sm text-[#555] placeholder-[#A4B0BE] placeholder:font-semibold" />
        </div>

        <div className="bg-white rounded-xl flex items-center px-[18px] py-3 gap-3 relative">
          <svg className="w-5 h-5 text-[#A4B0BE] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg>
          <select
            className={`border-none outline-none bg-transparent w-full text-sm font-semibold appearance-none ${sexo ? 'text-[#555]' : 'text-[#A4B0BE]'}`}
            value={sexo}
            onChange={e => setSexo(e.target.value)}
          >
            <option value="" disabled>Sexo</option>
            <option value="macho">Macho</option>
            <option value="hembra">Hembra</option>
          </select>
          <svg className="w-4 h-4 text-[#A4B0BE] shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>

        <div className="bg-white rounded-xl flex items-center px-[18px] py-3 gap-3 relative">
          <svg className="w-5 h-5 text-[#A4B0BE] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          <select
            className={`border-none outline-none bg-transparent w-full text-sm font-semibold appearance-none ${condicion ? 'text-[#555]' : 'text-[#A4B0BE]'}`}
            value={condicion}
            onChange={e => setCondicion(e.target.value)}
          >
            <option value="" disabled>Condición medica</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
          <svg className="w-4 h-4 text-[#A4B0BE] shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>

        <div className="bg-white rounded-xl flex items-center px-[18px] py-3 gap-3 relative">
          <svg className="w-5 h-5 text-[#A4B0BE] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          <select
            className={`border-none outline-none bg-transparent w-full text-sm font-semibold appearance-none ${alergias ? 'text-[#555]' : 'text-[#A4B0BE]'}`}
            value={alergias}
            onChange={e => setAlergias(e.target.value)}
          >
            <option value="" disabled>Alergias</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
          <svg className="w-4 h-4 text-[#A4B0BE] shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>

        <label className="border-2 border-dashed border-[#A4B0BE] rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-[#A4B0BE] text-sm font-semibold cursor-pointer hover:bg-white transition-colors">
          <input type="file" className="hidden" />
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <span>Añadir cartilla de vacunación</span>
        </label>

        <button type="button" onClick={handleRegistrar} className="bg-[#61C5B8] hover:bg-[#4FB0A4] text-white rounded-xl py-[15px] text-[15px] font-bold flex items-center justify-center transition-colors mt-[10px] border-none cursor-pointer w-full">
          Registrar
        </button>
      </form>

      <nav className="bg-[#698DD3] fixed bottom-0 left-0 w-full h-[70px] flex justify-around items-center rounded-t-[15px] px-2.5">
        <Link to="/inicio" className="bg-white text-[#698DD3] flex flex-col items-center justify-center no-underline text-xs gap-1 px-[15px] py-2 rounded-xl">
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
        <Link to="/perfil" className="flex flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          <span>Perfil</span>
        </Link>
      </nav>
    </div>
  );
}

export default AgregarMascota;

