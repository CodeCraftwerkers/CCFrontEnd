import { Toaster } from "react-hot-toast";
import { useUser } from "./context/UserContext.jsx";
import DashboardHeader from "./components/dashboard/DashboardHeader.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import AppRouter from "./application/Router.jsx";

function App() {
  const { token } = useUser();

  return (
    <>
      {token ? <DashboardHeader /> : < NavBar />}
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
