import LoginForm from "./LoginForm";
import LoginToast from "./LoginToast";

export default function Login() {
    return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-login">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Bienvenida de nuevo, inicia sesión para continuar
      </h2>
      <LoginForm />
      <LoginToast />
    </div>
    );
}