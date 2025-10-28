import NavBar from "../components/NavBar.jsx";

export default function EventsPage() {
  return (
    <>
      <NavBar />
      <section className="p-8 text-center bg-purple-100">
        <h1 className="text-2xl font-bold text-gray-800">
          Eventos y Talleres
        </h1>
        <p className="mt-2 text-gray-600">
          Aquí podrás descubrir los próximos eventos tech 
        </p>
      </section>
    </>
  );
}
