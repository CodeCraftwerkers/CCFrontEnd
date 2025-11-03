import { LoginForm } from "../components/login/LoginForm";
import { Toaster } from "react-hot-toast";

export default function Login() {
  return (
    <div className="flex justify-center min-h-screen relative"
         style={{ paddingTop: "var(--spacing-3xl)", 
                  paddingBottom: "var(--spacing-2xl)" }}>
      
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

      <div>
        
        <LoginForm />
      </div>
    </div>
  );
}
