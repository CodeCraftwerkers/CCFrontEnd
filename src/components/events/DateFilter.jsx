export const DateFilter = ({ dateFilter, setDateFilter }) => {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="dateFilter"
        className="text-gray-700 font-medium text-sm"
      >
        Mostrar:
      </label>
      <select
        id="dateFilter"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm">
        <option value="today">Hoy</option>
        <option value="week">Esta semana</option>
        <option value="month">Este mes</option>
        <option value="all">Todos</option>
      </select>
    </div>
  );
};
