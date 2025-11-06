import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { LoginForm } from "../components/LoginForm";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

vi.mock("axios");
vi.mock("../components/UserToast", () => ({
  UserToast: {
    loading: vi.fn(),
    dismiss: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería renderizar los campos correctamente", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
  });

  it("debería mostrar errores de validación si los campos están vacíos", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const button = screen.getByText("Iniciar sesión");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("El email es requerido")).toBeInTheDocument();
      expect(
        screen.getByText("La contraseña debe tener al menos 6 caracteres")
      ).toBeInTheDocument();
    });
  });

  it("debería enviar el formulario correctamente si los datos son válidos", async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      headers: { authorization: "mock-token" },
    });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "123456" },
    });

    const button = screen.getByText("Iniciar sesión");
    fireEvent.click(button);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8080/login",
        {
          email: "test@email.com",
          password: "123456",
          rememberMe: false,
        },
        expect.any(Object)
      );
    });
  });
});