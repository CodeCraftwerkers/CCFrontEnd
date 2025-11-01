import { useEffect, useState } from "react";
import { User, Users, Search } from "lucide-react";

export default function FeaturedEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Datos simulados de eventos
    const mockEvents = [
      {
        id: 1,
        title: "React Meetup Barcelona",
        date: "10 Nov 2025",
        description:
          "Una tarde de networking, charlas y proyectos con la comunidad React.",
      },
      {
        id: 2,
        title: "Hackathon Women in Tech",
        date: "15 Nov 2025",
        description:
          "Colabora en equipo durante 24 horas para resolver retos tecnológicos.",
      },
      {
        id: 3,
        title: "Workshop Tailwind & React",
        date: "01 Dic 2025",
        description:
          "Aprende a crear interfaces modernas y responsivas con TailwindCSS.",
      },
    ];
    setTimeout(() => setEvents(mockEvents), 800);
  }, []);

  return (
    <>
      <section
        aria-labelledby="featured-events-title"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <header className="text-center mb-12">
          <h2
            id="featured-events-title"
            className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight"
          >
            Próximos Eventos Destacados
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No te pierdas las actividades más recientes de la comunidad Code
            Crafters.
          </p>
        </header>

        {/* Tarjetas de eventos simulados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              Cargando eventos...
            </p>
          ) : (
            events.map((event) => (
              <article
                key={event.id}
                role="listitem"
                className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out p-6 border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-orange-600 mb-2">{event.date}</p>
                <p className="text-gray-600 mb-4 text-sm">
                  {event.description}
                </p>
                <button
                  type="button"
                  className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-all duration-300"
                  aria-label={`Unirse al evento ${event.title}`}
                >
                  Unirme
                </button>
              </article>
            ))
          )}
        </div>

        {/* Botón Ver todos los eventos */}
        <div className="text-center mt-16">
          <button
            onClick={() => alert("Ver todos los eventos")}
            className="px-8 py-3 border-2 border-orange-500 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 hover:shadow-md transition-all duration-300"
            aria-label="Ver todos los eventos disponibles"
          >
            Ver todos los eventos
          </button>
        </div>
      </section>
     </>
  );
}
