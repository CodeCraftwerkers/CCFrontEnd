import { useNavigate } from "react-router-dom";
import { UserPlus, CalendarDays, Users } from "lucide-react";

export default function CTASection() {
  const navigate = useNavigate();

  const handleRegister = () => navigate("/login");

  return (
    <section
      aria-labelledby="cta-section-title"
      className="bg-linear-to-br from-orange-50 via-white to-orange-100 py-20 border-t border-orange-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2
            id="cta-section-title"
            className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight"
          >
            ¡Únete a la comunidad Code Crafters!
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Aprende, colabora y comparte en nuestros eventos presenciales y
            online. Empieza en solo tres pasos:
          </p>
        </header>
        <ol
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16"
          aria-label="Pasos para comenzar a participar en Code Crafters"
        >
          <li className="text-center">
            <div
              className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-5"
              aria-hidden="true"
            >
              <UserPlus size={32} className="text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              1. Crea tu cuenta
            </h3>
            <p className="text-gray-600 text-sm">
              Regístrate gratis y completa tu perfil en minutos.
            </p>
          </li>

          <li className="text-center">
            <div
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5"
              aria-hidden="true"
            >
              <CalendarDays size={32} className="text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              2. Explora eventos
            </h3>
            <p className="text-gray-600 text-sm">
              Descubre talleres, hackatones y charlas creadas por la comunidad.
            </p>
          </li>

          <li className="text-center">
            <div
              className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-5"
              aria-hidden="true"
            >
              <Users size={32} className="text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              3. Únete y participa
            </h3>
            <p className="text-gray-600 text-sm">
              Conéctate con otros developers, comparte conocimiento y crece con
              la comunidad.
            </p>
          </li>
        </ol>
        <div className="text-center">
          <button
            onClick={handleRegister}
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-8 py-4 font-semibold text-lg text-white shadow-lg transition-all duration-300 ease-out
                       hover:bg-orange-700 hover:shadow-2xl hover:-translate-y-1
                       active:scale-95 active:shadow-md
                       focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2"
            aria-label="Crear una cuenta y unirse a Code Crafters"
          >
            <span>Comenzar ahora</span>
            <UserPlus
              size={22}
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
