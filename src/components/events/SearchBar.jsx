import { Search } from "lucide-react";
import { DateFilter } from "./DateFilter"; 

export const SearchBar = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  visibleCount, 
  dateFilter,
  setDateFilter
  }) => {
  return (
    <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
      {/*Campo de búsqueda */}
      <div className="relative mb-5">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Buscar eventos por nombre, tecnología, organizador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
        />
      </div>

      {/* Filtro (Todos / Online / Presencial) */}
      <div className="flex flex-wrap gap-2 mb-5">
        {["all", "online", "presencial"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filterType === type
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {type === "all"
              ? "Todos"
              : type === "online"
              ? "Online"
              : "Presencial"}
          </button>
        ))}
      </div>
       {/* Filtros inferiores (Mostrando X eventos / Filtro de fecha) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600">
         <p>Mostrando {visibleCount} evento{visibleCount !== 1 && "s"}</p>

          <DateFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
      </div>
    </section>
  );
};
