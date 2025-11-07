
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/ApiEvent";
import { getCurrentUser } from "../services/ApiUser";
import DashboardHeader from "../components/dashboard/DashboardHeader";

export default function CreateEventPage() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "ONLINE",
        location: "",
        imageUrl: "",
        startDateTime: "",
        endDateTime: "",
        maxAttendees: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const currentUser = await getCurrentUser();

            const eventToSend = {
                ...formData, 
                userId: currentUser.id,
            };

            console.log("Enviando evento:", eventToSend);

            await createEvent(eventToSend);
            alert("Evento creado con éxito ");
            navigate("/profile");
        } catch (err) {
            console.error("Error al crear el evento:", err);
            alert("Error al crear el evento");
        }
    };

    return (
        <>
            <DashboardHeader />
            <main className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8 mt-20">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Crear nuevo evento
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Título del evento"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    >
                        <option value="ONLINE">Online</option>
                        <option value="PRESENCIAL">Presencial</option>
                    </select>
                    <input
                        type="text"
                        name="location"
                        placeholder="Ubicación o enlace"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                        type="datetime-local"
                        name="startDateTime"
                        value={formData.startDateTime}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                        type="datetime-local"
                        name="endDateTime"
                        value={formData.endDateTime}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                        type="number"
                        name="maxAttendees"
                        placeholder="Máximo de asistentes"
                        value={formData.maxAttendees}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="URL de la imagen"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition cursor-pointer"
                    >
                        Crear evento
                    </button>
                </form>
            </main>
        </>
    );
}
