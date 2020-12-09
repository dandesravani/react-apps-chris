import React from 'react';

export const SignUpContext = React.createContext(undefined);

export const SignUpContextProvider = ({ children }) => {
  const [profile, setProfile] = React.useState({});
  const [social, setSocial] = React.useState({});
  return (
    <SignUpContext.Provider value={{ profile, setProfile, social, setSocial }}>
      {children}
    </SignUpContext.Provider>
  );
};
