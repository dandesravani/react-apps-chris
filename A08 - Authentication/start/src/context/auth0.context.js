import createAuth0Client from '@auth0/auth0-spa-js';
import React, { useContext } from 'react';

export const Auth0Context = React.createContext(undefined);

export const Auth0ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [auth0Client, setAuth0Client] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    initAuth0();
    async function initAuth0() {
      const auth0 = await createAuth0Client({
        domain: 'sravani-react-auth.us.auth0.com',
        client_id: 'gxfi0yE1GDLGiIlPkHNWqzmQvyXsK0Fe',
        redirect_uri: window.location.origin,
      });
      setAuth0Client(auth0);

      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        try {
          await auth0.handleRedirectCallback();
        } catch (err) {
          alert(err);
        }
      }

      const isAuthenticated = await auth0.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0.getUser();
        setUser(user);
      }
      setIsLoading(false);
    }
  }, []);

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login: (...p) => auth0Client.loginWithRedirect(...p),
  };
  return (
    <Auth0Context.Provider value={value}>{children}</Auth0Context.Provider>
  );
};
