import { useState, useEffect } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import { SearchBar } from "../components/events/SearchBar";
import { EventCard } from "../components/events/EventCard";
import { EventsTabs } from "../components/events/EventsTabs";
//import { mockEvents } from "../data/mockEvents";
//import axios from "axios";  //Para usar la API real. 
import { getAllEvents, getEventsByCategory, getEventsByDateRange, getEventsByTitle, getEventsByUsername } from "../services/ApiEvent";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [activeTab, setActiveTab] = useState("joined");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //useEffect(() => {
  // Simulación temporal de datos (futura llamada a API)
  //setEvents(mockEvents);
  // }, []);
  //Luego cambiamos esto por la búsqueda real, chicas, la pongo más abajo "comentada"



  const filteredEvents = events.filter((event) => {
   const search = searchTerm.toLowerCase();

   const matchesSearch =
     event.title.toLowerCase().includes(search) ||
     event.description.toLowerCase().includes(search) ||
     (event.tags && event.tags.some((tag) => tag.toLowerCase().includes(search)));

   const matchesType =
     filterType === "ALL" || event.category === filterType;

   const eventDate = new Date(event.startDateTime);
   const today = new Date();

   const matchesDate =
     dateFilter === "ALL" ||
     (dateFilter === "TODAY" &&
       eventDate.toDateString() === today.toDateString()) ||
     (dateFilter === "WEEK" &&
       eventDate >= today &&
       eventDate <= new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)) ||
     (dateFilter === "MONTH" &&
       eventDate.getMonth() === today.getMonth() &&
       eventDate.getFullYear() === today.getFullYear());

   return matchesSearch && matchesType && matchesDate;
}); 

  /* 
    Implementar para probar: 
  
  useEffect(() => {
    const fetchFilteredEvents = async () => {
      try {
        const BASE_URL = "http://localhost:8080/api/v1"; // Cambiar si usan otro puerto
        let endpoint = `${BASE_URL}/events/filter?`;

        // Filtrado por categoría (ONLINE / PRESENCIAL)
        if (filterType !== "ALL") {
          endpoint += `category=${filterType}`;
        }

        // Filtrado por fecha
        else if (dateFilter !== "ALL") {
          endpoint += `timeRange=${dateFilter.toLowerCase()}`;
        }

        // Filtrado por búsqueda de texto o título
        else if (searchTerm.trim() !== "") {
          endpoint += `title=${encodeURIComponent(searchTerm)}`;
        }

        const { data } = await axios.get(endpoint);
        setEvents(data);
      } catch (error) {
        console.error("Error al obtener los eventos filtrados:", error);
      }
    };

    fetchFilteredEvents();
  }, [filterType, dateFilter, searchTerm]); */

  const fetchEvents = async () => {
    setLoading(true);
    setError("");

    try {
      let data;

      if (filterType !== "ALL") {
        data = await getEventsByCategory(filterType);
      } else if (dateFilter !== "ALL") {
        data = await getEventsByDateRange(dateFilter.toLowerCase());
      } else if (searchTerm.trim() !== "") {
        data = await getEventsByTitle(searchTerm);
      } else {
        data = await getAllEvents();
      }

      const eventsArray = Array.isArray(data) ? data : data.content || [];
      console.log("Eventos carregados do backend:", eventsArray);

      setEvents(data);
    } catch (err) {
      console.error("Error al obtener los eventos:", err);
      setError("No se pudieron cargar los eventos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filterType, dateFilter, searchTerm]);



  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 bg-gray-50 min-h-screen">
      <DashboardHeader />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        visibleCount={filteredEvents.length}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
      <EventsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <section className="grid grid-cols-1 gap-8 mt-8 max-w-4xl mx-auto">       
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              toggleJoinEvent={() => { }}
              joinedEvents={[]}
            />

          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No se encontraron eventos.
          </p>
        )}
      </section>

    </main>
  );
};


