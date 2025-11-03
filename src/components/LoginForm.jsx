import "../App.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import axios from "axios";
import { UserToast } from "./UserToast";

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
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (data) => {
    try {
      // === MODO DEMO ===
      if (data.email === fakeUser.email && data.password === fakeUser.password) {
        const fakeToken = "fake-jwt-token-123";
        const storage = data.rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", fakeToken);
        UserToast.success("Inicio de sesión exitoso (modo demo)");
        setTimeout(() => (window.location.href = "/dashboard"), 1000);
        return;
      }

      // === CÓDIGO REAL BACKEND ===
      const toastId = UserToast.loading("Iniciando sesión...");
      const response = await axios.post("/api/auth/login", data);

      UserToast.dismiss(toastId);
      UserToast.success("Bienvenida de nuevo");

      if (response.data.token) localStorage.setItem("token", response.data.token);
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      UserToast.dismiss();
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al iniciar sesión";
      UserToast.error(message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Bienvenida de nuevo
      </h2>
      <p className="text-center text-gray-500 text-sm">
        Inicia sesión con tu correo y contraseña
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              {...register("email")}
              id="email"
              type="email"
              autoComplete="email"
              placeholder="tu@email.com"
              className={clsx(
                "block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition",
                errors.email
                  ? "border-(--color-error) focus:ring-(--color-error)/30"
                  : "border-gray-300 focus:border-(--color-primary-main) focus:ring-(--color-primary-main)/30"
              )}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-(--color-error)">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className={clsx(
                "block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition",
                errors.password
                  ? "border-(--color-error) focus:ring-(--color-error)/30"
                  : "border-gray-300 focus:border-(--color-primary-main) focus:ring-(--color-primary-main)/30"
              )}
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

        {/* Recordarme */}
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

        {/* Botón */}
        <button
          type="submit"
          className="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-md text-sm font-medium text-white bg-(--color-primary-main) hover:bg-(--color-primary-dark) transition"
        >
          <LogIn className="w-5 h-5 mr-2" /> Iniciar Sesión
        </button>

        {/* Ir a registro */}
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
  );
};
