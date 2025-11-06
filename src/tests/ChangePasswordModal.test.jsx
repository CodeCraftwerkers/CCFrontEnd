import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import ChangePasswordModal from "../components/dashboard/ChangePasswordModal";
import axios from "axios";

vi.mock("axios");


describe("ChangePasswordModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("token", "mock-token");
  });

  it("debería renderizar correctamente el modal", () => {
    const onClose = vi.fn();
    render(<ChangePasswordModal onClose={onClose} />);

    expect(
      screen.getByRole("heading", { name: /Cambiar contraseña/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña actual")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nueva contraseña")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Confirmar nueva contraseña")
    ).toBeInTheDocument();
  });

  it("debería mostrar error si las contraseñas no coinciden", async () => {
    const onClose = vi.fn();
    render(<ChangePasswordModal onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText("Contraseña actual"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nueva contraseña"), {
      target: { value: "abcdef" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirmar nueva contraseña"), {
      target: { value: "abc123" },
    });

    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(
        screen.getByText("Las contraseñas no coinciden")
      ).toBeInTheDocument();
    });
  });       
 

  it("debería mostrar error si la API falla", async () => {
    const onClose = vi.fn();
    axios.put.mockRejectedValueOnce(new Error("Server error"));

    render(<ChangePasswordModal onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText("Contraseña actual"), {
      target: { value: "old" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nueva contraseña"), {
      target: { value: "newpass" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirmar nueva contraseña"), {
      target: { value: "newpass" },
    });

    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(
        screen.getByText("Error al actualizar la contraseña")
      ).toBeInTheDocument();
    });
  });

  it("debería cerrar el modal al hacer clic en ✕", () => {
    const onClose = vi.fn();
    render(<ChangePasswordModal onClose={onClose} />);

    fireEvent.click(screen.getByText("✕"));
    expect(onClose).toHaveBeenCalled();
  });
});
