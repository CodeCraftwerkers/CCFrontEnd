import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "../components/RegisterForm";
import { vi } from "vitest";

global.fetch = vi.fn();

describe("RegisterForm", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("debería renderizar todos los campos correctamente", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
  });

  it("debería permitir escribir en los campos", () => {
    render(<RegisterForm />);
    const nameInput = screen.getByLabelText("Nombre");
    fireEvent.change(nameInput, { target: { value: "Héctor" } });
    expect(nameInput).toHaveValue("Héctor");
  });

  it("debería mostrar mensaje de éxito si el registro es correcto", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Registro exitoso" }),
    });

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Héctor" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "hector@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Registrarse"));

    expect(await screen.findByText("Registro exitoso")).toBeInTheDocument();
  });

  it("debería mostrar un mensaje de error si el backend falla", async () => {

    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Usuario ya existe" }),
    });

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Héctor" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "hector@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Registrarse"));

    expect(await screen.findByText("Usuario ya existe")).toBeInTheDocument();
  });
});