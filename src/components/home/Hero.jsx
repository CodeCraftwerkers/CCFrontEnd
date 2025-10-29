
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

export default function Hero() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <section className="bg-linear-to-br from-orange-500 via-orange-600 to-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <header className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Conecta, Aprende y Crece<br />con la Comunidad Tech
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-orange-50 max-w-3xl mx-auto">
            Descubre masterclasses, talleres y hackatones. Únete a eventos online y presenciales con profesionales de la tecnología.
          </p>
          <button
            onClick={handleRegister}
            className="group relative inline-flex items-center space-x-2 rounded-xl bg-white px-10 py-5 
                        font-bold text-xl text-orange-600 
                        shadow-md transition-all duration-300 ease-out
                        hover:shadow-2xl hover:shadow-orange-600/50
                        hover:-translate-y-1 hover:scale-105
                        active:scale-100 active:translate-y-0
                        focus:outline-none focus:ring-4 focus:ring-orange-400/60 focus:ring-offset-2 focus:ring-offset-orange-100
                        border border-transparent hover:border-orange-200"
            aria-label="Comenzar gratis y registrarse en Code Crafters"
            >
            <span className="relative z-10">Comenzar Gratis</span>
            <ChevronRight
                size={24}
                className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-2"
                aria-hidden="true"
            />
            </button>
        </header>
      </div>
    </section>
  );
}