import Storyteller from '@getstoryteller/storyteller-sdk-javascript';
import * as amplitude from '@amplitude/analytics-browser';
import { useContext } from 'react';
import { AmplitudeContext } from '@/contexts/AmplitudeContext';

// This file exposes methods to track specific events to Amplitude.
// 
// You can see how this file is connected to Storyteller in the 
// StorytellerStoriesGridView and StorytellerStoriesRowView components.
//
// For more information on connecting an analytics provider, 
// please refer to the documentation at
// https://www.getstoryteller.com/documentation/web/analytics

export const useAmplitudeTracker = () => {
  const { amplitudeInitialized } = useContext(AmplitudeContext);
  const logOpenedStory = (data: Storyteller.UserActivityData): void => {
    let eventData = {
      'Story ID': data.storyId,
      'Story Category': data.categories?.join(';'),
      'Page ID': data.pageId,
      'Story Title': data.storyTitle,
      'Page Index': data.pageIndex,
    };

    logEvent('OpenedStory', eventData);
  };

  const logEvent = (eventName: string, eventProperties?: any): void => {
    if (amplitudeInitialized) {
      amplitude.logEvent(eventName, eventProperties);
    } else {
      console.log(`AmplitudeTracker: ${eventName}`, eventProperties);
    }
  };

  return {
    logOpenedStory,
    logEvent,
  };
};
