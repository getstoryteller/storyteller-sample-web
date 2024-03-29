'use client';

import { useEffect, useRef } from 'react';
import {
  StorytellerClipsGridView as GridView,
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

interface StorytellerClipsGridViewProps {
  collection: string;
  title?: string;
  moreButtonTitle?: string;
  displayLimit?: number;
}

const StorytellerClipsGridView = ({
  collection,
  title,
  displayLimit,
  moreButtonTitle,
}: StorytellerClipsGridViewProps) => {
  const id = 'storyteller-clips-grid-view-' + collection;
  const clipsGrid = useRef<GridView>();
  const { isStorytellerInitialized } = useStoryteller();

  useEffect(() => {
    if (!isStorytellerInitialized) {
      return;
    }
    // This method creates a new Storyteller stories grid, replacing the div with the id generated above
    // For more information on creating and configuring Storyteller lists, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-grid-view
    //
    // The grid will display clips from the specified collection
    // For more information on clips and collections, please see
    // https://www.getstoryteller.com/user-guide/clips-and-collections/creating-collections
    clipsGrid.current = new GridView(id, collection);
    clipsGrid.current.configuration = {
      displayLimit,
      theme: new UiTheme({
        light: FOUR_COLUMNS_LAYOUT,
        dark: FOUR_COLUMNS_LAYOUT,
      }),
    };
  }, [id, collection, displayLimit, isStorytellerInitialized]);

  return (
    <>
      <TitleAndMoreButton
        title={title}
        moreButton={
          moreButtonTitle
            ? {
                title: moreButtonTitle,
                link: encodeURI(`/collection/${collection}/${title}`),
              }
            : undefined
        }
      />
      <div id={id} data-base-url={collection} />
    </>
  );
};

export default StorytellerClipsGridView;
