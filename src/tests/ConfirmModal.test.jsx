import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ConfirmModal from "../components/common/ConfirmModal";

describe("ConfirmModal", () => {
  const message = "¿Estás seguro?";
  let onConfirm;
  let onCancel;

  beforeEach(() => {
    onConfirm = vi.fn();
    onCancel = vi.fn();
  });

  it("debería renderizar el mensaje y los botones", () => {
    render(<ConfirmModal message={message} onConfirm={onConfirm} onCancel={onCancel} />);

    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText("Sí")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });

  it("debería llamar a onConfirm al hacer clic en 'Sí'", () => {
    render(<ConfirmModal message={message} onConfirm={onConfirm} onCancel={onCancel} />);

    fireEvent.click(screen.getByText("Sí"));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("debería llamar a onCancel al hacer clic en 'No'", () => {
    render(<ConfirmModal message={message} onConfirm={onConfirm} onCancel={onCancel} />);

    fireEvent.click(screen.getByText("No"));
    expect(onCancel).toHaveBeenCalled();
  });
});