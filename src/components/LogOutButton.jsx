import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const LogoutButton = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white font-medium rounded-lg mt-5 px-6 py-2 hover:bg-red-600 transition m-2"
    >
      Cerrar sesión
    </button>
  );
};