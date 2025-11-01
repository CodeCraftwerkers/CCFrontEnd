import DashboardHeader from "../components/dashboard/DashboardHeader";
import { useState } from "react";
import { EventCard } from "../components/events/EventCard";
import { SearchBar } from "../components/events/SearchBar"; // 👈 nuevo import

export default function EventsPage() {
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const toggleJoinEvent = (id) => {
    setJoinedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const mockEvent = {
    id: 1,
    title: "Masterclass: React Avanzado",
    date: "15 Nov 2025",
    time: "18:00",
    type: "online",
    category: "Masterclass",
    attendees: 45,
    maxAttendees: 100,
    organizer: "@Factoria",
    tags: ["React", "Frontend"],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
  };

  return (
    <>
      <DashboardHeader />
      <main className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen pt-24">
        {/* ---------- SearchBar arriba ---------- */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
        />

        {/* ---------- Tarjeta de evento ---------- */}
        <EventCard
          event={mockEvent}
          isJoined={joinedEvents.includes(mockEvent.id)}
          toggleJoinEvent={toggleJoinEvent}
        />
      </main>
    </>
  );
};


