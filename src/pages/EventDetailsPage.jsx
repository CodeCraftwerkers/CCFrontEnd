import { useParams, useNavigate } from "react-router-dom";
import { CalendarDays, Users } from "lucide-react";
import mockEvents from "../data/mockEvents";
import DashboardHeader from "../components/dashboard/DashboardHeader";

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Buscar evento simulado
  const event = mockEvents.find((ev) => ev.id === parseInt(id));

  if (!event) {
    return (
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          No se encontró el evento solicitado.
        </h2>
      </main>
    );
  }

  const handleEdit = () => navigate(`/events/${id}`);
  const handleBackToEvents = () => navigate("/events");

  return (
    <>
      {/* === Header fijo del dashboard === */}
      <DashboardHeader />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 pt-20 bg-gray-100 min-h-screen">
        <section className="flex flex-col lg:flex-row gap-10">
          {/* Columna izquierda */}
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
            <p className="text-lg text-gray-600">
              Por <span className="font-semibold">@{event.creator}</span>
            </p>

            <div className="flex gap-3">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                {event.category}
              </span>
            </div>

            <div className="flex items-center gap-4 text-gray-700">
              <div className="flex items-center gap-2">
                <CalendarDays size={20} />
                <span>
                  {event.date} • {event.time}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>
                  {event.attendees}/{event.maxAttendees} asistentes
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Descripción del evento
              </h2>
              <p className="text-gray-600 whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* === Botón editar === */}
            <button
              onClick={() => navigate(`/events/${id}/edit`)}
              className="mt-4 px-6 py-3 rounded-lg bg-orange-600 text-white font-bold hover:bg-orange-700 transition"
            >
              Editar evento
            </button>
          </div>

          {/* Columna derecha: imagen */}
          <div className="flex-1">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
        </section>

        {/* === Botón Volver a mis eventos === */}
        <div className="mt-12 text-center">
          <button
            onClick={handleBackToEvents}
            className="px-8 py-3 rounded-lg border-2 border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 transition"
          >
            Volver a mis eventos
          </button>
        </div>
      </main>
    </>
  );
}
