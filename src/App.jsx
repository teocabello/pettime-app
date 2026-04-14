import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MascotaProvider } from './MascotaContext';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

import Login from './Login';
import Registro from './Registro';
import RegistroPaso2 from './RegistroPaso2';
import RegistroPaso3 from './RegistroPaso3';
import Inicio from './Inicio';
import Servicios from './Servicios';
import Historial from './Historial';
import HistorialB from './HistorialB';
import Perfil from './Perfil';
import EditarPerfil from './EditarPerfil';
import AgregarMascota from './AgregarMascota';
import MisMascotas from './MisMascotas';
import EditarMascota from './EditarMascota';
import ReservaConsulta from './ReservaConsulta';
import ReservaCuidado from './ReservaCuidado';
import ReservaExitosa from './ReservaExitosa';
import ReservaLimpieza from './ReservaLimpieza';
import ReservaPaseo from './ReservaPaseo';

function App() {
  return (
    <AuthProvider>
      <MascotaProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/registro-paso2" element={<RegistroPaso2 />} />
            <Route path="/registro-paso3" element={<RegistroPaso3 />} />

            <Route
              path="/inicio"
              element={
                <ProtectedRoute>
                  <Inicio />
                </ProtectedRoute>
              }
            />

            <Route
              path="/servicios"
              element={
                <ProtectedRoute>
                  <Servicios />
                </ProtectedRoute>
              }
            />

            <Route
              path="/historial"
              element={
                <ProtectedRoute>
                  <Historial />
                </ProtectedRoute>
              }
            />

            <Route
              path="/historialb"
              element={
                <ProtectedRoute>
                  <HistorialB />
                </ProtectedRoute>
              }
            />

            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              }
            />

            <Route
              path="/editar-perfil"
              element={
                <ProtectedRoute>
                  <EditarPerfil />
                </ProtectedRoute>
              }
            />

            <Route
              path="/agregar-mascota"
              element={
                <ProtectedRoute>
                  <AgregarMascota />
                </ProtectedRoute>
              }
            />

            <Route
              path="/mis-mascotas"
              element={
                <ProtectedRoute>
                  <MisMascotas />
                </ProtectedRoute>
              }
            />

            <Route
              path="/editar-mascota"
              element={
                <ProtectedRoute>
                  <EditarMascota />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reserva-consulta"
              element={
                <ProtectedRoute>
                  <ReservaConsulta />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reserva-cuidado"
              element={
                <ProtectedRoute>
                  <ReservaCuidado />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reserva-exitosa"
              element={
                <ProtectedRoute>
                  <ReservaExitosa />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reserva-limpieza"
              element={
                <ProtectedRoute>
                  <ReservaLimpieza />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reserva-paseos"
              element={
                <ProtectedRoute>
                  <ReservaPaseo />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </MascotaProvider>
    </AuthProvider>
  );
}

export default App;