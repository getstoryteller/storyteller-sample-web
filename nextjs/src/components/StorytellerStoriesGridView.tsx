'use client';

import { useEffect, useRef } from 'react';
import {
  StorytellerStoriesGridView as GridView,
  UiTheme,
} from '@getstoryteller/storyteller-sdk-javascript';
import useStoryteller from '@/hooks/useStoryteller';
import TitleAndMoreButton from '@/components/TitleAndMoreButton';

const FOUR_COLUMNS_LAYOUT = {
  lists: {
    grid: {
      columns: 4,
    },
  },
};

interface StorytellerStoriesGridViewProps {
  categories: string[];
  title?: string;
  moreButtonTitle?: string;
  displayLimit?: number;
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

  useEffect(() => {
    if (!isStorytellerInitialized) {
      return;
    }
    // This method creates a new Storyteller stories grid, replacing the div with the id generated above
    // For more information on creating and configuring Storyteller lists, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-grid-view
    //
    // The grid will display stories from the categories contained in the categories array
    // For more information on stories and categories, please see
    // https://www.getstoryteller.com/user-guide/stories-and-scheduling/categories
    storyGrid.current = new GridView(id, categories);
    storyGrid.current.configuration = GridView.ListConfiguration({
      displayLimit,
      theme: new UiTheme({
        light: FOUR_COLUMNS_LAYOUT,
        dark: FOUR_COLUMNS_LAYOUT,
      }),
    });
  }, [id, categories, displayLimit, isStorytellerInitialized]);

  return (
    <>
      <TitleAndMoreButton
        title={title}
        moreButton={
          moreButtonTitle
            ? {
                title: moreButtonTitle,
                link: encodeURI(`/category/${urlSafeCategories}/${title}`),
              }
            : undefined
        }
      />
      <div id={id} data-base-url={urlSafeCategories} />
    </>
  );
};

export default StorytellerStoriesGridView;
