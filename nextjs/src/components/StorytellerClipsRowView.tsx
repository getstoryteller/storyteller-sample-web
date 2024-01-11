'use client';

import { useEffect, useRef } from 'react';
import {
  StorytellerClipsRowView as RowView,
  UiTheme,
} from '@getstoryteller/storyteller-sdk-javascript';
import { Size } from '@/models/content';
import buildBasicTheme from '@/helpers/buildBasicTheme';
import useStoryteller from '@/hooks/useStoryteller';
import TitleAndMoreButton from '@/components/TitleAndMoreButton';

interface StorytellerStoriesRowViewProps {
  size: keyof typeof Size;
  collection: string;
  title?: string | undefined;
  moreButtonTitle?: string | undefined;
  displayLimit?: number | undefined;
}

const StorytellerStoriesRowView = ({
  size,
  collection,
  title,
  displayLimit,
  moreButtonTitle,
}: StorytellerStoriesRowViewProps) => {
  const id = 'storyteller-clips-row-view-' + collection;
  const clipsRow = useRef<RowView>();

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
    clipsRow.current = new RowView(id, collection);
    clipsRow.current.configuration = RowView.ListConfiguration({
      displayLimit,
      theme: new UiTheme({
        light: buildBasicTheme(),
        dark: buildBasicTheme(),
      }),
    });
  }, [id, collection, displayLimit, isStorytellerInitialized]);

  return (
    <div>
      {title && (
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
      )}
      <div
        id={id}
        style={{ height: `${height}px` }}
        data-base-url={collection}
      />
    </div>
  );
};

export default StorytellerStoriesRowView;
