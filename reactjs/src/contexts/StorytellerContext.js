import React, { useCallback, useEffect, useState } from 'react';
import { sharedInstance as Storyteller } from '@getstoryteller/storyteller-sdk-javascript';

import { useEnvVariables } from '../hooks/useEnvVariables';

// This file initializes the Storyteller SDK and makes sure this happens
// only once per full page load.
// For more information on initializing the SDK, please refer to the documentation at
// https://www.getstoryteller.com/documentation/web/quickstart

export const StorytellerContext = React.createContext({
  isStorytellerInitialized: false,
  initializeStoryteller: (userId) => {},
});

const StorytellerContextProvider = ({ children }) => {
  const { storytellerApiKey } = useEnvVariables();

  const [isStorytellerInitialized, setIsStorytellerInitialized] =
    useState(false);

  const initializeStoryteller = useCallback(
    (userId) => {
      if (!storytellerApiKey) {
        throw new Error('No Storyteller API key has been provided.');
      }

      if (Storyteller.isInitialized) {
        setIsStorytellerInitialized(true);
        return;
      }

      Storyteller.initialize(storytellerApiKey, {
        externalId: userId,
      }).then(() => {
        setIsStorytellerInitialized(true);
        console.log('Storyteller initialized', Storyteller.version);

        // The Storyteller instance has a delegate object attached which allows your code
        // to take actions based on events which happen inside the Storyteller SDK
        // For more information on the various delegate callbacks, please see
        // https://www.getstoryteller.com/documentation/web/storyteller-delegate
        Storyteller.delegate = {
          // This callback is used to inform your code about actions which a user
          // takes inside Storyteller. Here we are logging the relevant information
          // to the console, but see the NextJS sample for an example of sending
          // this data to Amplitude.
          // For more information on the events and associated data, please see:
          // https://www.getstoryteller.com/documentation/web/analytics
          onUserActivityOccurred: (type, data) => {
            console.log('Storyteller Activity Occurred', type, data);
          },
        };
      });
    },
    [storytellerApiKey],
  );

  useEffect(() => {
    if (!isStorytellerInitialized) {
      initializeStoryteller();
    }
  }, [initializeStoryteller, isStorytellerInitialized]);

  return (
    <StorytellerContext.Provider
      value={{ isStorytellerInitialized, initializeStoryteller }}
    >
      {children}
    </StorytellerContext.Provider>
  );
};

export default StorytellerContextProvider;
