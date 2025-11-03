import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

// Componente visual que se renderiza una sola vez en el árbol
export function UserToastComponent() {
  return (
    <Toaster
      position="top-center"
      containerStyle={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      toastOptions={{
        duration: 4000,
        style: {
          padding: "var(--spacing-md)",
          borderRadius: "var(--radius-md)",
          fontWeight: "var(--font-weight-medium)",
          fontSize: "var(--font-size-body)",
          boxShadow: "var(--shadow-lg)",
          minWidth: "300px",
        },
      }}
    />
  );
}

// Objeto que contiene los métodos de toast para usar en cualquier componente
export const UserToast = {
  success: (message = "¡Operación exitosa!") =>
    toast.success(message, {
      style: {
        background: "var(--color-success)",
        color: "var(--color-white)",
      },
      iconTheme: {
        primary: "var(--color-white)",
        secondary: "var(--color-success)",
      },
    }),

  error: (message = "Ha ocurrido un error") =>
    toast.error(message, {
      style: {
        background: "var(--color-error)",
        color: "var(--color-white)",
      },
      iconTheme: {
        primary: "var(--color-white)",
        secondary: "var(--color-error)",
      },
    }),

  warning: (message = "Advertencia") =>
    toast(message, {
      icon: "⚠️",
      style: {
        background: "var(--color-warning)",
        color: "var(--color-white)",
      },
    }),

  info: (message = "Información") =>
    toast(message, {
      icon: "ℹ️",
      style: {
        background: "var(--color-info)",
        color: "var(--color-white)",
      },
    }),

  loading: (message = "Procesando...") =>
    toast.loading(message, {
      style: {
        background: "var(--color-white)",
        color: "var(--color-gray-700)",
        boxShadow: "var(--shadow-xl)",
      },
    }),

  dismiss: (toastId) => toast.dismiss(toastId),
};
