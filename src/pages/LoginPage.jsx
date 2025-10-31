import { LoginForm } from "../components/login/LoginForm";
import { Toaster } from "react-hot-toast";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 relative">
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

      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">
          Bienvenida de nuevo
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Inicia sesión para continuar...
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
