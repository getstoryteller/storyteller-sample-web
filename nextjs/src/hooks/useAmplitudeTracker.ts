import { ActivityType, UserActivityData } from '@getstoryteller/storyteller-sdk-javascript';
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

  const logUserActivityToAmplitude = (type: ActivityType, data: UserActivityData): void => {
    switch (type) {
      case ActivityType.openedStory:
        logOpenedStory(data);
        break;
      case ActivityType.openedPage:
        logOpenedPage(data);
        break;
      case ActivityType.actionButtonTapped:
        logActionButtonTapped(data);
        break;
      default:
        break;
    }
  };

  const logOpenedStory = (data: UserActivityData): void => {
    let eventData = {
      'Story ID': data.storyId,
      'Story Category': data.categories?.join(';'),
      'Page ID': data.pageId,
      'Story Title': data.storyTitle,
      'Page Index': data.pageIndex,
    };

    logEvent('OpenedStory', eventData);
  };

  const logOpenedPage = (data: UserActivityData): void => {
    let eventData = {
      'Story ID': data.storyId,
      'Story Title': data.storyTitle,
      'Story Index': data.storyIndex,
      'Page ID': data.pageId,
      'Page Index': data.pageIndex,
      'Page Type': data.pageType,
      'Page Has Action': data.pageHasAction,
      'Page Action Text': data.pageActionText,
      'Page Action URL': data.pageActionUrl,
      'Content Length': data.contentLength,
    };

    logEvent('OpenedPage', eventData);
  };

  const logActionButtonTapped = (data: UserActivityData): void => {
    let eventData = {
      'Story ID': data.storyId,
      'Story Title': data.storyTitle,
      'Story Index': data.storyIndex,
      'Page ID': data.pageId,
      'Page Index': data.pageIndex,
      'Page Type': data.pageType,
      'Page Has Action': data.pageHasAction,
      'Page Action Text': data.pageActionText,
      'Page Action URL': data.pageActionUrl,
      'Content Length': data.contentLength,
    };

    logEvent('ActionButtonTapped', eventData);
  };

  const logEvent = (eventName: string, eventProperties?: any): void => {
    if (amplitudeInitialized) {
      amplitude.logEvent(eventName, eventProperties);
    } else {
      console.log(`AmplitudeTracker: ${eventName}`, eventProperties);
    }
  };

  return {
    logUserActivityToAmplitude,
  };
};
