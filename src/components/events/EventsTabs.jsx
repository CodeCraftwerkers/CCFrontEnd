export const EventsTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "created", label: "Eventos creados" },
    { id: "joined", label: "Mis eventos" },
  ];

  return (
    <div className="flex gap-6 border-b border-gray-200 mb-6 text-sm font-medium">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`pb-3 transition-colors ${
            activeTab === tab.id
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
