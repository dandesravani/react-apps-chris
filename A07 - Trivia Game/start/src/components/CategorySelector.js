import React from 'react';
import categories from '../categories';

export default function CategorySelector({ category, onCategoryChange }) {
  return (
    <div className="category-selector">
      <p>Select Category</p>
      <select
        value={category}
        onChange={(evt) => onCategoryChange(evt.target.value)}
      >
        {categories.map((category, index) => (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
