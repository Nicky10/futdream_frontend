import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const { handleRegister, handleLogin} = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    firstLastName: "",
    secondLastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errorMessage, setErrorMessage] = useState(""); // 🔹 Estado para errores

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 🔹 Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    setErrorMessage(""); // 🔹 Limpiar errores anteriores

    try {
      await handleRegister({ ...formData, role: "CLIENT" });

      // 🔹 Iniciar sesión automáticamente después del registro
      await handleLogin({ email: formData.email, password: formData.password });

      router.push("/"); // 🔹 Redirige al inicio después del login
    } catch (error) {
      console.error("Error en el registro:", error);
      setErrorMessage("Error al registrar el usuario.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Regístrate
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Primer Nombre</label>
              <input
                type="text"
                name="firstName"
                placeholder="Juan"
                onChange={handleChange}
                required
                className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Segundo Nombre</label>
              <input
                type="text"
                name="secondName"
                placeholder="Carlos"
                onChange={handleChange}
                className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Primer Apellido</label>
              <input
                type="text"
                name="firstLastName"
                placeholder="Gómez"
                onChange={handleChange}
                required
                className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Segundo Apellido</label>
              <input
                type="text"
                name="secondLastName"
                placeholder="Pérez"
                onChange={handleChange}
                className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Teléfono</label>
            <input
              type="tel"
              name="phone"
              placeholder="+123 456 7890"
              onChange={handleChange}
              required
              className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="ejemplo@email.com"
              onChange={handleChange}
              required
              className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              required
              className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-indigo-600"
            />
          </div>

          {/* 🔹 Confirmar Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              onChange={handleChange}
              required
              className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-indigo-600"
            />
          </div>

          {/* 🔹 Mostrar mensaje de error si las contraseñas no coinciden */}
          {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-white shadow-md hover:bg-indigo-500"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
}
