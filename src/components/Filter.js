import React from 'react';

function Filter({ types, onTypeChange, isDarkMode }) {
  return (
    <div className="flex items-center space-x-4">
      <label className={`block text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>Filter by Type:</label>
      <select 
        onChange={onTypeChange} 
        className={`p-2 border rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>{type.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
