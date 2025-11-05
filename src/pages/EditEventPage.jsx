import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import mockEvents from "../data/mockEvents";
import DashboardHeader from "../components/dashboard/DashboardHeader";

export default function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const eventToEdit = mockEvents.find((ev) => ev.id === parseInt(id));

  const [eventData, setEventData] = useState(eventToEdit || {});

  useEffect(() => {
    if (!eventToEdit) {
      console.warn("Evento no encontrado en mockEvents");
    }
  }, [eventToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos actualizados (solo FrontEnd):", eventData);
    navigate(`/events/${id}`);
  };

  if (!eventToEdit) {
    return (
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          No se encontró el evento a editar.
        </h2>
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
                Fecha
              </label>
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Hora
              </label>
              <input
                type="time"
                name="time"
                value={eventData.time}
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
