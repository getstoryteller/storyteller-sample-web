'use client';

import {
  ActivityType,
  GridView,
  UiTheme,
  UserActivityData,
} from '@getstoryteller/storyteller-sdk-javascript';
import '@getstoryteller/storyteller-sdk-javascript/dist/storyteller.min.css';
import { useEffect, useRef } from 'react';
import useStoryteller from '@/hooks/useStoryteller';
import TitleAndMoreButton from '@/components/TitleAndMoreButton';
import { useAmplitudeTracker } from '@/hooks/useAmplitudeTracker';

const FOUR_COLUMNS_LAYOUT = {
  lists: {
    grid: {
      columns: 4,
    },
  },
};

interface StorytellerStoriesGridViewProps {
  categories: string[];
  title?: string | undefined;
  moreButtonTitle?: string | undefined;
  displayLimit?: number | undefined;
}

const StorytellerStoriesGridView = ({
  categories,
  title,
  displayLimit,
  moreButtonTitle,
}: StorytellerStoriesGridViewProps) => {
  const urlSafeCategories = categories.join('-');
  const id = 'storyteller-stories-grid-view-' + urlSafeCategories;
  const storyGrid = useRef<GridView>();
  const { isStorytellerInitialized } = useStoryteller();
  const { logUserActivityToAmplitude } = useAmplitudeTracker();
  useEffect(() => {
    if (!isStorytellerInitialized) {
      return;
    }
    // This method creates a new Storyteller grid, replacing the div with the id generated above
    // For more information on creating and configuring Storyteller lists, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-grid-view
    //
    // The grid will display stories from the categories contained in the categories array
    // For more information on stories and categories, please see
    // https://www.getstoryteller.com/user-guide/stories-and-scheduling/categories
    storyGrid.current = new GridView(id, categories);
    storyGrid.current.displayLimit = displayLimit;
    storyGrid.current.theme = new UiTheme({
      light: FOUR_COLUMNS_LAYOUT,
      dark: FOUR_COLUMNS_LAYOUT,
    });
    // The Story Grid has a delegate object attached which allows your code
    // to take actions based on events which happen inside the Storyteller SDK
    // For more information on the various delegate callbacks, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-list-view-delegate
    storyGrid.current.delegate = {
      // This callback allows you to specify the ad configuration for the grid.
      //
      // For more information on how to configure Ads for the Storyteller Web SDK
      // please see https://www.getstoryteller.com/documentation/web/ads
      getAdConfig: () => {
        return {
          slot: '/33813572/qa-ads',
        };
      },
      // This callback is used to inform your code about actions which a user
      // takes inside Storyteller. This example shows how the data from this
      // event can be sent to Amplitude for analytics purposes (but, of course,
      // you could use any analytics provider you wish).
      // For more information on the events and associated data, please see:
      // https://www.getstoryteller.com/documentation/web/analytics
      onUserActivityOccurred: (type: ActivityType, data: UserActivityData) => {
        logUserActivityToAmplitude(type, data);
      },
      // This callback is used to inform your code when a user taps a share
      // button on any story. This example shows how to modify the URL which is
      // shared before the share sheet is presented to the user.
      onShareButtonClicked: (text: string, title: string, url: string) => {
        const shareUrl = new URL(url);
        shareUrl.searchParams.append('utm_source', 'storyteller');
        shareUrl.searchParams.append('utm_medium', 'share');
        shareUrl.searchParams.append('utm_campaign', 'storyteller');
        navigator.share({
          text: text,
          title: title,
          url: shareUrl.toString(),
        });
      },
    };
  }, [
    id,
    categories,
    displayLimit,
    logUserActivityToAmplitude,
    isStorytellerInitialized,
  ]);

  return (
    <>
      <TitleAndMoreButton
        title={title}
        moreButtonTitle={moreButtonTitle}
        category={urlSafeCategories}
      />
      <div id={id} data-base-url={urlSafeCategories} />
    </>
  );
};

export default StorytellerStoriesGridView;
