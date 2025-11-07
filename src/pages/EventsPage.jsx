import { useState, useEffect, useRef } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import { SearchBar } from "../components/events/SearchBar";
import { EventCard } from "../components/events/EventCard";
import { EventsTabs } from "../components/events/EventsTabs";
import {
  getAllEvents,
  getEventsByCategory,
  getEventsByDateRange,
  getEventsByTitle,
  getEventsByUsername,
} from "../services/ApiEvent";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [activeTab, setActiveTab] = useState("joined");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchTimeout = useRef(null);
  const filteredEvents = events.filter((event) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      event.title.toLowerCase().includes(search) ||
      event.description.toLowerCase().includes(search) ||
      (event.user?.username &&
        event.user.username.toLowerCase().includes(search)) ||
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
        eventDate <= new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 7
        )) ||
      (dateFilter === "MONTH" &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear());

    return matchesSearch && matchesType && matchesDate;
  });
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

        const isEmpty =
          !data ||
          (Array.isArray(data) && data.length === 0) ||
          (data.content && data.content.length === 0);
        if (isEmpty) {
          console.log("Buscando por usuario:", searchTerm);
          data = await getEventsByUsername(searchTerm);
        }
      } else {
        data = await getAllEvents();
      }

      const eventsArray = Array.isArray(data)
        ? data
        : data.content || [];

      console.log("Eventos cargados del backend:", eventsArray);
      setEvents(eventsArray);
    } catch (err) {
      console.error("Error al obtener los eventos:", err);
      setError("No se pudieron cargar los eventos");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      fetchEvents();
    }, 1000);
    return () => clearTimeout(searchTimeout.current);
  }, [filterType, dateFilter, searchTerm]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      clearTimeout(searchTimeout.current);
      fetchEvents();
    }
  };
  const isLoggedIn = false;
  return (
    <>
      {isLoggedIn && <DashboardHeader />}

      <main
        className={`px-4 sm:px-6 lg:px-8 ${
          isLoggedIn ? "pt-28" : "pt-24"
        } pb-16 bg-gray-50 min-h-screen`}
      >
        <div className="max-w-6xl mx-auto">
          <div onKeyDown={handleKeyDown}>
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterType={filterType}
              setFilterType={setFilterType}
              visibleCount={filteredEvents.length}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
            />
          </div>
          {isLoggedIn && (
            <EventsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
          <section className="grid grid-cols-1 gap-8 mt-8 max-w-4xl mx-auto">
            {loading ? (
              <p className="text-center text-gray-500">Cargando eventos...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No se encontraron eventos.
              </p>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
