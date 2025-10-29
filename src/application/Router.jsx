import { Routes, Route } from 'react-router-dom';

import Homepage from "../pages/Homepage";
import Login from "../components/login/Login";
import RegisterPage from "../pages/RegisterPage";
import EventsPage from "../pages/EventsPage";
import UsersPage from "../pages/UsersPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/users" element={<UsersPage />} />
    </Routes>
  );
}
