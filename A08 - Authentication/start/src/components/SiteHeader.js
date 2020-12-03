import { Auth0Client } from '@auth0/auth0-spa-js';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Auth0Context } from '../context/auth0.context';

// sravani - react - auth.us.auth0.com;

//

// either with async/await

export default function SiteHeader() {
  const { isAuthenticated, login } = useContext(Auth0Context);
  return (
    <div className="site-header">
      {/* stuff on the left */}
      <div>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

      {/* stuff on the right */}
      <div>
        {!isAuthenticated ? (
          <button onClick={() => login()}>Login </button>
        ) : null}

        <button>Logout</button>
      </div>
    </div>
  );
}
