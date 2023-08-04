import * as amplitude from '@amplitude/analytics-browser';
import React, { PropsWithChildren, useEffect } from 'react';
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

export const AmplitudeContext = React.createContext({
  amplitudeInitialized: false,
});

const AmplitudeContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { amplitudeApiKey } = useEnvVariables();
  const [amplitudeInitialized, setAmplitudeInitialized] =
    React.useState<boolean>(false);

  useEffect(() => {
    if (amplitudeApiKey) {
      amplitude.init(amplitudeApiKey);
      console.log('Amplitude initialized');
      setAmplitudeInitialized(true);
    } else {
      console.warn(
        'Amplitude API key is not defined, but all events will be reported in console.',
      );
    }
  }, [amplitudeApiKey]);

  return (
    <AmplitudeContext.Provider value={{ amplitudeInitialized }}>
      {children}
    </AmplitudeContext.Provider>
  );
};

export default AmplitudeContextProvider;
