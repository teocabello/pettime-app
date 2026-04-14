/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';

export const AuthContext = createContext(null);

const USERS_KEY = 'app_users';
const SESSION_KEY = 'app_current_user';

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(USERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error al leer usuarios desde localStorage:', error);
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error al leer la sesión desde localStorage:', error);
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error al guardar usuarios en localStorage:', error);
    }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    } catch (error) {
      console.error('Error al guardar la sesión en localStorage:', error);
    }
  }, [currentUser]);

  const register = useCallback(({ nombre, email, password, confirmPassword }) => {
    const cleanNombre = String(nombre || '').trim();
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanPassword = String(password || '').trim();
    const cleanConfirmPassword = String(confirmPassword || '').trim();

    if (!cleanNombre || !cleanEmail || !cleanPassword || !cleanConfirmPassword) {
      return {
        ok: false,
        message: 'Todos los campos son obligatorios',
      };
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(cleanEmail)) {
      return {
        ok: false,
        message: 'Correo inválido',
      };
    }

    if (cleanPassword.length < 6) {
      return {
        ok: false,
        message: 'La contraseña debe tener mínimo 6 caracteres',
      };
    }

    if (cleanPassword !== cleanConfirmPassword) {
      return {
        ok: false,
        message: 'Las contraseñas no coinciden',
      };
    }

    const existe = users.some(
      (u) => String(u.email || '').trim().toLowerCase() === cleanEmail
    );

    if (existe) {
      return {
        ok: false,
        message: 'Este correo ya está registrado',
      };
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre: cleanNombre,
      email: cleanEmail,
      password: cleanPassword,
    };

    setUsers((prev) => [...prev, nuevoUsuario]);

    return {
      ok: true,
      message: 'Registro exitoso',
      user: nuevoUsuario,
    };
  }, [users]);

  const login = useCallback(({ email, password }) => {
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanPassword = String(password || '').trim();

    if (!cleanEmail || !cleanPassword) {
      return {
        ok: false,
        message: 'Completa todos los campos',
      };
    }

    const user = users.find(
      (u) =>
        String(u.email || '').trim().toLowerCase() === cleanEmail &&
        String(u.password || '') === cleanPassword
    );

    if (!user) {
      return {
        ok: false,
        message: 'Credenciales incorrectas',
      };
    }

    setCurrentUser(user);

    return {
      ok: true,
      message: 'Inicio de sesión exitoso',
      user,
    };
  }, [users]);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const isAuthenticated = !!currentUser;

  const value = useMemo(
    () => ({
      users,
      currentUser,
      isAuthenticated,
      register,
      login,
      logout,
    }),
    [users, currentUser, isAuthenticated, register, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }

  return context;
}