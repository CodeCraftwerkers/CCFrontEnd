import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

const navigateMock = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

import CTASection from "../components/home/CTASection";


describe("CTASection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería renderizar título, pasos y botón", () => {
    render(<CTASection />);

    // Título principal
    expect(
      screen.getByText("¡Únete a la comunidad Code Crafters!")
    ).toBeInTheDocument();

    // Pasos
    expect(screen.getByText("1. Crea tu cuenta")).toBeInTheDocument();
    expect(screen.getByText("2. Explora eventos")).toBeInTheDocument();
    expect(screen.getByText("3. Únete y participa")).toBeInTheDocument();

    // Botón usando aria-label
    expect(
      screen.getByRole("button", {
        name: /Crear una cuenta y unirse a Code Crafters/i,
      })
    ).toBeInTheDocument();
  });

  it("debería navegar a /login al hacer click en el botón", async () => {
    const user = userEvent.setup();
    render(<CTASection />);

    const button = screen.getByRole("button", {
      name: /Crear una cuenta y unirse a Code Crafters/i,
    });
    await user.click(button);

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});