import React from 'react';
// Importamos las herramientas de viaje
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { MascotaProvider } from './MascotaContext';

// Importamos nuestras dos pantallas
import Login from './Login';
import Registro from './Registro';
import RegistroPaso2 from './RegistroPaso2';
import RegistroPaso3 from './RegistroPaso3';
import Inicio from './Inicio';
import MisMascotas from './MisMascotas';
import AgregarMascota from './AgregarMascota'; 
import EditarMascota from './EditarMascota';
import Servicios from './Servicios';
import ReservaCuidado from './ReservaCuidado';
import ReservaExitosa from './ReservaExitosa';
import ReservaLimpieza from './ReservaLimpieza';
import ReservaPaseos from './ReservaPaseo';
import ReservaConsulta from './ReservaConsulta';
import Perfil from './Perfil';
import EditarPerfil from './EditarPerfil';
import Historial from './Historial';
import HistorialB from './HistorialB';


function App() {
  return (
    // BrowserRouter es el contenedor que activa el "viaje"
    <MascotaProvider>
    <BrowserRouter>
      <Routes>
        {/* Aquí definimos nuestras rutas: */}
        {/* Si la ruta es solo "/", mostramos el Login */}
        <Route path="/" element={<Login />} />
        
        {/* Si la ruta es "/registro", mostramos el Registro */}
        <Route path="/registro" element={<Registro />} />
        <Route path="/registro-paso2" element={<RegistroPaso2 />} />
        <Route path="/registro-paso3" element={<RegistroPaso3 />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/mis-mascotas" element={<MisMascotas />} />
        <Route path="/agregar-mascota" element={<AgregarMascota />} />
        <Route path="/editar-mascota" element={<EditarMascota />} />
        <Route path="/servicios" element={<Servicios />} /> 
        <Route path="/reserva-cuidado" element={<ReservaCuidado />} />
        <Route path="/reserva-exitosa" element={<ReservaExitosa />} />
        <Route path="/reserva-limpieza" element={<ReservaLimpieza />} />
        <Route path="/reserva-paseos" element={<ReservaPaseos />} />
        <Route path="/reserva-consulta" element={<ReservaConsulta />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/historialb" element={<HistorialB />} />



      </Routes>
    </BrowserRouter>
    </MascotaProvider>
  );
}

export default App;
