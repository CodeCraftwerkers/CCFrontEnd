import { useState } from "react";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { SearchBar } from "../components/events/SearchBar";
import { EventCard } from "../components/events/EventCard";
import { EventsTabs } from "../components/events/EventTabs";

export default function EventsPage() {
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [activeTab, setActiveTab] = useState("created");
  const [dateFilter, setDateFilter] = useState("all");

  const toggleJoinEvent = (id) => {
    setJoinedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const mockEvents = [
    {
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
    },
    {
      id: 2,
      title: "Hackaton IA & Machine Learning",
      date: "20 Nov 2025",
      time: "09:00",
      type: "presencial",
      category: "Hackaton",
      attendees: 78,
      maxAttendees: 150,
      organizer: "@mariatech",
      tags: ["AI", "Python", "ML"],
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop",
    },
    {
      id: 3,
      title: "Taller: Spring Boot Best Practices",
      date: "22 Nov 2025",
      time: "16:00",
      type: "online",
      category: "Taller",
      attendees: 32,
      maxAttendees: 50,
      organizer: "@devmaster",
      tags: ["Java", "Spring", "Backend"],
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop",
    },
  ];

  const today = new Date();

  const filteredEvents = mockEvents.filter((event) => {
    const eventDate = new Date(event.date + " 2025");

    const matchesType =
      filterType === "all" || event.type === filterType;

    const matchesTerm =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesDate = true;
    if (dateFilter === "today") {
      matchesDate = eventDate.toDateString() === today.toDateString();
    } else if (dateFilter === "week") {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);
      matchesDate = eventDate >= startOfWeek && eventDate < endOfWeek;
    } else if (dateFilter === "month") {
      matchesDate =
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear();
    }

    return matchesType && matchesTerm && matchesDate;
  });

  return (
    <>
      <DashboardHeader />
      <main className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen pt-24">
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

        <div className="flex flex-col gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isJoined={joinedEvents.includes(event.id)}
              toggleJoinEvent={toggleJoinEvent}
            />
          ))}
        </div>
      </main>
    </>
  );
}
