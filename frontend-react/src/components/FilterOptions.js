// FilterOptions.js
import React, { useState } from 'react';

const FilterOptions = () => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="filter-options">
      <label htmlFor="filter">Filter by: </label>
      <select id="filter" value={filter} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="fraudRisk">Fraud Risk Score</option>
        <option value="userId">User ID</option>
        <option value="date">Date</option>
      </select>
    </div>
  );
};

export default FilterOptions;
