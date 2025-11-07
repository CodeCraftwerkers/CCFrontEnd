import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, Users } from "lucide-react";
import ConfirmModal from "../common/ConfirmModal.jsx";
import { getCurrentUser } from "../../services/ApiUser.jsx";
import { signUpToEvent, unSignFromEvent } from "../../services/ApiEvent.jsx";

export const EventCard = ({ event }) => {
  const navigate = useNavigate()
  const [isJoined, setIsJoined] = useState(event.isJoined || false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  if (!event) return null;
  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);
  const formattedDate = new Date(event.startDateTime).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = new Date(event.startDateTime).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const handleJoinToggle = async () => {
    if (!currentUser || !currentUser.id) {
      alert("Debes iniciar sesión para participar en un evento.");
      return;
    }

      if (isJoined) {
      setShowConfirm(true);
      return;
    }

    try {
      await signUpToEvent(event.id, currentUser.id);
      setIsJoined(true);
    } catch (err) {
      console.error(err);
      alert("Error al apuntarse al evento.");
    }
  };
  const handleConfirmUnsign = async () => {
    try {
      await unSignFromEvent(event.id, currentUser.id);
      setIsJoined(false);
      setShowConfirm(false);
    } catch (err) {
      console.error(err);
      alert("Error al cancelar tu participación.");
    }
  };
    const handleViewDetails = () => {
    navigate(`/events/${event.id}`);
  };


  return (
    <article
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] overflow-hidden"
      role="region"
      aria-labelledby={`event-${event.id}-title`}
    >
      {/* Imagen */}
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
          <p className="text-sm text-gray-600 mb-2">Por {event.user.username}</p>
        )}
        {event.description && (
          <p className="text-sm text-gray-700 mb-3">
            {event.description.length > 90
              ? `${event.description.slice(0, 90)}...`
              : event.description}
          </p>
        )}
        {event.maxAttendees && (
          <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
            <div className="flex items-center">
              <Users size={16} className="mr-1" aria-hidden="true" />
              <span>
                {(event.attendees?.length || 0)}/{event.maxAttendees} asistentes
              </span>
            </div>
          </div>
        )}
        <button
          onClick={handleJoinToggle}
          className={`w-full py-2.5 rounded-lg font-medium transition ${
            isJoined
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-[#f54a00] text-white hover:bg-orange-700"
          }`}
          aria-label={isJoined ? "Cancelar participación" : "Participar"}
        >
        {isJoined ? "Cancelar participación" : "Participar"}
        </button>
          <button
            onClick={handleViewDetails}
            className="w-full py-2.5 rounded-lg font-medium border-2 border-orange-500 text-orange-600 hover:bg-orange-50 transition mt-3"
          > Ver detalles del evento
      </button>

      </div>
      {showConfirm && (
        <ConfirmModal
          message="¿Estás segura/o que no quieres participar al evento?"
          onConfirm={handleConfirmUnsign}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </article>
  );
};
