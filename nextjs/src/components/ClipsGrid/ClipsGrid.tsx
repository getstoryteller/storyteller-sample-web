'use client';

import { useContext, useEffect, useRef } from 'react';
import {
  IListConfiguration,
  StorytellerClipsGridView,
} from '@getstoryteller/storyteller-sdk-javascript';
import { useUiStyle } from '@/hooks/useUiStyle';
import { getCategoryParamFromName } from '@/helpers/getCategoryParam';
import { StorytellerContext } from '@/contexts/StorytellerContext';
import { useViewStatus, ViewStatus } from '@/hooks/useViewStatus';
import { StorytellerViewHeader } from '../StorytellerViewHeader/StorytellerViewHeader';

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
  const { uiStyle } = useUiStyle();
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
        uiStyle,
      };

    clipsGrid.current.configuration = clipsGridConfiguration;
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
                  link: `/collection/${getCategoryParamFromName(title)}`,
                }
              : undefined
          }
        />
      )}
      <div id={basename} data-base-url={title || collection} />
    </article>
  );
}

export default ClipsGrid;
