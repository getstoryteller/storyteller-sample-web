'use client';

import { Size, TileType } from '@/models/content';
import { ActivityType, CellType, RowView, UiTheme, UserActivityData } from '@getstoryteller/storyteller-sdk-javascript';
import '@getstoryteller/storyteller-sdk-javascript/dist/storyteller.min.css';
import { useEffect, useRef } from 'react';
import buildBasicTheme from '@/helpers/buildBasicTheme';
import useStoryteller from '@/hooks/useStoryteller';
import TitleAndMoreButton from '@/components/TitleAndMoreButton';
import { useAmplitudeTracker } from '@/hooks/useAmplitudeTracker';

interface StorytellerStoriesRowViewProps {
  tileType: keyof typeof TileType;
  size: keyof typeof Size;
  categories: string[];
  title?: string | undefined;
  moreButtonTitle?: string | undefined;
  displayLimit?: number | undefined;
}

const StorytellerStoriesRowView = ({
  tileType,
  size,
  categories,
  title,
  displayLimit,
  moreButtonTitle,
}: StorytellerStoriesRowViewProps) => {
  const urlSafeCategories = categories.join('-');
  const id = 'storyteller-stories-row-view-' + urlSafeCategories;
  const storyRow = useRef<Storyteller.RowView>();
  const { logOpenedStory } = useAmplitudeTracker();

  let height = 140;
  switch (size) {
    case Size.medium:
      height = 240;
      break;
    case Size.large:
      height = 350;
      break;
  }

  const { isStorytellerInitialized } = useStoryteller();

  useEffect(() => {
    if (!isStorytellerInitialized) {
      return;
    }
    // This method creates a new Storyteller row, replacing the div with the id generated above
    // For more information on creating and configuring Storyteller lists, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-row-view
    // 
    // The row will display stories from the categories contained in the categories array
    // For more information on stories and categories, please see
    // https://www.getstoryteller.com/user-guide/stories-and-scheduling/categories
    storyRow.current = new RowView(id, categories);
    storyRow.current.displayLimit = displayLimit;
    storyRow.current.theme = new UiTheme({
      light: buildBasicTheme(),
      dark: buildBasicTheme(),
    });
    storyRow.current.cellType =
      tileType === TileType.round
        ? CellType.round
        : CellType.square;
    // The Story Row has a delegate object attached which allows your code
    // to take actions based on events which happen inside the Storyteller SDK
    // For more information on the various delegate callbacks, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-list-view-delegate
    storyRow.current.delegate = {
      // This callback allows you to specify the ad configuration for the row.
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
        switch (type) {
          case ActivityType.openedStory:
            logOpenedStory(data);
            break;
        }
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
    tileType,
    isStorytellerInitialized,
    logOpenedStory,
  ]);

  return (
    <div>
      {title && (
        <TitleAndMoreButton
          title={title}
          moreButtonTitle={moreButtonTitle}
          category={urlSafeCategories}
        />
      )}
      <div
        id={id}
        style={{ height: `${height}px` }}
        data-base-url={urlSafeCategories}
        className="pt-2 sm:pt-4"
      ></div>
    </div>
  );
};

export default StorytellerStoriesRowView;
