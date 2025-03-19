import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const { handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Nuevo estado para errores
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Limpiar errores previos
  
    try {
      await handleLogin({ email, password });
      console.log("Inicio de sesión exitoso");
      router.push("/bookings");
    } catch (error) {
      console.error("Error en login:", error.message);
      setErrorMessage(error.message); // Mostrar mensaje correcto
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-6 border rounded">
      <h2 className="text-xl font-semibold mb-4">Iniciar Sesión</h2>
      {errorMessage && <p className="text-red-600">Credenciales Incorrectas</p>} {/* Mensaje de error */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Iniciar Sesión
        </button>
      </form>
      <p className="mt-4 text-center">
        ¿No tienes cuenta?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Regístrate aquí
        </a>
      </p>
    </div>
  );
}
