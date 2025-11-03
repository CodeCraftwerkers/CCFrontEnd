import { LoginForm } from "../components/LoginForm";
import { UserToastComponent } from "../components/UserToast";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <LoginForm />
      </div>
      <UserToastComponent />
    </div>
  );
}

