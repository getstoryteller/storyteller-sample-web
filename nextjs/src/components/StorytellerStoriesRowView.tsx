'use client';

import { useEffect, useRef } from 'react';
import {
  CellType,
  StorytellerStoriesRowView as RowView,
  UiTheme,
} from '@getstoryteller/storyteller-sdk-javascript';
import { Size, TileType } from '@/models/content';
import buildBasicTheme from '@/helpers/buildBasicTheme';
import useStoryteller from '@/hooks/useStoryteller';
import TitleAndMoreButton from '@/components/TitleAndMoreButton';

interface StorytellerStoriesRowViewProps {
  tileType: keyof typeof TileType;
  size: keyof typeof Size;
  categories: string[];
  title?: string;
  moreButtonTitle?: string;
  displayLimit?: number;
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
  const storyRow = useRef<RowView>();

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
    storyRow.current.configuration = RowView.ListConfiguration({
      cellType: tileType === TileType.round ? CellType.round : CellType.square,
      displayLimit,
      theme: new UiTheme({
        light: buildBasicTheme(),
        dark: buildBasicTheme(),
      }),
    });
  }, [id, categories, displayLimit, tileType, isStorytellerInitialized]);

  return (
    <div>
      {title && (
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
      )}
      <div
        id={id}
        style={{ height: `${height}px` }}
        data-base-url={urlSafeCategories}
      />
    </div>
  );
};

export default StorytellerStoriesRowView;
