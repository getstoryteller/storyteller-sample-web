'use client';

import { createContext, useEffect, useState, type ReactNode } from 'react';
import {
  getLocalStorageSetting,
  saveLocalStorageSetting,
  LOCAL_STORAGE_KEYS,
} from '@/helpers/localStorage';

// This file is just boilerplate to make it easier to use environment variables in your app.

interface EnvVariables {
  amplitudeApiKey?: string;
  setAmplitudeApiKey: (apiKey?: string) => void;
  storytellerApiKey?: string;
  setStorytellerApiKey: (apiKey?: string) => void;
}

export const EnvVariablesContext = createContext({
  amplitudeApiKey: undefined,
  storytellerApiKey: undefined,
} as EnvVariables);

const EnvVariablesContextProvider = ({ children }: { children: ReactNode }) => {
  const [amplitudeApiKey, _setAmplitudeApiKey] = useState<string>();
  const [storytellerApiKey, _setStorytellerApiKey] = useState<string>();

  useEffect(() => {
    const storedStorytellerApiKey = getLocalStorageSetting(
      LOCAL_STORAGE_KEYS.STORYTELLER_API_KEY,
    );
    const storedAmplitudeApiKey = getLocalStorageSetting(
      LOCAL_STORAGE_KEYS.AMPLITUDE_API_KEY,
    );

    if (storedStorytellerApiKey) {
      _setStorytellerApiKey(storedStorytellerApiKey);
    }

    if (storedAmplitudeApiKey) {
      _setAmplitudeApiKey(storedAmplitudeApiKey);
    }
  }, []);

  const setStorytellerApiKey = (apiKey?: string) => {
    saveLocalStorageSetting(LOCAL_STORAGE_KEYS.STORYTELLER_API_KEY, apiKey);

    _setStorytellerApiKey(apiKey);
  };

  const setAmplitudeApiKey = (apiKey?: string) => {
    saveLocalStorageSetting(LOCAL_STORAGE_KEYS.AMPLITUDE_API_KEY, apiKey);

    _setAmplitudeApiKey(apiKey);
  };

  return (
    <EnvVariablesContext.Provider
      value={{
        amplitudeApiKey,
        setAmplitudeApiKey,
        storytellerApiKey,
        setStorytellerApiKey,
      }}
    >
      {children}
    </EnvVariablesContext.Provider>
  );
};

export default EnvVariablesContextProvider;
