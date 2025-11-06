import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getEventById, updateEvent } from "../services/ApiEvent.jsx";
import DashboardHeader from "../components/dashboard/DashboardHeader";

export default function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEventById(id)
      .then((data) => {
        setEventData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar el evento:", err);
        setError("No se pudo cargar el evento");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent(id, eventData);
      alert("Evento actualizado con éxito");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el evento");
    }
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-gray-600 text-lg">Cargando evento...</p>
      </main>
    );
  }

  if (error || !eventData) {
    return (
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500">{error}</h2>
      </main>
    );
  }

  return (
    <>
      <DashboardHeader />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 bg-gray-100 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Editar evento
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-8 flex flex-col gap-6"
        >
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Título
            </label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Descripción
            </label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              rows="5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Categoría
              </label>
              <select
                name="category"
                value={eventData.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="ONLINE">Online</option>
                <option value="PRESENCIAL">Presencial</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Máx. asistentes
              </label>
              <input
                type="number"
                name="maxAttendees"
                value={eventData.maxAttendees}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Inicio
              </label>
              <input
                type="datetime-local"
                name="startDateTime"
                value={eventData.startDateTime?.slice(0, 16) || ""}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Fin
              </label>
              <input
                type="datetime-local"
                name="endDateTime"
                value={eventData.endDateTime?.slice(0, 16) || ""}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Ubicación o enlace
            </label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Imagen
            </label>
            <input
              type="text"
              name="imageUrl"
              value={eventData.imageUrl}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(`/events/${id}`)}
              className="px-6 py-3 rounded-lg bg-gray-300 text-gray-700 font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-orange-600 text-white font-bold hover:bg-orange-700 transition"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
