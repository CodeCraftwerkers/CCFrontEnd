import "../App.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import axios from "axios";
import { UserToast } from "./UserToast";

const loginSchema = z.object({
  email: z.string().min(1, "El email es requerido").email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  rememberMe: z.boolean().optional(),
});


export const LoginForm = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


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

      const toastId = UserToast.loading("Iniciando sesión...");
      const response = await axios.post("http://localhost:8080/login", data,
        { headers: { "Content-Type": "application/json" }, validateStatus: () => true });

      UserToast.dismiss(toastId);

      if (response.status !== 200) {
        console.log(response);
        return UserToast.error("credenciales inválidas");
      }

      const token = response.headers["authorization"];
      if (!token) return UserToast.error("Servidor no retornou token");

      localStorage.setItem("token", token);
      UserToast.success("Bienvenida de nuevo");
      setTimeout(() => { navigate("/profile") }, 1000);

      if (onSuccess) onSuccess();
    } catch (error) {
      UserToast.dismiss();
      UserToast.error("Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 pt-[70px]">
      <div className="bg-gray-50 rounded-2xl shadow p-8 w-80">
        <h2 className="text-center text-xl font-semibold mb-2">
          Bienvenida de nuevo
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Inicia sesión con tu correo y contraseña
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder="tu@email.com"
                className={clsx(
                  "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition",
                  errors.email
                    ? "focus:ring-red-300"
                    : "focus:ring-(--color-primary-main)/30"
                )}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-primary-main)/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              {...register("rememberMe")}
              id="rememberMe"
              type="checkbox"
              className="h-4 w-4 text-(--color-primary-main) border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 text-sm text-gray-700 cursor-pointer"
            >
              Recordarme
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-(--color-primary-main) hover:bg-(--color-primary-dark) text-white font-semibold py-2 rounded-lg shadow-md transition-all"
          >
            Iniciar sesión
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="font-medium text-(--color-primary-main) hover:text-(--color-primary-dark)"
            >
              Regístrate gratis
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
