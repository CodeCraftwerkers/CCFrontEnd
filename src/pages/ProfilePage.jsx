import { LogoutButton } from "../components/LogOutButton.jsx";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/ApiUser.jsx";
import { getAllEvents, getEventsCreatedByUser, getEventsUserJoined } from "../services/ApiEvent.jsx";
import EditProfileModal from "../components/dashboard/EditProfileModal.jsx";
import ChangePasswordModal from "../components/dashboard/ChangePasswordModal.jsx";
import { EventsTabs } from "../components/events/EventsTabs.jsx";
import { useNavigate } from "react-router-dom";


export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [error, setError] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    if (parts.length === 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts
      .slice(0, 3)
      .map((p) => p[0].toUpperCase())
      .join("");
  };

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUser(data);
        return Promise.all([
          getAllEvents(),
          getEventsCreatedByUser(),
          getEventsUserJoined(),
        ]);
      })
      .then(([all, created, joined]) => {
        setAllEvents(all.content || all);
        setCreatedEvents(created.content || created);
        setJoinedEvents(joined.content || joined);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center text-gray-600">
        <p className="text-lg mb-3">Error al cargar el perfil:</p>
        <p className="text-red-500">{error}</p>
        <a
          href="/login"
          className="mt-4 text-orange-600 underline hover:text-orange-700"
        >
          Inicia sesión de nuevo
        </a>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center text-gray-600">
        <p className="text-lg">Cargando perfil...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 pt-28 pb-10 flex flex-col items-center">
      <section className="bg-white w-full max-w-4xl rounded-xl shadow-md p-8 text-center">
        <div className="w-24 h-24 mx-auto bg-linear-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-extrabold text-3xl rounded-full shadow-md">
          {getInitials(user.username || user.name || "U")}
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          {user.username}
        </h1>
        <p className="text-gray-600">{user.email}</p>

        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
          <span>{createdEvents.length} eventos creados por ti</span>
          <span>{joinedEvents.length} eventos en los que participas</span>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row justify-center items-center gap-3">
          <button
            onClick={() => setShowEdit(true)}
            className="px-6 py-2 h-11 bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition cursor-pointer"
          >
            Editar perfil
          </button>

          <button
            onClick={() => setShowChangePassword(true)}
            className="px-6 py-2 h-11 bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition cursor-pointer"
          >
            Cambiar contraseña
          </button>

          <button
            onClick={() => navigate("/events/create")}
            className="px-6 py-2 h-11 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition cursor-pointer"
          >
            Crear evento
          </button>

          <div className="h-11 flex items-center">
            <LogoutButton />
          </div>
        </div>
      </section>

      {showEdit && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEdit(false)}
          onSuccess={(updated) => setUser(updated)}
        />
      )}

      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}
      <div className="max-w-4xl w-full mt-10">
        <EventsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "all" && (
          <div className="bg-white rounded-xl shadow-md p-6 mt-6 text-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Todos los eventos
            </h2>
            {allEvents.length > 0 ? (
              <ul className="space-y-4 text-left">
                {allEvents.map((ev) => (
                  <li key={ev.id} className="border-b pb-4 last:border-none">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                          {ev.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          📅{" "}
                          {new Date(ev.startDateTime).toLocaleDateString("es-ES")}{" "}
                          {ev.category === "ONLINE"
                            ? "🌐 Online"
                            : "📍 Presencial"}
                        </p>
                        <p className="text-gray-700 mb-2">
                          {ev.description?.length > 120
                            ? ev.description.slice(0, 120) + "..."
                            : ev.description || "Sin descripción"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Organizado por:{" "}
                          <span className="font-medium">
                            {ev.user?.username || "Desconocido"}
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => (window.location.href = `/events/${ev.id}`)}
                        className="mt-3 sm:mt-0 px-5 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition cursor-pointer"
                      >
                        Ver evento
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No hay eventos disponibles.</p>
            )}
          </div>
        )}
        {activeTab === "created" && (
          <div className="bg-white rounded-xl shadow-md p-6 mt-6 text-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Eventos creados por ti
            </h2>
            {createdEvents.length > 0 ? (
              <ul className="space-y-4 text-left">
                {createdEvents.map((ev) => (
                  <li key={ev.id} className="border-b pb-4 last:border-none">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                          {ev.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          📅{" "}
                          {new Date(ev.startDateTime).toLocaleDateString("es-ES")}{" "}
                          {ev.category === "ONLINE"
                            ? "🌐 Online"
                            : "📍 Presencial"}
                        </p>
                        <p className="text-gray-700 mb-2">
                          {ev.description?.length > 120
                            ? ev.description.slice(0, 120) + "..."
                            : ev.description || "Sin descripción"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Ubicación:{" "}
                          <span className="font-medium">{ev.location}</span>
                        </p>
                      </div>
                      <div className="flex gap-3 mt-3 sm:mt-0">
                        <button
                          onClick={() =>
                            (window.location.href = `/events/edit/${ev.id}`)
                          }
                          className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition cursor-pointer"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() =>
                            (window.location.href = `/events/${ev.id}`)
                          }
                          className="px-5 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition cursor-pointer"
                        >
                          Ver evento
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Aún no has creado eventos.</p>
            )}
          </div>
        )}
        {activeTab === "joined" && (
          <div className="bg-white rounded-xl shadow-md p-6 mt-6 text-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Eventos a los que estás apuntado/a
            </h2>
            {joinedEvents.length > 0 ? (
              <ul className="space-y-4 text-left">
                {joinedEvents.map((ev) => (
                  <li key={ev.id} className="border-b pb-4 last:border-none">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <strong className="text-lg text-gray-800">
                          {ev.title}
                        </strong>
                        <p className="text-sm text-gray-500 mb-2">
                          📅{" "}
                          {new Date(ev.startDateTime).toLocaleDateString("es-ES")}
                        </p>
                      </div>

                      <button
                        onClick={() => (window.location.href = `/events/${ev.id}`)}
                        className="mt-3 sm:mt-0 px-5 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition cursor-pointer"
                      >
                        Ver evento
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                Aún no estás apuntada a eventos.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
