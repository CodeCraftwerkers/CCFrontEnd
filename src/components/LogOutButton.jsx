import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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