import React, { useState } from "react";

const RegisterForm = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      
      const response = await fetch("http://localhost:8080/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrarse");
      }

      setMessage("Registro exitoso");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 rounded-2xl shadow p-8 w-80"
      >
        <h2 className="text-center text-xl font-semibold mb-6">
          Crea tu cuenta
        </h2>

        
        <label htmlFor="username" className="block text-sm mb-1 text-gray-600">Nombre</label>
        <input
          id="username"
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:ring-2 focus:ring-red-300 focus:outline-none"
        />

        
        <label htmlFor="email" className="block text-sm mb-1 text-gray-600">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:ring-2 focus:ring-red-300 focus:outline-none"
        />

        
        <label htmlFor="password" className="block text-sm mb-1 text-gray-600">Contraseña</label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:ring-2 focus:ring-red-300 focus:outline-none"
        />

        
        {error && (
          <p className="text-sm text-red-500 mb-2 text-center">{error}</p>
        )}
        {message && (
          <p className="text-sm text-green-600 mb-2 text-center">{message}</p>
        )}

        
        <div className="flex items-center mt-4">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
          >
            Registrarse
          </button>

          <a
            href="/login"
            className="ml-4 text-sm font-semibold text-gray-600 hover:text-gray-800"
          >
            Iniciar Sesión
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;