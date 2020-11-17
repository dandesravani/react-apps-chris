// @ts-nocheck
import React from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SearchForm } from './SearchForm';

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

async function fetchImages(page, query) {
  const baseUrl =
    query && query.length !== 0
      ? `https://api.unsplash.com/search/photos/?client_id=${accessKey}&page=${page}&query=${query}`
      : `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}`;

  let data = await (await fetch(baseUrl)).json();
  return query ? data.results : data;
}

export default function App() {
  const [images, setImages] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState('');
  // const prevQuery = React.usePrevious(query);

  const handleSearchForm = (text) => {
    setQuery(text);
    setImages([]);
  };

  // React.useEffect(() => setImages([]), [query]);

  React.useEffect(() => {
    fetchImages(page, query)
      .then((data) => setImages((images) => [...images, ...data]))
      .catch(console.error);
  }, [page, query]);

  if (!accessKey) {
    return (
      <a href="https://unsplash/developers" className="error">
        Required: Get your unsplash access key first
      </a>
    );
  }
  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>
      <SearchForm onSearchForm={handleSearchForm} />

      <InfiniteScroll
        dataLength={images.length}
        next={() => {
          setPage((page) => page + 1);
        }}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="image-grid">
          {images.map((img, index) => (
            <div className="image" key={index}>
              <img src={img.urls.regular} alt="Sample" />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
