import React from 'react';

// This file is just boilerplate to make it easier to use environment variables in your app.

export const EnvVariablesContext = React.createContext({
  storytellerApiKey: undefined,
});

const EnvVariablesContextProvider = ({ children, storytellerApiKey }) => {
  return (
    <EnvVariablesContext.Provider value={{ storytellerApiKey }}>
      {children}
    </EnvVariablesContext.Provider>
  );
};

export default EnvVariablesContextProvider;
