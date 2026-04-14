import React, { useState, useCallback, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icono from './Icono';
import { useMascota } from './MascotaContext';
import { AuthContext } from './AuthContext';

const ICONOS = {
  huellas: 'iconhuellaagregar',
  huellaDoble: 'iconhuelladoble',
  inicio: 'iconinicio',
  servicios: 'iconservicios',
  historial: 'iconhistorial',
  perfil: 'iconusuario',
  cuidado: 'iconcuidado',
  limpieza: 'iconlimpieza',
  paseos: 'iconpaseo',
  veterinaria: 'iconveterinaria',
};

const TarjetaMascota = React.memo(function TarjetaMascota({ mascota, onEliminar }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-[15px] p-[15px] flex flex-col items-center relative shadow-sm cursor-pointer"
      onClick={() => navigate('/editar-mascota', { state: { mascotaId: mascota.id } })}
    >
      {mascota?.foto ? (
        <img
          src={mascota.foto}
          alt={mascota.nombre}
          className="w-[110px] h-[110px] rounded-full object-cover mb-2.5"
        />
      ) : (
        <Icono
          name={ICONOS.huellas}
          alt={mascota?.nombre || 'Mascota'}
          className="w-[110px] h-[110px] rounded-full object-cover mb-2.5"
        />
      )}

      <p className="font-bold text-sm text-black">{mascota?.nombre}</p>

      <button
        type="button"
        className="absolute bottom-2.5 right-2.5 bg-transparent border-none cursor-pointer w-[22px] h-[22px] p-0 text-[#DE7D7A]"
        onClick={(e) => {
          e.stopPropagation();
          onEliminar(mascota.nombre);
        }}
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
});

function Inicio() {
  const navigate = useNavigate();
  const { mascotas, eliminarMascota } = useMascota();
  const { currentUser, logout } = useContext(AuthContext);

  const [mascotaAEliminar, setMascotaAEliminar] = useState(null);
  const mascotaVisible = mascotas.length > 0 ? mascotas[0] : null;

  const cerrarModal = useCallback(() => setMascotaAEliminar(null), []);

  const confirmarEliminar = useCallback(
    (nombre) => {
      eliminarMascota(nombre);
      cerrarModal();
    },
    [eliminarMascota, cerrarModal]
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-[#F2F7FD] min-h-screen pt-[72px] pb-[90px]">
      <header className="bg-[#61C5B8] fixed top-0 left-0 w-full h-[60px] z-[100] rounded-b-[15px] px-4 sm:px-5">
        <div className="h-full w-full max-w-[1200px] mx-auto flex items-center justify-between">
          <h1 className="text-[20px] font-extrabold m-0">
            <span className="text-[#DE7D7A]">Pet</span>{' '}
            <span className="text-white">Time</span>
          </h1>

          <button
            type="button"
            onClick={handleLogout}
            className="text-white w-6 h-6 bg-transparent border-none cursor-pointer p-0"
            aria-label="Cerrar sesión"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="px-4 sm:px-5 max-w-[1200px] mx-auto">
        <div className="bg-[#61C5B8] rounded-[15px] p-5 text-white mb-[25px]">
          <p className="text-sm mb-1">Hola 👋</p>
          <h2 className="text-[22px] font-bold mb-1 break-words">
            Bienvenido{currentUser?.nombre ? `, ${currentUser.nombre}` : ''}!
          </h2>
          <p className="text-sm">¿Qué necesita tu mascota hoy?</p>
        </div>

        <section className="mb-[30px]">
          <h3 className="text-black text-base font-bold mb-[15px]">Mis Mascotas</h3>

          {mascotas.length === 0 ? (
            <div className="bg-white rounded-[15px] p-8 flex flex-col items-center text-center shadow-sm">
              <Icono
                name={ICONOS.huellas}
                alt="Sin mascotas"
                className="w-[85px] h-auto mb-4"
                width="85"
                height="85"
              />
              <p className="text-[#A4B0BE] text-sm font-semibold mb-4">
                Aún no hay mascotas registradas
              </p>
              <Link
                to="/agregar-mascota"
                className="border border-[#61C5B8] text-[#61C5B8] rounded-xl px-6 py-2 text-sm font-bold no-underline hover:bg-[#61C5B8] hover:text-white transition-colors"
              >
                Registra una mascota
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[15px]">
                {mascotaVisible && (
                  <TarjetaMascota
                    key={mascotaVisible.id}
                    mascota={mascotaVisible}
                    onEliminar={setMascotaAEliminar}
                  />
                )}

                <Link
                  to="/agregar-mascota"
                  className="border-2 border-dashed border-[#A4B0BE] rounded-[15px] p-[15px] flex flex-col items-center justify-center text-center no-underline text-[#A4B0BE] font-bold text-[13px] gap-2.5 bg-transparent min-h-[145px] hover:bg-white transition-colors"
                >
                  <Icono
                    name={ICONOS.huellas}
                    alt="Agregar mascota"
                    className="w-[85px] h-auto"
                    width="85"
                    height="85"
                  />
                  <span>
                    Registra otra
                    <br />
                    mascota
                  </span>
                </Link>
              </div>

              <div className="flex justify-center mt-6">
                <Link
                  to="/mis-mascotas"
                  className="text-[#61C5B8] font-bold text-sm no-underline hover:underline"
                >
                  Ver todas mis mascotas
                </Link>
              </div>
            </>
          )}
        </section>

        <section className="mb-[30px]">
          <h3 className="text-black text-base font-bold mb-[15px]">Nuestros Servicios</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[15px]">
            <Link
              to="/reserva-cuidado"
              className="bg-[#EAEFF5] rounded-[15px] py-5 px-2.5 flex flex-col items-center justify-center gap-2.5 font-bold text-lg text-[#DE7D7A] no-underline hover:scale-[1.02] transition"
            >
              <Icono
                name={ICONOS.cuidado}
                alt="Servicio de cuidado"
                className="w-20 h-20"
                width="80"
                height="80"
              />
              <p>Cuidado</p>
            </Link>

            <Link
              to="/reserva-limpieza"
              className="bg-[#EAEFF5] rounded-[15px] py-5 px-2.5 flex flex-col items-center justify-center gap-2.5 font-bold text-lg text-[#16A085] no-underline hover:scale-[1.02] transition"
            >
              <Icono
                name={ICONOS.limpieza}
                alt="Servicio de limpieza"
                className="w-20 h-20"
                width="80"
                height="80"
              />
              <p>Limpieza</p>
            </Link>

            <Link
              to="/reserva-paseos"
              className="bg-[#EAEFF5] rounded-[15px] py-5 px-2.5 flex flex-col items-center justify-center gap-2.5 font-bold text-lg text-[#5C85D6] no-underline hover:scale-[1.02] transition"
            >
              <Icono
                name={ICONOS.paseos}
                alt="Servicio de paseos"
                className="w-20 h-20"
                width="80"
                height="80"
              />
              <p>Paseos</p>
            </Link>

            <Link
              to="/reserva-consulta"
              className="bg-[#EAEFF5] rounded-[15px] py-5 px-2.5 flex flex-col items-center justify-center gap-2.5 font-bold text-lg text-[#4FB0A4] no-underline hover:scale-[1.02] transition"
            >
              <Icono
                name={ICONOS.veterinaria}
                alt="Servicio de veterinaria"
                className="w-20 h-20"
                width="80"
                height="80"
              />
              <p>Veterinaria</p>
            </Link>
          </div>
        </section>
      </main>

      {mascotaAEliminar && (
        <div className="fixed inset-0 bg-[#DCE5EF]/55 backdrop-blur-[2px] flex justify-center items-center z-[999] px-7">
          <div className="bg-[#F8F8F8] rounded-[16px] p-[26px_18px_20px] w-full max-w-[330px] text-center shadow-[0_18px_34px_rgba(105,141,211,0.20)]">
            <div className="flex items-center justify-center gap-2.5 mb-2.5">
              <Icono
                name={ICONOS.huellaDoble}
                alt="Icono huella doble"
                className="w-11 h-11"
                width="44"
                height="44"
              />
              <h3 className="text-[#9CA8B4] text-[18px] font-extrabold leading-none">
                ¿Eliminar a {mascotaAEliminar}?
              </h3>
            </div>

            <p className="text-[#A4B0BE] text-[14px] font-semibold mb-7 leading-[1.35]">
              "Esta acción es permanente.
              <br />
              Borrará todos los datos de tu mascota."
            </p>

            <div className="flex gap-4 w-full">
              <button
                type="button"
                className="flex-1 h-[50px] rounded-[14px] text-[16px] font-bold bg-[#DE7D7A] text-white border-none cursor-pointer hover:bg-[#C86C6A] transition-colors"
                onClick={() => confirmarEliminar(mascotaAEliminar)}
              >
                Sí, Eliminar
              </button>

              <button
                type="button"
                className="flex-1 h-[50px] rounded-[14px] text-[16px] font-bold bg-transparent text-[#5C85D6] border border-[#5C85D6] cursor-pointer hover:bg-[#F0F4FC] transition-colors"
                onClick={cerrarModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="bg-[#698DD3] fixed bottom-0 left-0 w-full h-[70px] rounded-t-[15px] px-2.5 z-[100]">
        <div className="h-full w-full max-w-[1200px] mx-auto flex justify-around items-center">
          <Link
            to="/inicio"
            className="flex min-w-[76px] flex-col items-center justify-center no-underline text-xs gap-1 px-[15px] py-2 rounded-xl bg-white text-[#698DD3]"
          >
            <Icono name={ICONOS.inicio} alt="Inicio" className="w-6 h-6" width="24" height="24" />
            <span>Inicio</span>
          </Link>

          <Link
            to="/servicios"
            className="flex min-w-[76px] flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl"
          >
            <Icono name={ICONOS.servicios} alt="Servicios" className="w-6 h-6" width="24" height="24" />
            <span>Servicios</span>
          </Link>

          <Link
            to="/historial"
            className="flex min-w-[76px] flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl"
          >
            <Icono name={ICONOS.historial} alt="Historial" className="w-6 h-6" width="24" height="24" />
            <span>Historial</span>
          </Link>

          <Link
            to="/perfil"
            className="flex min-w-[76px] flex-col items-center justify-center no-underline text-white text-xs gap-1 px-[15px] py-2 rounded-xl"
          >
            <Icono
              name={ICONOS.perfil}
              alt="Perfil"
              className="w-6 h-6"
              width="24"
              height="24"
              style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
            />
            <span>Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Inicio;