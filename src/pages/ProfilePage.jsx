import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cuando haya backend:
    // fetch("/api/user/me", { headers: { Authorization: token } })
    //   .then((res) => res.json())
    //   .then(setUser);

    // Modo temporal:
    const stored =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    setUser(stored);
  }, []);

  if (!user) {
    return (
      <>
        <NavBar />
        <main className="min-h-screen flex flex-col justify-center items-center text-gray-600">
          <p className="text-lg">Cargando perfil...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-gray-100 pt-28 pb-10 flex flex-col items-center">

        <section className="bg-white w-full max-w-4xl rounded-xl shadow-md p-8 text-center">

          <div className="w-24 h-24 mx-auto bg-orange-500 flex items-center justify-center text-white font-bold text-2xl rounded-full">
            {user.initials}
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            {user.name}
          </h1>

          <p className="text-gray-600">
            {user.role}
          </p>

          <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
            <span>{user.createdEvents} eventos creados</span>
            <span>{user.joinedEvents} eventos apuntada</span>
            <span>{user.connections} conexiones</span>
          </div>

          <button className="mt-5 px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition">
            Editar perfil
          </button>
        </section>

        
        <div className="max-w-4xl w-full mt-10">
          <div className="flex gap-6 border-b pb-2 text-gray-700 font-medium">
            <button className="text-orange-600 border-b-2 border-orange-600 pb-1">
              Eventos Creados
            </button>
            <button className="hover:text-orange-600">
              Eventos Apuntada
            </button>
          </div>

         
          <div className="bg-white rounded-xl shadow-md p-6 mt-6 text-gray-400 text-center">
            Aquí aparecerán tus eventos
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
