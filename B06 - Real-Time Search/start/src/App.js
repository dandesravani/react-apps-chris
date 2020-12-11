import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Stats } from 'react-instantsearch-dom';
import './App.css';
import Pagination from 'react-instantsearch-dom/dist/cjs/widgets/Pagination';

// ===== OPTION 1: if you want to create your own algolia account and fill it with data =====
// demo data: https://www.algolia.com/doc/guides/building-search-ui/resources/demos/react/#media
// sample datasets on github: https://github.com/algolia/datasets

// ===== OPTION 2: if you want to get started quickly =====
// app id: SSN9CKZUJ2
// api key: ae8a3f7cff93d40282a4831930bfa38b
// index name: products

// app id:  GTT3RCZ7UP
// api key:: d6b0eaa7d4f35635e8b9404f6a5f17e9
// index name:: ecommerce

const searchClient = algoliasearch(
  'GTT3RCZ7UP',
  'd6b0eaa7d4f35635e8b9404f6a5f17e9'
);

export const Product = ({ hit }) => {
  return (
    <a className="product" href={hit.url}>
      <img src={hit.image} alt={hit.name} />
      <div>
        <h3>{hit.brand}</h3>
        <h2>{hit.name}</h2>
        <p>${hit.price}</p>
      </div>
    </a>
  );
};

export default function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="ecommerce">
      <div className="app">
        <div className="search-container">
          <Stats />
          <SearchBox />
          <Hits hitComponent={Product} />
          <Pagination />
        </div>
      </div>
    </InstantSearch>
  );
}
