import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  return children;
}
