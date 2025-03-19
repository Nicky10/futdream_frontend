import { createContext, useState, useEffect } from "react";
import { login, register } from "../services/api";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials);
      
      // Asegurar que la respuesta es correcta y tiene un token
      if (response?.data?.token) {
        console.log("Respuesta del backend:", response.data);
        localStorage.setItem("token", response.data.token);
        const decoded = jwtDecode(response.data.token);
        setUser(decoded);
        console.log("Inicio de sesión exitoso");
      } else {
        throw new Error(response?.data?.error || "Credenciales inválidas");
      }
  
    } catch (error) {
      console.error("Error en el login:", error.message);
      setUser(null); // Asegurar que no se almacene un usuario inválido
      throw new Error(error.message);
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
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
