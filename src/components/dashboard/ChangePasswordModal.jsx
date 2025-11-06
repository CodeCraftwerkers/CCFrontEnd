import { useState } from "react";
import axios from "axios";

export default function ChangePasswordModal({ onClose }) {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (form.newPassword !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/api/v1/users/change-password`,
        {},
        {
          params: {
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Contraseña actualizada correctamente");
      setTimeout(onClose, 1500);
    } catch (err) {
      setError("Error al actualizar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Cambiar contraseña
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            name="oldPassword"
            placeholder="Contraseña actual"
            value={form.oldPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            name="newPassword"
            placeholder="Nueva contraseña"
            value={form.newPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar nueva contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-60"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}
