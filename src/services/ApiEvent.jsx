import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:8080/api/v1";

// Todos los eventos
export const getAllEvents = async () => {
  const response = await axios.get(`${BASE_URL}/events`);
  return response.data.content || response.data;
};

// Por ID
export const getEventById = async (id) => {
  const response = await axios.get(`${BASE_URL}/events/${id}`);
  return response.data;
};

// X categoría (ONLINE / PRESENCIAL)
export const getEventsByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/events/filter?category=${category}`);
  return response.data.content || response.data;
};

// x fecha (today / week / month)
export const getEventsByDateRange = async (range) => {
  const response = await axios.get(`${BASE_URL}/events/filter?timeRange=${range}`);
  return response.data.content || response.data;
};

// x Filtrar por título
export const getEventsByTitle = async (title) => {
  const response = await axios.get(`${BASE_URL}/events/filter?title=${encodeURIComponent(title)}`);
  return response.data.content || response.data;
};

// x Usuario
export const getEventsByUsername = async (username) => {
  const response = await axios.get(`${BASE_URL}/events/filter?username=${username}`);
  return response.data.content || response.data;
};

export async function getEventsCreatedByUser() {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) throw new Error("No hay token guardado.");

  const response = await fetch(`${BASE_URL}/events/created`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudieron obtener los eventos creados`);
  }

  const data = await response.json();
  return data.content || data;
};

export const getEventsUserJoined = async () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) throw new Error("No se encontró token.");
  const response = await axios.get(`${BASE_URL}/events/joined`, {
    headers: { Authorization: `Bearer ${token}`,
    "Content-Type": "application/json" },
  });
  return response.data.content || response.data;
};

export const updateEvent = async (id, eventData) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo actualizar el evento`);
  }

  return await response.json();
};

// x eliminar evento
export const deleteEvent = async (id) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) throw new Error("No se encontró token.");

  const response = await fetch(`${BASE_URL}/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo eliminar el evento`);
  }

  return true;
};
// x Apuntarse a un evento
export const signUpToEvent = async (eventId, userId) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) throw new Error("No se encontró token.");

  const response = await fetch(`${BASE_URL}/events/${eventId}/signup/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo apuntar al evento`);
  }

  return await response.json();
};

// x Desapuntarse de un evento
export const unSignFromEvent = async (eventId, userId) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) throw new Error("No se encontró token.");

  const response = await fetch(`${BASE_URL}/events/${eventId}/signup/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo desapuntar del evento`);
  }

  return await response.json();
};
