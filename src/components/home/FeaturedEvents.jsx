import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAllEvents, signUpToEvent, getEventsUserJoined } from "../../services/ApiEvent";
import { getCurrentUser } from "../../services/ApiUser";

export default function FeaturedEvents() {
  const [events, setEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
        const joined = await getEventsUserJoined();
        setJoinedEvents(joined.map((e) => e.id));
      } catch {
        setCurrentUser(null);
      }
    };
    fetchUser();
  }, []);
  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getAllEvents();
        const sorted = [...data]
          .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime))
          .slice(0, 3);
        setEvents(sorted);
      } catch (err) {
        console.error("Error al cargar eventos destacados:", err);
        setError("No se pudieron cargar los eventos destacados");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);
  const handleJoinEvent = async (eventId) => {
    if (!currentUser) {
      toast.error("Debes iniciar sesión para unirte a un evento.");
      navigate("/login");
      return;
    }
    if (joinedEvents.includes(eventId)) {
      toast("Ya estás apuntada/o a este evento", {
        icon: "ℹ️",
        style: { border: "1px solid #f97316", padding: "10px" },
      });
      return;
    }

    try {
      await signUpToEvent(eventId, currentUser.id);
      setJoinedEvents((prev) => [...prev, eventId]);

      toast.success("¡Te has apuntado al evento con éxito!");
      navigate(`/events/${eventId}`);
    } catch (err) {
      console.error("Error al unirse al evento:", err);
      toast.error("No se pudo unir al evento. Inténtalo de nuevo.");
    }
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-gray-500">
        Cargando eventos destacados...
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-red-500">
        {error}
      </section>
    );
  }

  return (
    <section
      aria-labelledby="featured-events-title"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <header className="text-center mb-10 sm:mb-12">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <article
            key={event.id}
            className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out p-6 border border-gray-100"
          >
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {event.title}
            </h3>

            <p className="text-sm text-orange-600 mb-1">
              {new Date(event.startDateTime).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>

            <p className="text-sm font-medium text-gray-500 mb-2">
              {event.category === "ONLINE" ? "Online" : "Presencial"}
            </p>

            <p className="text-gray-600 mb-4 text-sm line-clamp-3">
              {event.description}
            </p>

            <button
              type="button"
              onClick={() => handleJoinEvent(event.id)}
              className={`px-4 py-2 w-full font-medium rounded-lg transition-all duration-300 cursor-pointer ${
                joinedEvents.includes(event.id)
                  ? "bg-gray-200 text-gray-600"
                  : "bg-orange-600 text-white hover:bg-orange-700"
              }`}
              aria-label={`Unirse al evento ${event.title}`}
            >
              {joinedEvents.includes(event.id)
                ? "Ya estás apuntada/o"
                : "Participar"}
            </button>
          </article>
        ))}
      </div>
      <div className="text-center mt-16">
        <button
          onClick={() => navigate("/events")}
          className="px-8 py-3 border-2 border-orange-500 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 hover:shadow-md transition-all duration-300 cursor-pointer"
          aria-label="Ver todos los eventos disponibles"
        >
          Ver todos los eventos
        </button>
      </div>
    </section>
  );
}
