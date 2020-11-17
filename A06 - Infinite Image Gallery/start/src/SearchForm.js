import React from 'react';

interface SearchFormProps {
  onSearchForm(text): void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearchForm }) => {
  const [searchText, setSearchText] = React.useState('');
  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        onSearchForm(searchText);
      }}
    >
      <input
        type="text"
        value={searchText}
        onChange={(evt) => {
          setSearchText(evt.target.value);
        }}
        placeholder="Search Unsplash..."
      />
      <button>Search</button>
    </form>
  );
};
