import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); // 🔹 Redirige solo si el usuario NO está logueado
    }
  }, [user, loading, router]);

  if (loading) return null; // 🔹 No renderizar nada mientras carga

  return user ? children : null;
}
