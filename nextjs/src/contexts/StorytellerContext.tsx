'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from 'react';
import {
  sharedInstance as Storyteller,
  type ActivityType,
  type UserActivityData,
} from '@getstoryteller/storyteller-sdk-javascript';
import { useEnvVariables } from '@/hooks/useEnvVariables';
import { useAmplitudeTracker } from '@/hooks/useAmplitudeTracker';

// This file initializes the Storyteller SDK and makes sure this happens
// only once per full page load.
// For more information on initializing the SDK, please refer to the documentation at
// https://www.getstoryteller.com/documentation/web/quickstart
//
// You can see an example of how the userId parameter is used in the UserOptions component
// There is more information about this in our documentation:
// https://www.getstoryteller.com/documentation/web/users

type StorytellerContextType = {
  isStorytellerInitialized: boolean;
  storytellerInstance: typeof Storyteller | null;
};

export const StorytellerContext = createContext<StorytellerContextType>({
  isStorytellerInitialized: false,
  storytellerInstance: null,
});

const StorytellerContextProvider = ({ children }: { children: ReactNode }) => {
  const { storytellerApiKey } = useEnvVariables();
  const { logUserActivityToAmplitude } = useAmplitudeTracker();

  const [isStorytellerInitialized, setIsStorytellerInitialized] =
    useState<boolean>(false);

  let storytellerInstance = useRef<typeof Storyteller | null>(null);

  const initializeStoryteller = useCallback(
    (userId?: string) => {
      if (!storytellerApiKey) {
        console.error('Web SDK API key is not defined');
        return;
      }

      if (Storyteller.isInitialized) {
        setIsStorytellerInitialized(true);
        storytellerInstance.current = Storyteller;
        return;
      }

      if (!isStorytellerInitialized) {
        Storyteller.initialize(storytellerApiKey, {
          externalId: userId,
        }).then(() => {
          setIsStorytellerInitialized(true);
          console.log('Storyteller initialized', Storyteller.version);
          storytellerInstance.current = Storyteller;

          Storyteller.enableLogging();

          // The Storyteller instance has a delegate object attached which allows your code
          // to take actions based on events which happen inside the Storyteller SDK
          // For more information on the various delegate callbacks, please see
          // https://www.getstoryteller.com/documentation/web/storyteller-delegate
          Storyteller.delegate = {
            // This callback is used to inform your code about actions which a user
            // takes inside Storyteller. This example shows how the data from this
            // event can be sent to Amplitude for analytics purposes (but, of course,
            // you could use any analytics provider you wish).
            // For more information on the events and associated data, please see:
            // https://www.getstoryteller.com/documentation/web/analytics
            onUserActivityOccurred: (
              type: ActivityType,
              data: UserActivityData,
            ) => {
              logUserActivityToAmplitude(type, data);
            },
            // This callback allows you to specify the ad configuration for the Storyteller instance.
            // For more information on how to configure Ads for the Storyteller Web SDK
            // please see https://www.getstoryteller.com/documentation/web/ads
            getAdConfig: () => {
              return {
                slot: '/33813572/qa-ads',
                customTargeting: {},
              };
            },
            // This callback is used to inform your code when a user taps a share
            // button on any story. This example shows how to modify the URL which is
            // shared before the share sheet is presented to the user.
            onShareButtonTapped: (text: string, title: string, url: string) => {
              return new Promise<void>((resolve, reject) => {
                const shareUrl = new URL(url);
                shareUrl.searchParams.append('utm_source', 'storyteller');
                shareUrl.searchParams.append('utm_medium', 'share');
                shareUrl.searchParams.append('utm_campaign', 'storyteller');

                if (navigator.share) {
                  navigator
                    .share({
                      text: text,
                      title: title,
                      url: shareUrl.toString(),
                    })
                    .then(() => {
                      resolve();
                    })
                    .catch((error) => {
                      reject(error);
                    });
                } else {
                  reject(new Error('Web Share API is not supported.'));
                }
              });
            },
          };
        });
      }
    },
    [isStorytellerInitialized, logUserActivityToAmplitude, storytellerApiKey],
  );

  useEffect(() => {
    if (!isStorytellerInitialized) {
      initializeStoryteller();
    }
  }, [initializeStoryteller, isStorytellerInitialized]);

  return (
    <StorytellerContext.Provider
      value={{
        isStorytellerInitialized,
        storytellerInstance: storytellerInstance.current,
      }}
    >
      {children}
    </StorytellerContext.Provider>
  );
};

export default StorytellerContextProvider;
