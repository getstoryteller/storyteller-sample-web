'use client';

import { useContext, useEffect, useRef } from 'react';
import {
  IListConfiguration,
  StorytellerStoriesGridView,
} from '@getstoryteller/storyteller-sdk-javascript';
import { useUiStyle } from '@/hooks/useUiStyle';
import { StorytellerContext } from '@/contexts/StorytellerContext';
import { useViewStatus, ViewStatus } from '@/hooks/useViewStatus';
import { StorytellerViewHeader } from '../StorytellerViewHeader/StorytellerViewHeader';
import { getCategoryParamFromName } from '@/helpers/getCategoryParam';

interface StorytellerStoriesGridViewProps {
  basename: string;
  categories: string[];
  displayLimit?: number;
  moreButtonTitle?: string;
  title?: string;
}

function StoriesGrid({
  basename,
  categories,
  displayLimit,
  moreButtonTitle,
  title,
}: StorytellerStoriesGridViewProps) {
  const { uiStyle } = useUiStyle();
  const { viewProps, setViewStatus: setStoriesStatus } = useViewStatus();
  const { isStorytellerInitialized } = useContext(StorytellerContext);
  const storyGrid = useRef<StorytellerStoriesGridView>();

  useEffect(() => {
    if (
      !isStorytellerInitialized ||
      storyGrid.current ||
      !basename ||
      !categories
    ) {
      return;
    }

    // This method creates a new Storyteller stories grid, replacing the div with the basename as its ID
    // For more information on creating and configuring Storyteller lists, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-grid-view
    //
    // The grid will display clips from the specified collection
    // For more information on clips and collections, please see
    // https://www.getstoryteller.com/user-guide/clips-and-collections/creating-collections
    storyGrid.current = new StorytellerStoriesGridView(basename, categories);

    storyGrid.current.delegate = {
      onDataLoadComplete(success, error, dataCount) {
        setStoriesStatus(
          !!error || dataCount === 0 ? ViewStatus.error : ViewStatus.success,
        );
      },
    };
  }, [basename, categories, isStorytellerInitialized, setStoriesStatus]);

  useEffect(() => {
    if (!isStorytellerInitialized || !storyGrid.current) {
      return;
    }

    const storyGridConfiguration: IListConfiguration<'StorytellerStoriesGridView'> =
      {
        basename,
        displayLimit,
        preload: true,
        uiStyle,
      };

    storyGrid.current.configuration = storyGridConfiguration;
  }, [basename, displayLimit, isStorytellerInitialized, uiStyle]);

  return (
    <article {...viewProps}>
      {title && (
        <StorytellerViewHeader
          title={title}
          moreButton={
            moreButtonTitle
              ? {
                  title: moreButtonTitle,
                  link: `/category/${getCategoryParamFromName(title)}`,
                }
              : undefined
          }
        />
      )}

      <div
        id={basename}
        data-base-url={title ? getCategoryParamFromName(title) : basename}
      />
    </article>
  );
}

export default StoriesGrid;
