import { Routes, Route } from "react-router-dom";

import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import EventsPage from "../pages/EventsPage";
import UsersPage from "../pages/UsersPage";
import ProfilePage from "../pages/ProfilePage";
import EventDetailsPage from "../pages/EventDetailsPage";
import EditEventPage from "../pages/EditEventPage";
import CreateEventPage from "../pages/CreateEventPage";


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:id" element={<EventDetailsPage />} />
      <Route path="/events/edit/:id" element={<EditEventPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/events/create" element={<CreateEventPage />} />
    </Routes>
  );
}
