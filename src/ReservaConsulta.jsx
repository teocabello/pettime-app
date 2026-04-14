import React, { forwardRef, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import { isWeekend } from "date-fns";
import Icono from "./Icono";

registerLocale("es", es);

const InputFechaReserva = forwardRef(({ value, onClick, placeholder }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className="h-[78px] w-full bg-white rounded-[18px] border-none px-6 flex items-center gap-4 text-left shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
  >
    <Icono name="iconcalendario" alt="fecha" className="w-7 h-7 opacity-70" />
    <span className={`text-[16px] leading-[22px] font-semibold ${value ? "text-[#555]" : "text-[#A0A0A0]"}`}>
      {value || placeholder}
    </span>
  </button>
));

InputFechaReserva.displayName = "InputFechaReserva";

function ReservaConsulta() {
  const [turno, setTurno] = useState("manana");
  const [hora, setHora] = useState("08:00");
  const [fechaConsulta, setFechaConsulta] = useState(null);

  const feriadosFijos = useMemo(
    () => new Set(["01-01", "05-01", "06-29", "07-28", "07-29", "08-30", "10-08", "11-01", "12-08", "12-25"]),
    []
  );

  const estaBloqueada = (date) => {
    if (!date) return true;
    if (isWeekend(date)) return true;
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate()).padStart(2, "0");
    return feriadosFijos.has(`${mes}-${dia}`);
  };

  const horariosPorTurno = {
    manana: [
      { hora: "07:00", disabled: true },
      { hora: "08:00", disabled: false },
      { hora: "09:00", disabled: false },
      { hora: "10:00", disabled: false },
      { hora: "11:00", disabled: true },
      { hora: "12:00", disabled: false },
    ],
    tarde: [
      { hora: "14:00", disabled: false },
      { hora: "16:00", disabled: false },
      { hora: "18:00", disabled: false },
    ],
    noche: [
      { hora: "19:00", disabled: false },
      { hora: "20:00", disabled: false },
    ],
  };

  const turnos = ["manana", "tarde", "noche"];
  const setTurnoYHora = (t) => {
    setTurno(t);
    const primeraDisponible = (horariosPorTurno[t] || []).find((item) => !item.disabled)?.hora || null;
    setHora(primeraDisponible);
  };

  return (
    <div className="bg-[#F2F7FD] min-h-screen pb-10">
      <header className="bg-[#61C5B8] fixed top-0 left-0 w-full h-[60px] flex items-center justify-between px-5 z-[100] rounded-b-[15px]">
        <h1 className="text-xl font-extrabold m-0">
          <span className="text-[#DE7D7A]">Pet</span> <span className="text-white">Time</span>
        </h1>
        <Link to="/servicios" className="text-white w-6 h-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
        </Link>
      </header>

      <main className="px-5 max-w-[500px] mx-auto pt-[88px]">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/inicio" className="w-7 h-7 flex items-center justify-center" aria-label="Volver a inicio">
            <Icono name="iconflechaderecha" alt="volver" className="w-3 h-5 rotate-180" />
          </Link>
          <h2 className="m-0 text-black text-[16px] leading-[22px] font-bold">Reserva de Consulta veterinaria</h2>
        </div>

        <div className="flex flex-col gap-4">
          <button type="button" className="h-[78px] bg-white rounded-[18px] border-none px-6 flex items-center gap-4 text-left shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <Icono name="iconusuario" alt="mascota" className="w-7 h-7 opacity-70" />
            <span className="text-[16px] leading-[22px] text-[#A0A0A0] font-semibold">Selecciona una mascota</span>
            <svg className="w-7 h-7 text-[#A0A0A0] ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <button type="button" className="h-[78px] bg-white rounded-[18px] border-none px-6 flex items-center gap-4 text-left shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <Icono name="iconusuario" alt="tipo consulta" className="w-7 h-7 opacity-70" />
            <span className="text-[16px] leading-[22px] text-[#A0A0A0] font-semibold">Tipo de consulta</span>
            <svg className="w-7 h-7 text-[#A0A0A0] ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <DatePicker
            selected={fechaConsulta}
            onChange={(date) => setFechaConsulta(date)}
            locale="es"
            dateFormat="dd/MM/yyyy"
            placeholderText="Fecha de consulta"
            filterDate={(date) => !estaBloqueada(date)}
            minDate={new Date()}
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            yearDropdownItemNumber={2}
            customInput={<InputFechaReserva />}
            popperPlacement="bottom-start"
            popperProps={{ strategy: "fixed" }}
            showPopperArrow={false}
          />

          <div className="pt-1">
            <p className="m-0 mb-3 text-[16px] leading-[22px] text-[#9A9A9A] font-semibold">Selecciona un horario disponible</p>

            <div className="bg-[#E8ECF2] rounded-[12px] h-[52px] p-[2px] flex items-stretch">
              {turnos.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTurnoYHora(t)}
                  className={`flex-1 rounded-[10px] flex items-center justify-center gap-1.5 text-[16px] leading-[22px] font-bold transition-colors ${
                    turno === t ? "bg-[#5BC4BE] text-white" : "bg-transparent text-[#5BC4BE]"
                  }`}
                >
                  <Icono
                    name={t === "manana" ? "iconsoles" : t === "tarde" ? "icontarde" : "iconnoche"}
                    alt={t}
                    className="w-5 h-5"
                    style={turno === t ? { filter: "brightness(0) saturate(100%) invert(100%)" } : {}}
                  />
                  {t === "manana" ? "Mañana" : t === "tarde" ? "Tarde" : "Noche"}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-3">
              {(horariosPorTurno[turno] || []).map(({ hora: h, disabled }) => (
                <button
                  type="button"
                  key={h}
                  onClick={() => !disabled && setHora(h)}
                  disabled={disabled}
                  className={`h-[34px] rounded-[14px] border-[3px] text-[16px] leading-[22px] font-bold transition-colors ${
                    disabled
                      ? "bg-transparent border-[#9A9A9A] text-[#9A9A9A]"
                      : hora === h
                        ? "bg-[#5BC4BE] border-[#5BC4BE] text-white"
                        : "bg-transparent border-[#5BC4BE] text-[#5BC4BE]"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[78px] bg-white rounded-[18px] px-6 flex items-center gap-4 mt-2 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <Icono
              name="iconsoles"
              alt="monto"
              className="w-8 h-8"
              style={{ filter: "brightness(0) saturate(100%) invert(46%) sepia(58%) saturate(682%) hue-rotate(192deg) brightness(94%) contrast(89%)" }}
            />
            <span className="text-[16px] leading-[22px] text-[#5C85D6] font-bold">Monto (automático)</span>
          </div>
        </div>

        <Link
          to="/reserva-exitosa"
          className="bg-[#61C5B8] hover:bg-[#4FB0A4] text-white rounded-[18px] h-[78px] text-[16px] leading-[22px] font-bold flex items-center justify-center no-underline transition-colors mt-8 w-full"
        >
          Confirmar reserva
        </Link>
      </main>
    </div>
  );
}

export default ReservaConsulta;

