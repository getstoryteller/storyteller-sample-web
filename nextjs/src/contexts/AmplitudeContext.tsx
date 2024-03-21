'use client';

import { createContext, useEffect, useState, type ReactNode } from 'react';
import * as amplitude from '@amplitude/analytics-browser';
import { useEnvVariables } from '@/hooks/useEnvVariables';

// This file initializes the Amplitude SDK and makes sure this happens
// only once per full page load.
//
// We're using Amplitude as a sample analytics provider, but you can use any analytics provider you want.
//
// You can see where this is connected in the StorytellerStoriesGridView and
// StorytellerStoriesRowView components.
//
// For more information on connecting an analytics provider, please refer to the documentation at
// https://www.getstoryteller.com/documentation/web/analytics

export const AmplitudeContext = createContext({
  isAmplitudeInitialized: false,
});

const AmplitudeContextProvider = ({ children }: { children: ReactNode }) => {
  const { amplitudeApiKey } = useEnvVariables();
  const [isAmplitudeInitialized, setIsAmplitudeInitialized] =
    useState<boolean>(false);

  useEffect(() => {
    if (amplitudeApiKey) {
      amplitude.init(amplitudeApiKey);
      console.log('Amplitude initialized');
      setIsAmplitudeInitialized(true);
    } else {
      console.warn(
        'Amplitude API key is not defined, but all events will be reported in console.',
      );
    }
  }, [amplitudeApiKey]);

  return (
    <AmplitudeContext.Provider value={{ isAmplitudeInitialized }}>
      {children}
    </AmplitudeContext.Provider>
  );
};

export default AmplitudeContextProvider;
