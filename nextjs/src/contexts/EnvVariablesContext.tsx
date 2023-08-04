import React, { PropsWithChildren } from 'react';

// This file is just boilerplate to make it easier to use environment variables in your app.

interface EnvVariables {
  storytellerApiKey?: string;
  amplitudeApiKey?: string;
}

export const EnvVariablesContext = React.createContext({
  amplitudeApiKey: undefined,
  storytellerApiKey: undefined,
} as EnvVariables);

const EnvVariablesContextProvider: React.FC<
  PropsWithChildren<EnvVariables>
> = ({ children, amplitudeApiKey, storytellerApiKey }) => {
  return (
    <EnvVariablesContext.Provider
      value={{ amplitudeApiKey, storytellerApiKey }}
    >
      {children}
    </EnvVariablesContext.Provider>
  );
};

export default EnvVariablesContextProvider;
