import './FilterBar.css';

export default function FilterBar({ filters, onFilterChange, onReset }) {
  const setFilter = (key, value) => onFilterChange(prev => ({ ...prev, [key]: value }));

  return (
    <div className="filter-container">
      <div className="filter-group">
        {[
          { key: 'all', label: 'Sve' },
          { key: 'coffee', label: 'Kafa u zrnu' },
          { key: 'equipment', label: 'Barista oprema' }
        ].map(btn => (
          <button
            key={btn.key}
            className={`filter-btn ${filters.category === btn.key ? 'active' : ''}`}
            onClick={() => onFilterChange({ category: btn.key, origin: 'all', type: 'all' })}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="advanced-filters">
        {(filters.category === 'coffee' || filters.category === 'all') && (
          <div className="filter-subgroup">
            <label htmlFor="originFilter">Porijeklo:</label>
            <select
              id="originFilter" className="filter-select"
              value={filters.origin}
              onChange={(e) => setFilter('origin', e.target.value)}
            >
              <option value="all">Sva porijekla</option>
              <option value="Etiopija">Etiopija</option>
              <option value="Kolumbija">Kolumbija</option>
              <option value="Brazil">Brazil</option>
            </select>
          </div>
        )}
        {(filters.category === 'equipment' || filters.category === 'all') && (
          <div className="filter-subgroup">
            <label htmlFor="typeFilter">Tip opreme:</label>
            <select
              id="typeFilter" className="filter-select"
              value={filters.type}
              onChange={(e) => setFilter('type', e.target.value)}
            >
              <option value="all">Svi tipovi</option>
              <option value="Espresso aparati">Espresso aparati</option>
              <option value="Mlinovi">Mlinovi</option>
              <option value="Pribor">Pribor</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
