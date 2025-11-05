import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import AppRouter from "./application/Router.jsx";

function App() {
  const location = useLocation();

  // Ocultar NavBar global en todas las páginas del Dashboard o de eventos
  const hideNavBar =
    location.pathname.startsWith("/events") ||
    location.pathname.startsWith("/my-events") ||
    location.pathname.startsWith("/profile");

  return (
    <>
      {/* Mostrar NavBar solo si la ruta NO debe ocultarse */}
      {!hideNavBar && <NavBar />}

      <AppRouter />

      <Footer />

      <Toaster
        containerStyle={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "fixed",
          zIndex: 9999,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            minWidth: "300px",
            padding: "var(--spacing-md)",
            borderRadius: "var(--radius-md)",
          },
        }}
      />
    </>
  );
}

export default App;
