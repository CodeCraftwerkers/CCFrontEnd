import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:8080/api/v1";

export const getAllEvents = async () => {
  const response = await axios.get(`${BASE_URL}/events`);
  return response.data.content || response.data;
};

export const getEventById = async (id) => {
  const response = await axios.get(`${BASE_URL}/events/${id}`);
  return response.data;
};

export const getEventsByUsername = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/events/filter?username=${encodeURIComponent(username)}`);
    return response.data.content || response.data || [];
  } catch (error) {
    console.error("Error al obtener eventos por usuario:", error);
    return [];
  }
};

export const getEventsByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/events/filter?category=${category}`);
  return response.data.content || response.data;
};

export const getEventsByDateRange = async (range) => {
  const response = await axios.get(`${BASE_URL}/events/filter?timeRange=${range}`);
  return response.data.content || response.data;
};

export const getEventsByTitle = async (title) => {
  const response = await axios.get(`${BASE_URL}/events/filter?title=${encodeURIComponent(title)}`);
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

export const createEvent = async (eventData) => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.post(
      `${BASE_URL}/events`,
      eventData,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error("Error al crear el evento:", error);
    throw error.response?.data || error;
  }
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

export const signUpForEvent = async (eventId, userId) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token guardado.");
  }
  const response = await axios.post(
    `${BASE_URL}/events/${eventId}/signup/${userId}`,
    {}, 
    {
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

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
