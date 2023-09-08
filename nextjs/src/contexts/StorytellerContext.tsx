import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { sharedInstance as Storyteller } from '@getstoryteller/storyteller-sdk-javascript';
import { useEnvVariables } from '@/hooks/useEnvVariables';

// This file initializes the Storyteller SDK and makes sure this happens
// only once per full page load.
// For more information on initializing the SDK, please refer to the documentation at
// https://www.getstoryteller.com/documentation/web/quickstart
//
// You can see an example of how the userId parameter is used in the UserOptions component
// There is more information about this in our documentation:
// https://www.getstoryteller.com/documentation/web/users

export const StorytellerContext = React.createContext({
  isStorytellerInitialized: false,
  initializeStoryteller: (userId?: string) => {},
});

const StorytellerContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { storytellerApiKey } = useEnvVariables();

  const [isStorytellerInitialized, setIsStorytellerInitialized] =
    useState<boolean>(false);
  const storytellerInstance = useRef<any>();

  const initializeStoryteller = useCallback(
    (userId: string | undefined = undefined) => {
      if (!storytellerApiKey) {
        throw new Error('Web SDK API key is not defined');
      }
      storytellerInstance.current = Storyteller
        .initialize(storytellerApiKey, {
          externalId: userId,
        })
        .then(() => {
          setIsStorytellerInitialized(true);
          console.log(
            'Storyteller initialized',
            Storyteller.version,
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
