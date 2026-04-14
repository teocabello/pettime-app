import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Creamos el contexto global de mascotas
const MascotaContext = createContext();

// Provider: contiene el estado global y las funciones para modificarlo
export function MascotaProvider({ children }) {
  const [mascotas, setMascotas] = useState(() => {
    try {
      const guardadas = localStorage.getItem('pettime_mascotas');
      return guardadas ? JSON.parse(guardadas) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('pettime_mascotas', JSON.stringify(mascotas));
  }, [mascotas]);

  // useCallback evita que estas funciones se recreen en cada render
  const agregarMascota = useCallback((mascota) => {
    setMascotas(prev => {
      if (prev.find(m => m.id === mascota.id)) return prev;
      return [...prev, mascota];
    });
  }, []);

  const eliminarMascota = useCallback((nombre) => {
    setMascotas(prev => prev.filter(m => m.nombre !== nombre));
  }, []);

  const actualizarMascota = useCallback((id, cambios) => {
    setMascotas(prev => prev.map(m => (m.id === id ? { ...m, ...cambios } : m)));
  }, []);

  return (
    <MascotaContext.Provider value={{ mascotas, agregarMascota, eliminarMascota, actualizarMascota }}>
      {children}
    </MascotaContext.Provider>
  );
}

// Hook personalizado para consumir el contexto fácilmente
export function useMascota() {
  return useContext(MascotaContext);
}
