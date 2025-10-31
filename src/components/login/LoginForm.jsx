import "../../App.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { loginToast } from "./LoginToast";

// Schema de validación
const loginSchema = z.object({
  email: z.string().min(1, "El email es requerido").email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  rememberMe: z.boolean().optional(),
});

// Usuario simulado
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
    // === MODO DEMO (simulación de login) ===
    if (data.email === fakeUser.email && data.password === fakeUser.password) {
      const fakeToken = "fake-jwt-token-123";
      const storage = data.rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", fakeToken);
      loginToast.success("Inicio de sesión exitoso (modo demo)");
      setTimeout(() => (window.location.href = "/dashboard"), 1000);
    } else {
      loginToast.error("Credenciales inválidas (modo demo)");
    }

    // === CÓDIGO DEFINITIVO CON BACKEND ===
    /*
    axios
      .post("/api/auth/login", data)
      .then((response) => {
        loginToast.success("¡Bienvenido de nuevo!");
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        if (onSuccess) onSuccess(response.data);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || error.message || "Error al iniciar sesión";
        loginToast.error(errorMessage);
      });
    */
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      {/* Email */}
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

      {/* Password */}
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

      {/* Remember Me */}
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

        <Link
          to="/forgot-password"
          className="text-sm font-medium text-(--color-primary-main) hover:text-(--color-primary-dark) transition"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-(--color-primary-main) hover:bg-(--color-primary-dark) transition"
      >
        <LogIn className="w-5 h-5 mr-2" />
        Iniciar Sesión
      </button>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-(--color-bg-main) text-gray-500">
            O continúa con
          </span>
        </div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => loginToast.error("Funcionalidad no implementada")}
          className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          {/* Google Icon */}
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.94c-.22-.66-.35-1.36-.35-2.07s.13-1.41.35-2.07v-2.84H2.18C1.42 10.57 1 11.75 1 13s.42 2.43 1.18 3.91l3.66-2.97z"
            />
            <path fill="none" d="M0 0h24v24H0z" />
          </svg>
          Google
        </button>

        <button
          type="button"
          onClick={() => loginToast.error("Funcionalidad no implementada")}
          className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          {/* GitHub Icon */}
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.385-1.333-1.754-1.333-1.754-1.09-.746.082-.73.082-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.76-1.605-2.665-.3-5.467-1.333-5.467-5.932 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.241 2.873.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.628-5.48 5.922.43.372.813 1.103.813 2.222v3.293c0 .322.218.694.824.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"
            />
          </svg>
          GitHub
        </button>
      </div>

      {/* Sign Up */}
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
