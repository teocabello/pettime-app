import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import Icono from './Icono';
import { useMascota } from './MascotaContext';

registerLocale('es', es);

const ICONOS = {
  huellas: 'iconhuellaagregar',
  usuario: 'iconusuario',
  calendario: 'iconcalendario',
  tipoMascota: 'iconperrito',
  raza: 'iconhuelladoble',
  peso: 'iconpeso',
  sexo: 'iconsexo',
  medica: 'iconmedica',
  alergia: 'iconalergia',
  documentoAgregar: 'iconagregardoc',
  documento: 'icondocumento',
  flecha: 'iconflechaderecha',
  check: 'iconhuellacheck',
  editar: 'iconeditar',
  inicio: 'iconinicio',
  servicios: 'iconservicios',
  historial: 'iconhistorial',
  perfil: 'iconusuario'
};

function parseFecha(fechaTexto) {
  if (!fechaTexto) return null;
  const partes = fechaTexto.split('/');
  if (partes.length !== 3) return null;
  const [dd, mm, yyyy] = partes.map(Number);
  if (!dd || !mm || !yyyy) return null;
  return new Date(yyyy, mm - 1, dd);
}

function formatearFecha(fecha) {
  const dd = String(fecha.getDate()).padStart(2, '0');
  const mm = String(fecha.getMonth() + 1).padStart(2, '0');
  const yyyy = fecha.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

const InputFecha = forwardRef(({ value, onClick, placeholder, disabled }, ref) => (
  <div
    className={`bg-white rounded-xl flex items-center px-[18px] py-3 gap-3 w-full ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
    onClick={disabled ? undefined : onClick}
    ref={ref}
  >
    <Icono name={ICONOS.calendario} alt="Fecha" className="w-5 h-5 shrink-0" width="20" height="20" />
    <span className={`w-full text-sm font-bold ${value ? 'text-black' : 'text-[#A4B0BE]'}`}>
      {value || placeholder || 'Fecha de Nacimiento'}
    </span>
  </div>
));

function SelectOvalado({ icono, placeholder, opciones, valor, onChange, disabled }) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickFuera(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setAbierto(false);
      }
    }

    document.addEventListener('mousedown', handleClickFuera);
    return () => document.removeEventListener('mousedown', handleClickFuera);
  }, []);

  const etiqueta = opciones.find(opcion => opcion.value === valor)?.label || placeholder;

  return (
    <div className="relative" ref={ref}>
      <div
        className={`bg-white rounded-xl flex items-center px-[18px] py-3 gap-3 select-none ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
        onClick={() => {
          if (!disabled) setAbierto(prev => !prev);
        }}
      >
        <Icono name={icono} alt={etiqueta} className="w-5 h-5 shrink-0" width="20" height="20" />
        <span className={`flex-1 text-sm font-bold ${valor ? 'text-black' : 'text-[#A4B0BE]'}`}>{etiqueta}</span>
        <Icono
          name={ICONOS.flecha}
          alt="Abrir opciones"
          className={`w-4 h-4 shrink-0 pointer-events-none transition-transform ${abierto ? 'rotate-90' : ''}`}
          width="16"
          height="16"
        />
      </div>
      {abierto && !disabled && (
        <ul className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl shadow-xl list-none m-0 p-2 z-[120] overflow-hidden">
          {opciones.map(opcion => (
            <li
              key={opcion.value}
              className={`px-4 py-2.5 rounded-full cursor-pointer text-sm font-medium transition-colors ${valor === opcion.value ? 'bg-[#61C5B8] text-white font-semibold' : 'text-[#555] hover:bg-[#61C5B8] hover:text-white'}`}
              onClick={() => {
                onChange(opcion.value);
                setAbierto(false);
              }}
            >
              {opcion.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EditarMascota() {
  const location = useLocation();
  const { mascotas, actualizarMascota } = useMascota();
  const mascotaSeleccionada = mascotas.find(m => m.id === location.state?.mascotaId) || mascotas[0] || null;

  const inputFotoRef = useRef(null);

  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [raza, setRaza] = useState('');
  const [peso, setPeso] = useState('');
  const [tipoMascota, setTipoMascota] = useState('');
  const [sexo, setSexo] = useState('');
  const [condicion, setCondicion] = useState('');
  const [detalleCondicion, setDetalleCondicion] = useState('');
  const [alergia, setAlergia] = useState('');
  const [detalleAlergia, setDetalleAlergia] = useState('');
  const [documentoNombre, setDocumentoNombre] = useState('');
  const [documentoRevision, setDocumentoRevision] = useState('');
  const [documentoGuardado, setDocumentoGuardado] = useState(false);
  const [foto, setFoto] = useState('');
  const [calAbierto, setCalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [snapshot, setSnapshot] = useState(null);

  const tomarSnapshot = () => ({
    nombre,
    fechaNacimiento,
    tipoMascota,
    raza,
    peso,
    sexo,
    condicion,
    detalleCondicion,
    alergia,
    detalleAlergia,
    documentoNombre,
    documentoRevision,
    documentoGuardado,
    foto
  });

  useEffect(() => {
    if (!mascotaSeleccionada) {
      setNombre('');
      setFechaNacimiento('');
      setTipoMascota('');
      setRaza('');
      setPeso('');
      setSexo('');
      setCondicion('');
      setDetalleCondicion('');
      setAlergia('');
      setDetalleAlergia('');
      setDocumentoNombre('');
      setDocumentoRevision('');
      setDocumentoGuardado(false);
      setFoto('');
      setCalAbierto(false);
      setModoEdicion(false);
      setSnapshot(null);
      return;
    }

    setNombre(mascotaSeleccionada.nombre || '');
    setFechaNacimiento(mascotaSeleccionada.fechaNacimiento || '');
    setTipoMascota(mascotaSeleccionada.tipoMascota || '');
    setRaza(mascotaSeleccionada.raza || '');
    setPeso(mascotaSeleccionada.peso || '');
    setSexo(mascotaSeleccionada.sexo || '');
    setCondicion(mascotaSeleccionada.condicion || '');
    const detalleCondicionGuardado = mascotaSeleccionada.detalleCondicion || '';
    const detalleCondicionNormalizado = detalleCondicionGuardado === 'obs'
      ? 'simple'
      : detalleCondicionGuardado === 'estable'
        ? 'medio'
        : detalleCondicionGuardado === 'tratamiento'
          ? 'critico'
          : detalleCondicionGuardado;
    setDetalleCondicion(detalleCondicionNormalizado);
    setAlergia(mascotaSeleccionada.alergia || '');
    const detalleAlergiaGuardado = mascotaSeleccionada.detalleAlergia || '';
    const detalleAlergiaNormalizado = detalleAlergiaGuardado === 'alergia' ? 'alimentos' : detalleAlergiaGuardado;
    setDetalleAlergia(detalleAlergiaNormalizado);
    setDocumentoNombre(mascotaSeleccionada.documentoNombre || '');
    setDocumentoRevision(mascotaSeleccionada.documentoRevision || '');
    setDocumentoGuardado(Boolean(mascotaSeleccionada.documentoNombre || mascotaSeleccionada.documentoRevision));
    setFoto(mascotaSeleccionada.foto || '');
    setCalAbierto(false);
    setModoEdicion(false);
    setSnapshot(null);
  }, [mascotaSeleccionada]);

  const iniciarEdicion = () => {
    if (!modoEdicion) {
      setSnapshot(tomarSnapshot());
      setModoEdicion(true);
    }
  };

  const cancelarEdicion = () => {
    if (snapshot) {
      setNombre(snapshot.nombre);
      setFechaNacimiento(snapshot.fechaNacimiento);
      setTipoMascota(snapshot.tipoMascota);
      setRaza(snapshot.raza);
      setPeso(snapshot.peso);
      setSexo(snapshot.sexo);
      setCondicion(snapshot.condicion);
      setDetalleCondicion(snapshot.detalleCondicion);
      setAlergia(snapshot.alergia);
      setDetalleAlergia(snapshot.detalleAlergia);
      setDocumentoNombre(snapshot.documentoNombre);
      setDocumentoRevision(snapshot.documentoRevision);
      setDocumentoGuardado(snapshot.documentoGuardado);
      setFoto(snapshot.foto);
    }
    setCalAbierto(false);
    setModoEdicion(false);
    setSnapshot(null);
  };

  const guardarEdicion = () => {
    if (!mascotaSeleccionada?.id) return;

    actualizarMascota(mascotaSeleccionada.id, {
      nombre,
      fechaNacimiento,
      tipoMascota,
      raza,
      peso,
      sexo,
      condicion,
      detalleCondicion,
      alergia,
      detalleAlergia,
      documentoNombre,
      documentoRevision,
      foto
    });

    setDocumentoGuardado(Boolean(documentoNombre || documentoRevision));

    setCalAbierto(false);
    setModoEdicion(false);
    setSnapshot(null);
  };

  const handleFoto = (event) => {
    const archivo = event.target.files?.[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.onload = ev => {
      setFoto(ev.target?.result || '');
    };
    reader.readAsDataURL(archivo);
  };

  const handleCartilla = (event) => {
    const archivo = event.target.files?.[0];
    if (!archivo) return;

    iniciarEdicion();
    setDocumentoNombre(archivo.name);
    setDocumentoGuardado(false);
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, '0');
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const yyyy = hoy.getFullYear();
    setDocumentoRevision(`Ultima revision: ${dd}/${mm}/${yyyy}`);
  };

  return (
    <div className="bg-[#F2F7FD] min-h-screen pt-[60px] pb-[80px]">
      <header className="bg-[#61C5B8] fixed top-0 left-0 w-full h-[60px] flex items-center justify-between px-5 z-[100] rounded-b-[15px]">
        <h1 className="text-xl font-extrabold m-0"><span className="text-[#DE7D7A]">Pet</span> <span className="text-white">Time</span></h1>
        <Link to="/inicio" className="text-white w-6 h-6">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
        </Link>
      </header>

      <div className="flex justify-center pt-5 pb-2">
        <button
          type="button"
          className={`relative bg-transparent border-none p-0 ${modoEdicion ? 'cursor-pointer' : 'cursor-default'}`}
          onClick={() => {
            if (!modoEdicion) return;
            if (inputFotoRef.current) inputFotoRef.current.click();
          }}
        >
          {foto ? (
            <img
              src={foto}
              alt={nombre || 'Mascota'}
              className={`w-24 h-24 rounded-full object-cover ${modoEdicion ? 'border-[3px] border-black' : ''}`}
            />
          ) : (
            <div
              className={`w-24 h-24 rounded-full bg-[#E8EDF2] flex items-center justify-center ${modoEdicion ? 'border-[3px] border-black' : ''}`}
            >
              <Icono name={ICONOS.huellas} alt="Sin foto" className="w-14 h-14" width="56" height="56" />
            </div>
          )}
          {modoEdicion && (
            <span className="absolute bottom-1 right-1 w-6 h-6 flex items-center justify-center">
              <Icono
                name={ICONOS.editar}
                alt="Editar foto"
                className="w-6 h-6"
                width="24"
                height="24"
              />
            </span>
          )}
          <input ref={inputFotoRef} type="file" accept="image/*" className="hidden" onChange={handleFoto} />
        </button>
      </div>

      {!mascotaSeleccionada && (
        <div className="px-5 max-w-[500px] mx-auto">
          <div className="bg-white rounded-xl p-4 text-center text-[#A4B0BE] text-sm font-semibold">
            No hay mascotas registradas para editar.
          </div>
        </div>
      )}

      <form className="px-5 max-w-[500px] mx-auto flex flex-col gap-3 mt-4">
        <div className="bg-white rounded-xl flex items-center px-[18px] py-3 gap-3">
          <Icono name={ICONOS.usuario} alt="Nombre" className="w-5 h-5 shrink-0" width="20" height="20" />
          <input
            type="text"
            value={nombre}
            onChange={e => {
              iniciarEdicion();
              setNombre(e.target.value);
            }}
            readOnly={!modoEdicion}
            placeholder="Nombres"
            className="border-none outline-none bg-transparent w-full text-sm text-black font-bold placeholder:text-[#A4B0BE] placeholder:font-semibold"
          />
        </div>

        <DatePicker
          selected={parseFecha(fechaNacimiento)}
          onChange={fecha => {
            if (!fecha) return;
            iniciarEdicion();
            setFechaNacimiento(formatearFecha(fecha));
            setCalAbierto(false);
          }}
          open={calAbierto && modoEdicion}
          onInputClick={() => {
            if (!modoEdicion) return;
            iniciarEdicion();
            setCalAbierto(prev => !prev);
          }}
          onClickOutside={() => setCalAbierto(false)}
          locale="es"
          dateFormat="dd/MM/yyyy"
          placeholderText="Fecha de Nacimiento"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          yearDropdownItemNumber={30}
          scrollableYearDropdown
          disabled={!modoEdicion}
          customInput={<InputFecha placeholder="Fecha de Nacimiento" disabled={!modoEdicion} />}
          popperPlacement="bottom-start"
          popperProps={{ strategy: 'fixed' }}
          showPopperArrow={false}
        />

        <SelectOvalado
          icono={ICONOS.tipoMascota}
          placeholder="Tipo de Mascota"
          valor={tipoMascota}
          onChange={valor => {
            iniciarEdicion();
            setTipoMascota(valor);
          }}
          opciones={[{ value: 'perro', label: 'Perro' }, { value: 'gato', label: 'Gato' }]}
          disabled={!modoEdicion}
        />

        <div className="bg-white rounded-xl flex items-center px-[18px] py-3 gap-3">
          <Icono name={ICONOS.raza} alt="Raza" className="w-5 h-5 shrink-0" width="20" height="20" />
          <input
            type="text"
            value={raza}
            onChange={e => {
              iniciarEdicion();
              setRaza(e.target.value);
            }}
            readOnly={!modoEdicion}
            placeholder="Raza"
            className="border-none outline-none bg-transparent w-full text-sm text-black font-bold placeholder:text-[#A4B0BE] placeholder:font-semibold"
          />
        </div>

        <div className="bg-white rounded-xl flex items-center px-[18px] py-3 gap-3">
          <Icono name={ICONOS.peso} alt="Peso" className="w-5 h-5 shrink-0" width="20" height="20" />
          <input
            type="text"
            value={peso}
            onChange={e => {
              iniciarEdicion();
              setPeso(e.target.value);
            }}
            readOnly={!modoEdicion}
            placeholder="Peso"
            className="border-none outline-none bg-transparent w-full text-sm text-black font-bold placeholder:text-[#A4B0BE] placeholder:font-semibold"
          />
        </div>

        <SelectOvalado
          icono={ICONOS.sexo}
          placeholder="Sexo"
          valor={sexo}
          onChange={valor => {
            iniciarEdicion();
            setSexo(valor);
          }}
          opciones={[{ value: 'macho', label: 'Macho' }, { value: 'hembra', label: 'Hembra' }]}
          disabled={!modoEdicion}
        />

        <SelectOvalado
          icono={ICONOS.medica}
          placeholder="¿Tiene condicion medica?"
          valor={condicion}
          onChange={valor => {
            iniciarEdicion();
            setCondicion(valor);
            if (valor === 'no') {
              setDetalleCondicion('');
            } else {
              setDetalleCondicion('');
            }
          }}
          opciones={[{ value: 'si', label: 'Si' }, { value: 'no', label: 'No' }]}
          disabled={!modoEdicion}
        />

        {condicion === 'si' && (
          <SelectOvalado
            icono={ICONOS.medica}
            placeholder="Nivel de gravedad"
            valor={detalleCondicion}
            onChange={valor => {
              iniciarEdicion();
              setDetalleCondicion(valor);
            }}
            opciones={[
              { value: 'simple', label: 'Simple' },
              { value: 'medio', label: 'Medio' },
              { value: 'critico', label: 'Critico' }
            ]}
            disabled={!modoEdicion}
          />
        )}

        <SelectOvalado
          icono={ICONOS.alergia}
          placeholder="¿Tiene alergias?"
          valor={alergia}
          onChange={valor => {
            iniciarEdicion();
            setAlergia(valor);
            if (valor === 'no') {
              setDetalleAlergia('');
            } else {
              setDetalleAlergia('');
            }
          }}
          opciones={[{ value: 'si', label: 'Si' }, { value: 'no', label: 'No' }]}
          disabled={!modoEdicion}
        />

        {alergia === 'si' && (
          <SelectOvalado
            icono={ICONOS.alergia}
            placeholder="Tipo de alergia"
            valor={detalleAlergia}
            onChange={valor => {
              iniciarEdicion();
              setDetalleAlergia(valor);
            }}
            opciones={[
              { value: 'polvo', label: 'Polvo' },
              { value: 'polen', label: 'Polen' },
              { value: 'alimentos', label: 'Alimentos' },
              { value: 'pulgas', label: 'Pulgas' },
              { value: 'medicamentos', label: 'Medicamentos' },
              { value: 'otra', label: 'Otra' }
            ]}
            disabled={!modoEdicion}
          />
        )}

        {documentoNombre || documentoRevision ? (
          <div className="bg-white rounded-xl p-5 mt-1">
            <div className="flex items-center gap-3 min-h-[56px]">
              <Icono name={ICONOS.documento} alt="Documento" className="w-5 h-5 shrink-0" width="20" height="20" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#333] m-0 truncate">{documentoNombre || 'Documento registrado'}</p>
                <p className="text-xs text-[#A4B0BE] m-0">{documentoRevision}</p>
              </div>
              {documentoGuardado && !modoEdicion && (
                <Icono name={ICONOS.check} alt="Documento actualizado" className="w-5 h-5 shrink-0" width="20" height="20" />
              )}
              {modoEdicion && (
                <button
                  type="button"
                  className="bg-transparent border-none text-[#DE7D7A] text-xs font-bold cursor-pointer"
                  onClick={() => {
                    setDocumentoNombre('');
                    setDocumentoRevision('');
                    setDocumentoGuardado(false);
                  }}
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ) : (
          <label className={`border-2 border-dashed border-[#A4B0BE] rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-[#A4B0BE] text-sm font-semibold transition-colors mt-1 ${modoEdicion ? 'cursor-pointer hover:bg-white' : 'cursor-default pointer-events-none'}`}>
            <input type="file" className="hidden" onChange={handleCartilla} disabled={!modoEdicion} />
            <Icono name={ICONOS.documentoAgregar} className="w-[30px] h-[30px]" alt="Agregar documento" />
            <span>Añadir cartilla de vacunacion</span>
          </label>
        )}

        {modoEdicion ? (
          <div className="flex gap-[15px] mt-2.5">
            <button type="button" className="flex-1 py-3 bg-[#61C5B8] text-white rounded-xl font-bold text-sm border-none cursor-pointer" onClick={guardarEdicion}>
              Guardar
            </button>
            <button type="button" className="flex-1 py-3 bg-[#5C85D6] text-white rounded-xl font-bold text-sm border-none cursor-pointer" onClick={cancelarEdicion}>
              Cancelar
            </button>
          </div>
        ) : (
          <button type="button" className="w-full py-3 bg-[#61C5B8] text-white rounded-xl font-bold text-sm border-none cursor-pointer mt-2" onClick={iniciarEdicion}>
            Editar Perfil
          </button>
        )}
      </form>

      <nav className="bg-[#698DD3] fixed bottom-0 left-0 w-full h-[70px] flex justify-around items-center rounded-t-[15px] px-2.5">
        <Link to="/inicio" className="bg-white text-[#698DD3] flex flex-col items-center justify-center no-underline text-xs gap-1 px-[15px] py-2 rounded-xl">
          <Icono name={ICONOS.inicio} alt="Inicio" className="w-6 h-6" width="24" height="24" />
          <span>Inicio</span>
        </Link>
        <Link to="/servicios" className="flex flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl">
          <Icono name={ICONOS.servicios} alt="Servicios" className="w-6 h-6" width="24" height="24" />
          <span>Servicios</span>
        </Link>
        <Link to="/historial" className="flex flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl">
          <Icono name={ICONOS.historial} alt="Historial" className="w-6 h-6" width="24" height="24" />
          <span>Historial</span>
        </Link>
        <Link to="/perfil" className="flex flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl">
          <Icono name={ICONOS.perfil} alt="Perfil" className="w-6 h-6" width="24" height="24" style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }} />
          <span>Perfil</span>
        </Link>
      </nav>
    </div>
  );
}

export default EditarMascota;
