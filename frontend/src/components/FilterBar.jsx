import React from 'react';
import { Search, Plus, LayoutGrid, List, Filter, ArrowUpDown } from 'lucide-react';

export const FilterBar = ({
  searchTerm,
  onSearchChange,
  genderFilter,
  onGenderFilterChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  onAddClick
}) => {
  return (
    <div className="action-bar">
      <div className="search-filter-group">
        {/* Search Bar */}
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Gender Filter */}
        <select
          className="select-control"
          value={genderFilter}
          onChange={(e) => onGenderFilterChange(e.target.value)}
        >
          <option value="all">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* Sort Selector */}
        <select
          className="select-control"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
        >
          <option value="name-asc">Sort: Name (A-Z)</option>
          <option value="name-desc">Sort: Name (Z-A)</option>
          <option value="salary-desc">Sort: Highest Salary</option>
          <option value="salary-asc">Sort: Lowest Salary</option>
          <option value="age-asc">Sort: Youngest</option>
          <option value="age-desc">Sort: Oldest</option>
        </select>

        {/* View Toggle */}
        <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-input)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <button
            className={`btn-icon ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => onViewModeChange('table')}
            title="Table View"
            style={{ width: '32px', height: '32px', border: 'none', background: viewMode === 'table' ? 'var(--primary)' : 'transparent', color: viewMode === 'table' ? '#FFF' : 'var(--text-secondary)' }}
          >
            <List size={16} />
          </button>
          <button
            className={`btn-icon ${viewMode === 'cards' ? 'active' : ''}`}
            onClick={() => onViewModeChange('cards')}
            title="Grid Cards View"
            style={{ width: '32px', height: '32px', border: 'none', background: viewMode === 'cards' ? 'var(--primary)' : 'transparent', color: viewMode === 'cards' ? '#FFF' : 'var(--text-secondary)' }}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {/* Add Employee Button */}
      <button className="btn btn-primary" onClick={onAddClick}>
        <Plus size={18} />
        <span>Add Employee</span>
      </button>
    </div>
  );
};
