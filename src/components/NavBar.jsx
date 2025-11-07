import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="w-screen fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-6 md:px-10 py-4 h-[70px]">
        <Link
          to="/"
          className="flex items-center justify-between px-6 md:px-10 py-4 h-[70px]"
        >
          <img
            src="/src/assets/img/LogoGradient_NaranjaButano.png"
            alt="Code Crafters Logo"
            className="h-10 md:h-20 object-contain"
          />
        </Link>
        <div className="flex items-center gap-3 md:gap-5">
          <Link to="/login">
            <button className="text-gray-800 text-sm md:text-base hover:text-(--color-primary-main) transition-colors">
              Iniciar sesión
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-linear-to-br from-orange-700 via-orange-600 to-red-600 hover:bg-red-600 text-white text-sm md:text-base font-semibold py-2 px-4 rounded-lg shadow-md transition-all">
              Regístrate
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
