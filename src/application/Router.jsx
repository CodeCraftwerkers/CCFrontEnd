import { Routes, Route } from "react-router-dom";

import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import EventsPage from "../pages/EventsPage";
import UsersPage from "../pages/UsersPage";
import ProfilePage from "../pages/ProfilePage";
import EventDetailsPage from "../pages/EventDetailsPage";
import EditEventPage from "../pages/EditEventPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:id" element={<EventDetailsPage />} />
      <Route path="/events/:id/edit" element={<EditEventPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}
