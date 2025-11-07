import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

const logoutMock = vi.fn();
vi.mock("../context/UserContext", () => ({
  useUser: () => ({
    logout: logoutMock,
  }),
}));

const navigateMock = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

import { LogoutButton } from "../components/LogOutButton";

describe("LogoutButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("token", "mock-token");
  });

  it("debería renderizar el botón", () => {
    render(<LogoutButton />);
    expect(screen.getByText("Cerrar sesión")).toBeInTheDocument();
  });

  it("debería llamar a logout, eliminar token y navegar al hacer click", () => {
    render(<LogoutButton />);

    fireEvent.click(screen.getByText("Cerrar sesión"));

    expect(logoutMock).toHaveBeenCalled();

    expect(localStorage.getItem("token")).toBeNull();

    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});