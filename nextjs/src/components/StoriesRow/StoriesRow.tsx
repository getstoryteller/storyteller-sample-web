'use client';

import { useContext, useEffect, useRef, type CSSProperties } from 'react';
import {
  CellType,
  IListConfiguration,
  StorytellerStoriesRowView,
  UiTheme,
} from '@getstoryteller/storyteller-sdk-javascript';
import { useUiStyle } from '@/hooks/useUiStyle';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { getCategoryParamFromName } from '@/helpers/getCategoryParam';
import { StorytellerContext } from '@/contexts/StorytellerContext';
import {
  buildResponsiveLightTheme,
  buildResponsiveDarkTheme,
} from '@/helpers/buildResponsiveTheme';
import { useViewStatus, ViewStatus } from '@/hooks/useViewStatus';
import { StorytellerViewHeader } from '../StorytellerViewHeader/StorytellerViewHeader';
import type { StorytellerView } from '@/api/getStorytellerViews';

import styles from './StoriesRow.module.scss';

interface StorytellerStoriesRowViewProps {
  basename: string;
  categories?: string[];
  cellType?: CellType;
  displayLimit?: number;
  moreButtonTitle?: string;
  onPlayerDismissed?: () => void;
  size?: StorytellerView['size'];
  title?: string;
}

function StoriesRow({
  basename,
  categories = [],
  cellType = CellType.square,
  displayLimit,
  moreButtonTitle,
  onPlayerDismissed,
  size = 'regular',
  title,
}: StorytellerStoriesRowViewProps) {
  const { windowWidth } = useWindowWidth();
  const { uiStyle } = useUiStyle();
  const { viewProps, setViewStatus: setStoriesStatus } = useViewStatus();
  const { isStorytellerInitialized } = useContext(StorytellerContext);
  const storyRow = useRef<StorytellerStoriesRowView>();

  useEffect(() => {
    if (
      !isStorytellerInitialized ||
      storyRow.current ||
      !basename ||
      !categories
    ) {
      return;
    }

    // This method creates a new Storyteller row, replacing the div with the basename as its ID
    // For more information on creating and configuring Storyteller lists, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-row-view
    //
    // The row will display stories from the categories contained in the categories array
    // For more information on stories and categories, please see
    // https://www.getstoryteller.com/user-guide/stories-and-scheduling/categories
    storyRow.current = new StorytellerStoriesRowView(basename, categories);

    storyRow.current.delegate = {
      onDataLoadComplete(success, error, dataCount) {
        setStoriesStatus(
          !!error || dataCount === 0 ? ViewStatus.error : ViewStatus.success,
        );
      },
      onPlayerDismissed() {
        onPlayerDismissed?.();
      },
    };
  }, [
    basename,
    categories,
    isStorytellerInitialized,
    setStoriesStatus,
    onPlayerDismissed,
  ]);

  useEffect(() => {
    if (!isStorytellerInitialized || !storyRow.current) {
      return;
    }

    const storyRowConfiguration: IListConfiguration<'StorytellerStoriesRowView'> =
      {
        basename,
        cellType,
        displayLimit,
        preload: true,
        theme: new UiTheme({
          light: buildResponsiveLightTheme(windowWidth),
          dark: buildResponsiveDarkTheme(windowWidth),
        }),
        uiStyle,
      };

    storyRow.current.configuration = storyRowConfiguration;
  }, [
    basename,
    cellType,
    displayLimit,
    isStorytellerInitialized,
    uiStyle,
    windowWidth,
  ]);

  return (
    <article
      className={styles.storyRow}
      data-size={size}
      data-view-type="row"
      data-cell-type={cellType}
      {...viewProps}
    >
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
        style={
          {
            height: 'var(--row-height)',
          } as CSSProperties
        }
        data-base-url={title ? getCategoryParamFromName(title) : basename}
      />
    </article>
  );
}

export default StoriesRow;
