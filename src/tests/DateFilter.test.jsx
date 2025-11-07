import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { DateFilter } from "../components/events/DateFilter";

describe("DateFilter", () => {
  it("debería renderizar todas las opciones correctamente", () => {
    const setDateFilter = vi.fn();
    render(<DateFilter dateFilter="ALL" setDateFilter={setDateFilter} />);

    const select = screen.getByLabelText("Filtrar eventos por fecha");
    expect(select).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    const optionValues = options.map((opt) => opt.value);
    expect(optionValues).toEqual(["ALL", "TODAY", "WEEK", "MONTH"]);
  });

  it("debería tener seleccionada la opción actual", () => {
    const setDateFilter = vi.fn();
    render(<DateFilter dateFilter="WEEK" setDateFilter={setDateFilter} />);

    const select = screen.getByLabelText("Filtrar eventos por fecha");
    expect(select.value).toBe("WEEK");
  });

  it("debería llamar a setDateFilter al cambiar la opción", () => {
    const setDateFilter = vi.fn();
    render(<DateFilter dateFilter="ALL" setDateFilter={setDateFilter} />);

    const select = screen.getByLabelText("Filtrar eventos por fecha");
    fireEvent.change(select, { target: { value: "TODAY" } });

    expect(setDateFilter).toHaveBeenCalledWith("TODAY");
  });
});