import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { SearchBar } from "../components/events/SearchBar";

describe("SearchBar", () => {
  let setSearchTerm, setFilterType, setDateFilter;

  beforeEach(() => {
    setSearchTerm = vi.fn();
    setFilterType = vi.fn();
    setDateFilter = vi.fn();
  });

  it("debería renderizar el input, botones y cantidad de eventos", () => {
    render(
      <SearchBar
        searchTerm=""
        setSearchTerm={setSearchTerm}
        filterType="ALL"
        setFilterType={setFilterType}
        visibleCount={3}
        dateFilter="ALL"
        setDateFilter={setDateFilter}
      />
    );

    
    expect(
      screen.getByPlaceholderText(
        "Buscar eventos por nombre, tecnología, organizador..."
      )
    ).toBeInTheDocument();

    
    expect(screen.getByText("Todos")).toBeInTheDocument();
    expect(screen.getByText("Online")).toBeInTheDocument();
    expect(screen.getByText("Presencial")).toBeInTheDocument();

    
    expect(screen.getByText("Mostrando 3 eventos")).toBeInTheDocument();
  });

  it("debería llamar a setSearchTerm al escribir en el input", () => {
    render(
      <SearchBar
        searchTerm=""
        setSearchTerm={setSearchTerm}
        filterType="ALL"
        setFilterType={setFilterType}
        visibleCount={0}
        dateFilter="ALL"
        setDateFilter={setDateFilter}
      />
    );

    const input = screen.getByPlaceholderText(
      "Buscar eventos por nombre, tecnología, organizador..."
    );
    fireEvent.change(input, { target: { value: "React" } });

    expect(setSearchTerm).toHaveBeenCalledWith("React");
  });

  it("debería llamar a setFilterType al hacer click en un botón", () => {
    render(
      <SearchBar
        searchTerm=""
        setSearchTerm={setSearchTerm}
        filterType="ALL"
        setFilterType={setFilterType}
        visibleCount={0}
        dateFilter="ALL"
        setDateFilter={setDateFilter}
      />
    );

    fireEvent.click(screen.getByText("Online"));
    expect(setFilterType).toHaveBeenCalledWith("ONLINE");

    fireEvent.click(screen.getByText("Presencial"));
    expect(setFilterType).toHaveBeenCalledWith("PRESENCIAL");
  });
});