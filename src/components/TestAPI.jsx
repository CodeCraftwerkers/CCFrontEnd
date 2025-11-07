import { useEffect } from "react";
import { getAllEvents } from "../services/ApiEvent";

export default function TestAPI() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllEvents();
        console.log("Eventos recibidos:", data);
      } catch (error) {
        console.error(" Error al consumir la API:", error);
      }
    };

    fetchData();
  }, []);

  return <p>Probando conexión con la API...</p>;
}
