// @ts-nocheck
import React from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SearchForm } from './SearchForm';

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
  const [images, setImages] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState('');

  const fetchData = () => {
    fetch(
      `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}`
    )
      .then((data) => data.json())
      .then((data) => {
        setImages([...images, ...data]);
      })
      .catch((err) => console.log(err));
  };

  const searchPhotos = (query) => {
    return fetch(
      `https://api.unsplash.com/search/photos/?client_id=${accessKey}&page=${page}&query=${query}`
    )
      .then((data) => data.json())
      .then((data) => {
        setImages([...data.results, ...data.results]);
        setPage(page + 1);
        console.log(page);
      })
      .catch(console.error);
  };

  const handleSearchForm = (text) => {
    setQuery(text);
  };

  React.useEffect(() => {
    if (query) {
      searchPhotos(query);
    } else {
      fetchData();
    }
  }, [query]);

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
          fetchData();
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
