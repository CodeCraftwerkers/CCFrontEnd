
export const DateFilter = ({ dateFilter, setDateFilter }) => {
  return (
    <div className="relative">
      <select
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
        aria-label="Filtrar eventos por fecha"
      >
        <option value="ALL">Todas las fechas</option>
        <option value="TODAY">Hoy</option>
        <option value="WEEK">Esta semana</option>
        <option value="MONTH">Este mes</option>
      </select>
    </div>
  );
};
