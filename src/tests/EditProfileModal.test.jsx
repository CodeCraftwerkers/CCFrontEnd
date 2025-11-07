import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import EditProfileModal from "../components/dashboard/EditProfileModal.jsx";
import { updateUser } from "../services/ApiUser.jsx";


vi.mock("../services/ApiUser.jsx", () => ({
  updateUser: vi.fn(),
}));

describe("EditProfileModal", () => {
  const mockUser = { id: 1, username: "Maria", email: "maria@test.com" };
  const onClose = vi.fn();
  const onSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería renderizar los campos con los datos del usuario", () => {
    render(
      <EditProfileModal user={mockUser} onClose={onClose} onSuccess={onSuccess} />
    );

    expect(screen.getByDisplayValue("Maria")).toBeInTheDocument();
    expect(screen.getByDisplayValue("maria@test.com")).toBeInTheDocument();
  });

  it("debería llamar a updateUser y mostrar mensaje de éxito al guardar", async () => {
    updateUser.mockResolvedValueOnce({ username: "Maria", email: "maria@test.com" });

    render(
      <EditProfileModal user={mockUser} onClose={onClose} onSuccess={onSuccess} />
    );

    const usernameInput = screen.getByLabelText(/nombre de usuario/i);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const submitButton = screen.getByRole("button", { name: /guardar cambios/i });

    fireEvent.change(usernameInput, { target: { value: "Maria Actualizada" } });
    fireEvent.change(emailInput, { target: { value: "maria@nuevo.com" } });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith(1, {
        username: "Maria Actualizada",
        email: "maria@nuevo.com",
      });
      expect(
        screen.getByText("Perfil actualizado correctamente.")
      ).toBeInTheDocument();
    });
  });

  it("debería mostrar un mensaje de error si updateUser falla", async () => {
    updateUser.mockRejectedValueOnce(new Error("Error del servidor"));

    render(
      <EditProfileModal user={mockUser} onClose={onClose} onSuccess={onSuccess} />
    );

    const submitButton = screen.getByRole("button", { name: /guardar cambios/i });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/error del servidor/i)).toBeInTheDocument();
    });
  });

  it("debería ejecutar onClose al hacer clic en ✕", () => {
    render(
      <EditProfileModal user={mockUser} onClose={onClose} onSuccess={onSuccess} />
    );

    const closeButton = screen.getByRole("button", { name: "✕" });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});