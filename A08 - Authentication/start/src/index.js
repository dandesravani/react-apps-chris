import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0ContextProvider } from './context/auth0.context';

ReactDOM.render(
  <React.StrictMode>
    <Auth0ContextProvider>
      <App />
    </Auth0ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
