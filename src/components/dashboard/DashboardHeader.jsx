import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import logo from "../../assets/img/LogoGradient_NaranjaButano.png";
import { useUser } from "../../context/UserContext";
import { getCurrentUser } from "../../services/ApiUser";

export default function DashboardHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch((err) => console.error("Error al obtener el usuario:", err));
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const initials = getInitials(user?.username);

  return (
    <header className="w-full fixed top-0 left-0 bg-white shadow-lg z-50 border-b border-gray-200">
      <div className="flex items-center justify-between px-6 md:px-10 h-20">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Code Crafters Logo"
            className="h-10 md:h-16 object-contain"
          />
        </Link>

        <div className="flex items-center gap-5 relative">
          <button
            type="button"
            onClick={() => navigate("/events")}
            className="relative text-gray-700 hover:text-orange-600 transition-colors"
            aria-label="Ir a eventos"
          >
            <Bell size={22} />
          </button>

          <div
            className="flex items-center justify-center h-9 w-9 rounded-full bg-linear-to-br from-orange-600 via-orange-500 to-red-500 text-white font-semibold cursor-pointer"
            title={user?.username || "Usuario"}
            onClick={() => navigate("/profile")}
          >
            {initials}
          </div>

          <button
            type="button"
            aria-label="Open menu"
            className="text-gray-700 hover:text-orange-600 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-40">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
