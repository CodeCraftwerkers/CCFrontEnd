import { LoginForm } from "../components/login/LoginForm";
import { Toaster } from "react-hot-toast";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-login relative">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Bienvenida de nuevo, inicia sesión para continuar
      </h2>

      {/* Formulario */}
      <LoginForm />

      {/* Toaster centrado sobre el formulario */}
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
            minWidth: "320px",
            maxWidth: "400px",
            padding: "var(--spacing-md)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-lg)",
          },
        }}
      />
    </div>
  );
}
