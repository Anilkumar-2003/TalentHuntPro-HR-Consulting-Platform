import React, { useState } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  name: string;
  options: FilterOption[];
}

interface SearchFiltersProps {
  filters: FilterGroup[];
  onFilterChange: (filters: Record<string, string[]>) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFilterChange }) => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  
  const toggleFilter = (filterName: string) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  const handleFilterSelect = (groupName: string, value: string) => {
    setSelectedFilters(prev => {
      const currentValues = prev[groupName] || [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      const newFilters = {
        ...prev,
        [groupName]: updatedValues
      };
      
      onFilterChange(newFilters);
      return newFilters;
    });
    
    setOpenFilter(null);
  };

  const clearFilter = (groupName: string) => {
    setSelectedFilters(prev => {
      const { [groupName]: _, ...rest } = prev;
      onFilterChange(rest);
      return rest;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    onFilterChange({});
  };

  const getSelectedCount = () => {
    return Object.values(selectedFilters).reduce((count, values) => count + values.length, 0);
  };

  const selectedCount = getSelectedCount();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Filter size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters</h3>
          {selectedCount > 0 && (
            <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
              {selectedCount}
            </span>
          )}
        </div>
        
        {selectedCount > 0 && (
          <button 
            onClick={clearAllFilters}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Clear all filters
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filters.map((group) => (
          <div key={group.name} className="relative">
            <button
              onClick={() => toggleFilter(group.name)}
              className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center"
            >
              {group.name}
              {selectedFilters[group.name]?.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                  {selectedFilters[group.name].length}
                </span>
              )}
              <ChevronDown size={14} className={`ml-1 transition-transform ${openFilter === group.name ? 'rotate-180' : ''}`} />
            </button>
            
            {openFilter === group.name && (
              <div className="absolute z-10 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                {group.options.map((option) => (
                  <div
                    key={option.value}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                    onClick={() => handleFilterSelect(group.name, option.value)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters[group.name]?.includes(option.value) || false}
                      onChange={() => {}}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {Object.entries(selectedFilters).map(([groupName, values]) => 
          values.map(value => {
            const filterGroup = filters.find(g => g.name === groupName);
            const option = filterGroup?.options.find(o => o.value === value);
            
            return (
              <div 
                key={`${groupName}-${value}`}
                className="px-2 py-1 text-xs rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 flex items-center"
              >
                <span className="text-gray-500 dark:text-gray-400 mr-1">{groupName}:</span>
                {option?.label}
                <button
                  onClick={() => handleFilterSelect(groupName, value)}
                  className="ml-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <X size={12} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SearchFilters;