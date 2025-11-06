import { Calendar, Users } from "lucide-react";

export const EventCard = ({ event, isJoined, toggleJoinEvent }) => {
  if (!event) return null;

  const formattedDate = new Date(event.startDateTime).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = new Date(event.startDateTime).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] overflow-hidden"
      role="region"
      aria-labelledby={`event-${event.id}-title`}
    >
        <div className="relative">
        <img
          src={event.imageUrl}
          alt={`Imagen del evento ${event.title}`}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" aria-hidden="true" />
            <span>
              {formattedDate} • {formattedTime}
            </span>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              event.category === "ONLINE"
                ? "bg-blue-500 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {event.category === "ONLINE" ? "ONLINE" : "PRESENCIAL"}
          </span>
        </div>

        <h3
          id={`event-${event.id}-title`}
          className="text-lg font-semibold text-gray-900 mb-1"
        >
          {event.title}
        </h3>
            
       {event.user && (
          <p className="text-sm text-gray-600 mb-3">Por {event.user.username}</p>
        )}

            {event.tags && event.tags.length > 0 && (
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
        )}
        {event.maxAttendees && (
          <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
            <div className="flex items-center">
              <Users size={16} className="mr-1" aria-hidden="true" />
              <span>
                {(event.attendees?.lengh || 0)}/{event.maxAttendees} asistentes
              </span>
            </div>
          </div>
        )}

        <button
          onClick={() => toggleJoinEvent(event.id)}
          className={`w-full py-2.5 rounded-lg font-medium transition ${
            isJoined
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-[#f54a00] text-white hover:bg-orange-700"
          }`}
          aria-label={isJoined ? "Desapuntarse del evento" : "Unirse al evento"}
        >
          {isJoined ? "✓ Apuntado" : "Unirse al evento"}
        </button>
      </div>
    </article>
  );
};
