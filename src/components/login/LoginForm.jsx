import "../../App.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { loginToast } from "./LoginToast";

const loginSchema = z.object({
  email: z.string().min(1, "El email es requerido").email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  rememberMe: z.boolean().optional(),
});

const fakeUser = { email: "demo@user.com", password: "123456" };

export const LoginForm = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data) => {
    if (data.email === fakeUser.email && data.password === fakeUser.password) {
      const fakeToken = "fake-jwt-token-123";
      const storage = data.rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", fakeToken);
      loginToast.success("Inicio de sesión exitoso (modo demo)");
      setTimeout(() => (window.location.href = "/dashboard"), 1000);
    } else {
      loginToast.error("Credenciales inválidas (modo demo)");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register("email")}
                id="email"
                type="email"
                autoComplete="email"
                className={clsx(
                  "block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition",
                  errors.email
                    ? "border-(--color-error) focus:border-(--color-error) focus:ring-(--color-error)/20"
                    : "border-gray-300 focus:border-(--color-primary-main) focus:ring-(--color-primary-main)/20"
                )}
                placeholder="tu@email.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-(--color-error)">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className={clsx(
                  "block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition",
                  errors.password
                    ? "border-(--color-error) focus:border-(--color-error) focus:ring-(--color-error)/20"
                    : "border-gray-300 focus:border-(--color-primary-main) focus:ring-(--color-primary-main)/20"
                )}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-(--color-error)">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                {...register("rememberMe")}
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-(--color-primary-main) focus:ring-(--color-primary-main) border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-700 cursor-pointer"
              >
                Recordarme
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-(--color-primary-main) hover:bg-(--color-primary-dark) transition"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Iniciar Sesión
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="font-medium text-(--color-primary-main) hover:text-(--color-primary-dark) transition"
            >
              Regístrate gratis
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
