export default function NavBar() {
  return (
    <nav className="w-screen fixed top-0 left-0 bg-white shadow-md z-[9999]">
      <div className="flex items-center justify-between px-6 md:px-10 py-4 h-[70px]">
        <img
          src="/LogoMobile.svg"
          alt="Logo"
          className="h-8 md:h-10 object-contain"
        />
        <div className="flex items-center gap-3 md:gap-5">
          <button className="text-gray-800 text-sm md:text-base hover:text-purple-700 transition-colors">
            Iniciar sesión
          </button>
          <button className="bg-purple-700 text-white rounded-lg px-4 md:px-5 py-2 text-sm md:text-base hover:bg-purple-800 transition-colors">
            Registrarse
          </button>
        </div>
      </div>
    </nav>
  );
}
