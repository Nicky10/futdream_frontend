import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";

export default function LogoutButton() {
  const { handleLogout } = useContext(AuthContext);
  const router = useRouter();

  const handleSignOut = () => {
    handleLogout();
    router.push("/login"); // Redirigir al login al cerrar sesión
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Cerrar Sesión
    </button>
  );
}
