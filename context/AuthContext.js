import { createContext, useState, useEffect } from "react";
import { login, register } from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 Estado para evitar redirecciones antes de cargar el usuario
  const router = useRouter();

  // 🔹 Restaurar usuario desde localStorage al cargar la app
  // 🔹 Restaurar usuario desde localStorage en cada cambio de ruta
  useEffect(() => {
    const restoreUser = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser(decoded);
        } catch (error) {
          console.error("Token inválido, eliminando...");
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false); // 🟢 Marca que terminó de cargar
    };

    restoreUser(); // 🔹 Ejecuta al cargar la app

    // 🔹 Escuchar cambios de ruta y volver a restaurar el usuario
    router.events.on("routeChangeComplete", restoreUser);

    return () => {
      router.events.off("routeChangeComplete", restoreUser);
    };
  }, [router.events]);

  const handleLogin = async (credentials) => {
    try {
      const { data } = await login(credentials);
      localStorage.setItem("token", data.token);
      const decoded = jwtDecode(data.token);
      setUser(decoded);
      setLoading(false);
  
      // 🔹 Verifica si el usuario tiene una página anterior a la que debe volver
      const previousPage = sessionStorage.getItem("previousPage");
      if (previousPage) {
        sessionStorage.removeItem("previousPage"); // Limpia la página anterior
        router.push(previousPage);
      }
    } catch {
      throw new Error("Credenciales inválidas");
    }
  };

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      alert("User registered successfully!");
    } catch {
      alert("Error registering user");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setLoading(false);
    router.push("/"); // 🔹 Redirigir al login al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ user,loading, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
