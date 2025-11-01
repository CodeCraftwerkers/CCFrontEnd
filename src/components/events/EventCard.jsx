import { Calendar, Users } from "lucide-react";

/**
 * EventCard component
 * Muestra la información principal de un evento (imagen, fecha, tipo, tags, etc.)
 * Props:
 *  - event: objeto con los datos del evento
 *  - isJoined: booleano que indica si el usuario ya se unió (cambiaremos a toast)
 *  - toggleJoinEvent: función que añade o elimina el evento de los unidos
 */

export const EventCard = ({ event, isJoined, toggleJoinEvent }) => {
  return (
    <article
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] overflow-hidden"
      role="region"
      aria-labelledby={`event-${event.id}-title`}
    >
      {/* ---------- Imagen del evento ---------- */}
      <div className="relative">
        <img
          src={event.image}
          alt={`Imagen del evento ${event.title}`}
          className="w-full h-48 object-cover"
        />
       </div>

      {/* ---------- Contenido principal ---------- */}
      <div className="p-4">
        {/* Fecha y hora / tipo de evento*/}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <div className="flex items-center">
                <Calendar size={16} className="mr-1" aria-hidden="true" />
                <span>{event.date} • {event.time}</span>
            </div>
            <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                event.type === "online"
                    ? "bg-blue-500 text-white"
                    : "bg-green-600 text-white"
                }`}
            >
                {event.type === "online" ? "🌐 ONLINE" : "📍 PRESENCIAL"}
            </span>
        </div>

        {/* Título */}
        <h3
          id={`event-${event.id}-title`}
          className="text-lg font-semibold text-gray-900 mb-1"
        >
          {event.title}
        </h3>

        {/* Organizador */}
        <p className="text-sm text-gray-600 mb-3">Por {event.organizer}</p>

        {/* Tags */}
         <div className="flex flex-wrap gap-2 mb-3">
            {event.tags.map((tag, idx) => (
            <span
            key={idx}
            className="px-2 py-1 bg-red-400 text-black text-xs font-medium rounded-md"
            >
            {tag}
            </span>
        ))}
        </div>


        {/* Asistentes */}
        <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
          <Users size={16} className="mr-1" aria-hidden="true" />
          <span>
            {event.attendees}/{event.maxAttendees} asistentes
          </span>
        </div>

        {/* Botón de unirse */}
        <button
          onClick={() => toggleJoinEvent(event.id)}
          className={`w-full py-2.5 rounded-lg font-medium transition ${
            isJoined
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-orange-700 text-white hover:bg-orange-700" /*El color no corresponde al Figma, hay que agregarlo a config*/
          }`}
          aria-label={isJoined ? "Desapuntarse del evento" : "Unirse al evento"}
        >
          {isJoined ? "✓ Apuntado" : "Unirse al evento"} {/*Luego lo cambiamos*/}
        </button>
      </div>
    </article>
  );
};
