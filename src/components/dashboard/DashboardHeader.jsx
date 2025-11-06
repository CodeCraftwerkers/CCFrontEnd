import { Link } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import logo from "../../assets/img/LogoGradient_NaranjaButano.png";

export default function DashboardHeader() {
  return (
    <header className="w-full fixed top-0 left-0 bg-white shadow-lg z-9999 border-b border-gray-200">

      {/* ✅ Se quitó max-w-7xl mx-auto para que use todo el ancho */}
      <div className="flex items-center justify-between px-6 md:px-10 h-20">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Code Crafters Logo"
            className="h-10 md:h-16 object-contain"
          />
        </Link>

        <div className="flex items-center gap-5">
          <button
            type="button"
            className="relative text-gray-700 hover:text-orange-600 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={22} />
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 ring-white"></span>
          </button>

          <div className="flex items-center justify-center h-9 w-9 rounded-full bg-linear-to-br from-orange-600 via-orange-500 to-red-500 text-white font-semibold">
            JD
          </div>

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
