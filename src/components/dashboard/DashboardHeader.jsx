import { Link } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import logo from "../../assets/img/LogoGradient_NaranjaButano.png"; 

export default function DashboardHeader() {
  return (
    <header className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-[70px]">

        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Code Crafters Logo"
            className="h-10 md:h-20 object-contain"
          />
          </Link>
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="relative text-gray-700 hover:text-orange-600 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={22} />
            {/* Punto indicador de notificación */}
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 ring-white"></span>
          </button>

          {/* Avatar del usuario */}
          <div className="flex items-center justify-center h-9 w-9 rounded-full bg-linear-to-br from-orange-600 via-orange-500 to-red-500 text-white font-semibold">
            JD
          </div>

          {/* Menú hamburguesa */}
          <button
            type="button"
            aria-label="Open menu"
            className="text-gray-700 hover:text-orange-600 transition-colors"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>
    </header>
  );
}
