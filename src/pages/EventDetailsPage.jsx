import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CalendarDays, Users } from "lucide-react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import ConfirmModal from "../components/common/ConfirmModal.jsx";
import { getEventById, signUpToEvent, unSignFromEvent } from "../services/ApiEvent";
import { getCurrentUser } from "../services/ApiUser";
import toast from "react-hot-toast";

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventData, userData] = await Promise.all([
          getEventById(id),
          getCurrentUser(),
        ]);
        setEvent(eventData);
        setCurrentUser(userData);
        const alreadyJoined = eventData.attendees?.some(
          (att) => att.id === userData.id
        );
        setIsJoined(alreadyJoined);
      } catch (err) {
        console.error("Error al cargar evento:", err);
        setError("No se pudo cargar la información del evento.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  const handleBackToProfile = () => navigate("/profile");

  const handleJoinToggle = async () => {
    if (!currentUser || !currentUser.id) {
      alert("Debes iniciar sesión para participar en el evento.");
      return;
    }

    if (isJoined) {
      setShowConfirm(true);
      return;
    }

    try {
      await signUpToEvent(event.id, currentUser.id);
      setIsJoined(true);
      toast.success("Te has apuntado al evento con éxito!");

    } catch (err) {
      console.error(err);
      toast.error("Error al apuntarse al evento.");

    }
  };

  const handleConfirmUnsign = async () => {
    try {
      await unSignFromEvent(event.id, currentUser.id);
      setIsJoined(false);
      setShowConfirm(false);
      toast("Has cancelado tu participación en el evento.", {
        icon: "🚫",
        style: {
          border: "1px solid #f97316",
          padding: "12px",
          color: "#333",
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Error al cancelar la participación.");
    }
  };

  if (loading) {
    return (
      <main className="flex flex-col justify-center items-center min-h-screen text-gray-600">
        <p className="text-lg">Cargando evento...</p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="flex flex-col justify-center items-center min-h-screen text-gray-600">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
        <p>{error || "No se encontró el evento solicitado."}</p>
        <button
          onClick={handleBackToProfile}
          className="mt-4 px-6 py-3 rounded-lg border-2 border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 transition"
        >
          Volver al perfil
        </button>
      </main>
    );
  }
  const formattedDate = new Date(event.startDateTime).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedTime = new Date(event.startDateTime).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isCreator = currentUser && event.user && currentUser.username === event.user.username;
  return (
    <>
      <DashboardHeader />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 pt-20 bg-gray-100 min-h-screen">
        <section className="flex flex-col lg:flex-row gap-10">

          <div className="flex-1 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
            <p className="text-lg text-gray-600">
              Organizado por{" "}
              <span className="font-semibold text-orange-600">
                @{event.user?.username || "Desconocido"}
              </span>
            </p>

            <div className="flex gap-3">
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  event.category === "ONLINE"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {event.category}
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
              <div className="flex items-center gap-2">
                <CalendarDays size={20} />
                <span>
                  {formattedDate} • {formattedTime}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>
                  {(event.attendees?.length || 0)}/{event.maxAttendees} asistentes
                </span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Descripción del evento
              </h2>
              <p className="text-gray-600 whitespace-pre-line">
                {event.description || "Sin descripción disponible."}
              </p>
            </div>
             <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {!isCreator && (
                <button
                  onClick={handleJoinToggle}
                  className={`px-6 py-3 rounded-lg font-bold transition ${
                    isJoined
                      ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      : "bg-orange-600 text-white hover:bg-orange-700"
                  }`}
                >
                  {isJoined ? "Cancelar participación" : "Apuntarme al evento"}
                </button>
              )}

              {isCreator && (
                <button
                  onClick={() => navigate(`/events/edit/${id}`)}
                  className="px-6 py-3 rounded-lg bg-orange-600 text-white font-bold hover:bg-orange-700 transition"
                >
                  Editar evento
                </button>
              )}

              <button
                onClick={handleBackToProfile}
                className="px-6 py-3 rounded-lg border-2 border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 transition"
              >
                Volver a mis eventos
              </button>
            </div>
          </div>
          <div className="flex-1">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
        </section>

        {showConfirm && (
          <ConfirmModal
            message="¿Estás segura/o que no quieres participar?"
            onConfirm={handleConfirmUnsign}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </main>
    </>
  );
}
