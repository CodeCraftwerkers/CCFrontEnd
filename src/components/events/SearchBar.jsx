export const SearchBar = ({ searchTerm, setSearchTerm, filterType, setFilterType }) => {
  return (
    <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Campo de búsqueda */}
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            placeholder="Buscar eventos por nombre, tecnología, organizador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>

        {/* Filtros tipo evento */}
        <div className="flex flex-wrap gap-2">
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
              {type === "all" ? "Todos" : type === "online" ? "Online" : "Presencial"}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
