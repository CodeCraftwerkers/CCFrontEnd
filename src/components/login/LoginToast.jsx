import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";


export default function LoginToast() {
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
