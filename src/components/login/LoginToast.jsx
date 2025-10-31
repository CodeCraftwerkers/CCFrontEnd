import toast from "react-hot-toast";

export const loginToast = {
  success: (message = "Te has identificado correctamente, ¡bienvenide!") => {
    toast.success(message, {
      duration: 4000,
      position: "top-center",
      style: {
        background: "var(--color-success)",
        color: "var(--color-white)",
        padding: "var(--spacing-md)",
        borderRadius: "var(--radius-md)",
        fontWeight: "var(--font-weight-medium)",
        fontSize: "var(--font-size-body)",
        boxShadow: "var(--shadow-lg)",
        minWidth: "300px",
      },
      iconTheme: {
        primary: "var(--color-white)",
        secondary: "var(--color-success)",
      },
    });
  },
  error: (message = "Error al iniciar sesión") => {
    toast.error(message, {
      duration: 4000,
      position: "top-center",
      style: {
        background: "var(--color-error)",
        color: "var(--color-white)",
        padding: "var(--spacing-md)",
        borderRadius: "var(--radius-md)",
        fontWeight: "var(--font-weight-medium)",
        fontSize: "var(--font-size-body)",
        boxShadow: "var(--shadow-lg)",
        minWidth: "300px",
      },
      iconTheme: {
        primary: "var(--color-white)",
        secondary: "var(--color-error)",
      },
    });
  },
  warning: (message = "Advertencia") => {
    toast(message, {
      icon: "⚠️",
      duration: 4000,
      position: "top-center",
      style: {
        background: "var(--color-warning)",
        color: "var(--color-white)",
        padding: "var(--spacing-md)",
        borderRadius: "var(--radius-md)",
        fontWeight: "var(--font-weight-medium)",
        fontSize: "var(--font-size-body)",
        boxShadow: "var(--shadow-lg)",
        minWidth: "300px",
      },
    });
  },
  info: (message = "Información") => {
    toast(message, {
      icon: "ℹ️",
      duration: 4000,
      position: "top-center",
      style: {
        background: "var(--color-info)",
        color: "var(--color-white)",
        padding: "var(--spacing-md)",
        borderRadius: "var(--radius-md)",
        fontWeight: "var(--font-weight-medium)",
        fontSize: "var(--font-size-body)",
        boxShadow: "var(--shadow-lg)",
        minWidth: "300px",
      },
    });
  },

  loading: (message = "Iniciando sesión...") => {
    return toast.loading(message, {
      position: "top-center",
      style: {
        background: "var(--color-white)",
        color: "var(--color-gray-700)",
        padding: "var(--spacing-md)",
        borderRadius: "var(--radius-md)",
        fontWeight: "var(--font-weight-medium)",
        fontSize: "var(--font-size-body)",
        boxShadow: "var(--shadow-xl)",
        minWidth: "300px",
      },
    });
  },
  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },
};
