import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

const colors = {
success: "rgb(34 197 94)",
warning:
error:
primary:
secondary:
}
export const LoginToast = {
  success: (message = "¡Bienvenida de nuevo!") => {
    toast.success(message, {
      duration: 4000,
      position: "top-right",
      style: 
    })
  }
}

/*export default function LoginToast() {
    return (
        <Toaster position = "top-right"
         toastOptions={{
        duration: 2500,
        style: {
          background: "#258d97",
          color: "#fff",
          borderRadius: "8px",
        },
        success: {
          iconTheme: {
            primary: "#fff",
            secondary: "#258d97",
          },
        },
        error: {
          style: { background: "#dc2626" },
        },
      }}
    />
  );
}
*/