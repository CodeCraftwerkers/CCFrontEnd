import { useState } from "react";
import { toast } from "react-hot-toast";

export default function LoginForm() {
    const [form, setForm] = useState({
        email:"",
        password:"",
        remember:false,
    });

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value});

};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: form.email,
                password: form.password,
            }),
        });
        if (!res.ok) throw new Error("Datos inválidos");

        const data = await res.json();
        const storage = form.remember ? localStorage : sessionStorage;
        storage.setItem("token", data.token);

        toast.success("Inicio de sesión exitoso");

        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 1000);
    } catch (err) {
        toast.error(err.message);
    }
};

return (
    <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-80 sm:w-96 login-card"
    >
        <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
            className="input-field"
        />

        <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            className="input-field"
        />

        <div className="flex items-center justify-between mb-3 text-sm">
            <label className="flex items-center gap-1 text-gray-700">
                <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                />
                Recordarme
            </label>
            <a href="/forgot" className="link-primary">
                Olvidé mi contraseña
            </a>
        </div>

        <button type="submit" className="btn-primary">
            Iniciar sesión
        </button>

        <p className="text-center text-sm mt-3">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="link-primary">
                Regístrate
            </a>
        </p>
    </form>

);
    
}