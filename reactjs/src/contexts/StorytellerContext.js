import React, { useCallback, useEffect, useRef, useState } from 'react';
import Storyteller from '@getstoryteller/storyteller-sdk-javascript';

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
  const storytellerInstance = useRef();

  const initializeStoryteller = useCallback(
    (userId) => {
      if (!storytellerApiKey) {
        throw new Error('No Storyteller API key has been provided.');
      }
      storytellerInstance.current = Storyteller.sharedInstance
        .initialize(storytellerApiKey, {
          externalId: userId,
        })
        .then(() => {
          setIsStorytellerInitialized(true);
          console.log(
            'Storyteller initialized',
            Storyteller.sharedInstance.version,
          );
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
