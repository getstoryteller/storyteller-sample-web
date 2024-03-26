'use client';

import { useContext, useEffect, useRef } from 'react';
import {
  IListConfiguration,
  StorytellerClipsRowView,
} from '@getstoryteller/storyteller-sdk-javascript';
import { useUiStyle } from '@/hooks/useUiStyle';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { getCategoryParamFromName } from '@/helpers/getCategoryParam';
import { StorytellerContext } from '@/contexts/StorytellerContext';
import { useViewStatus, ViewStatus } from '@/hooks/useViewStatus';
import { StorytellerViewHeader } from '../StorytellerViewHeader/StorytellerViewHeader';

import styles from './ClipsRow.module.scss';

interface StorytellerClipsRowViewProps {
  basename: string;
  collection: string;
  displayLimit?: number;
  moreButtonTitle?: string;
  size?: 'regular' | 'medium' | 'large';
  title?: string;
}

function ClipsRow({
  basename,
  collection,
  displayLimit = 25,
  moreButtonTitle,
  size = 'regular',
  title,
}: StorytellerClipsRowViewProps) {
  const { windowWidth } = useWindowWidth();
  const { uiStyle } = useUiStyle();
  const { viewProps, setViewStatus: setClipsStatus } = useViewStatus();
  const { isStorytellerInitialized } = useContext(StorytellerContext);
  const clipsRow = useRef<StorytellerClipsRowView>();

  useEffect(() => {
    if (
      !isStorytellerInitialized ||
      clipsRow.current ||
      !basename ||
      !collection
    ) {
      return;
    }

    // This method creates a new Storyteller row, replacing the div with the basename as its ID
    // For more information on creating and configuring Storyteller lists, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-row-view
    //
    // The row will display clips from the specified collection
    // For more information on clips and collections, please see
    // https://www.getstoryteller.com/user-guide/clips-and-collections/creating-collections
    clipsRow.current = new StorytellerClipsRowView(basename, collection);

    clipsRow.current.delegate = {
      onDataLoadComplete(success, error, dataCount) {
        setClipsStatus(
          !!error || dataCount === 0 ? ViewStatus.error : ViewStatus.success,
        );
      },
    };
  }, [basename, collection, isStorytellerInitialized, setClipsStatus]);

  useEffect(() => {
    if (!isStorytellerInitialized || !clipsRow.current) {
      return;
    }

    const clipsRowConfiguration: IListConfiguration<'StorytellerClipsRowView'> =
      {
        basename,
        displayLimit,
        uiStyle,
      };

    clipsRow.current.configuration = clipsRowConfiguration;
  }, [basename, displayLimit, isStorytellerInitialized, uiStyle]);

  return (
    <article className={styles.clipsRow} data-size={size} {...viewProps}>
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
        style={{ height: 'var(--row-height)' }}
        data-base-url={title || collection}
      />
    </article>
  );
}

export default ClipsRow;
