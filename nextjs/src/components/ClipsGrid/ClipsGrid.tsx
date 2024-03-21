'use client';

import { useContext, useEffect, useRef, type CSSProperties } from 'react';
import {
  IListConfiguration,
  StorytellerClipsGridView,
  UiStyle,
  UiTheme,
} from '@getstoryteller/storyteller-sdk-javascript';
import { getCategoryParamFromName } from '@/helpers/getCategoryParam';
import { StorytellerContext } from '@/contexts/StorytellerContext';
import {
  buildBasicTheme,
  GRID_COLUMNS,
  TILE_SPACING,
} from '@/helpers/buildBasicTheme';
import { useViewStatus, ViewStatus } from '@/hooks/useViewStatus';
import { StorytellerViewHeader } from '../StorytellerViewHeader/StorytellerViewHeader';

import styles from '../StoriesGrid/StoriesGrid.module.scss';

interface StorytellerClipsGridViewProps {
  basename: string;
  collection: string;
  displayLimit?: number;
  moreButtonTitle?: string;
  title?: string;
}

function ClipsGrid({
  basename,
  collection,
  displayLimit,
  moreButtonTitle,
  title,
}: StorytellerClipsGridViewProps) {
  const { viewProps, setViewStatus: setClipsStatus } = useViewStatus();
  const { isStorytellerInitialized } = useContext(StorytellerContext);
  const clipsGrid = useRef<StorytellerClipsGridView>();

  useEffect(() => {
    if (
      !isStorytellerInitialized ||
      clipsGrid.current ||
      !basename ||
      !collection
    ) {
      return;
    }

    // This method creates a new Storyteller clips grid, replacing the div with the basename as its ID
    // For more information on creating and configuring Storyteller lists, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-grid-view
    //
    // The grid will display clips from the specified collection
    // For more information on clips and collections, please see
    // https://www.getstoryteller.com/user-guide/clips-and-collections/creating-collections
    clipsGrid.current = new StorytellerClipsGridView(basename, collection);

    clipsGrid.current.delegate = {
      onDataLoadComplete(success, error, dataCount) {
        setClipsStatus(
          !!error || dataCount === 0 ? ViewStatus.error : ViewStatus.success,
        );
      },
    };
  }, [basename, collection, isStorytellerInitialized, setClipsStatus]);

  useEffect(() => {
    if (!isStorytellerInitialized || !clipsGrid.current) {
      return;
    }

    const clipsGridConfiguration: IListConfiguration<'StorytellerClipsGridView'> =
      {
        basename,
        displayLimit,
        theme: new UiTheme({
          light: buildBasicTheme(),
          dark: buildBasicTheme(),
        }),
        uiStyle: UiStyle.dark,
      };

    clipsGrid.current.configuration = clipsGridConfiguration;
  }, [basename, displayLimit, isStorytellerInitialized]);

  const gridRows = Math.floor((displayLimit || 4) / GRID_COLUMNS);

  return (
    <article data-view-type="grid" {...viewProps}>
      {title && (
        <StorytellerViewHeader
          title={title}
          moreButton={
            moreButtonTitle
              ? {
                  title: moreButtonTitle,
                  link: `/collection/${getCategoryParamFromName(title)}`,
                }
              : undefined
          }
        />
      )}
      <div
        id={basename}
        data-base-url={title || collection}
        className={styles.storyGrid}
        style={
          {
            '--tile-spacing': `${TILE_SPACING}px`,
            '--grid-columns': displayLimit === 1 ? 1 : GRID_COLUMNS,
            '--grid-rows': displayLimit === 1 ? 1 : gridRows,
          } as CSSProperties
        }
      />
    </article>
  );
}

export default ClipsGrid;
