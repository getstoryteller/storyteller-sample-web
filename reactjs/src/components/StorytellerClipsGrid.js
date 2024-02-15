import { useEffect, useRef } from 'react';
import { StorytellerClipsGridView } from '@getstoryteller/storyteller-sdk-javascript';

import useStoryteller from '../hooks/useStoryteller';
import getStorytellerTheme from '../helpers/themeManager';
import TitleAndMoreButton from './TitleAndMoreButton';

function StorytellerClipsGrid({ title, collection, displayLimit }) {
  const id = 'storyteller-clips-grid-' + collection;
  const clipsGrid = useRef();
  const gridContainer = useRef();

  const { isStorytellerInitialized } = useStoryteller();

  useEffect(() => {
    if (!isStorytellerInitialized) {
      return;
    }

    // This method creates a new Clips grid, replacing the div with the id generated above
    // For more information on creating and configuring Storyteller lists, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-grid-view
    //
    // The grid will display clips from the collection specified
    // For more information on clips and collections, please see
    // https://www.getstoryteller.com/user-guide/clips-and-collections/creating-collections
    clipsGrid.current = new StorytellerClipsGridView(id, collection);
    clipsGrid.current.configuration =
      StorytellerClipsGridView.ListConfiguration({
        displayLimit,
        theme: getStorytellerTheme(),
      });

    // The Story Grid has a delegate object attached which allows your code
    // to take actions based on events which happen inside the Storyteller SDK
    // For more information on the various delegate callbacks, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-list-view-delegate
    clipsGrid.current.delegate = {
      // This function is called when the Story data has been loaded from our API
      // In the sample implementation, we check if there was an error or if no
      // stories were returned and if so, we find the relevant element and hide it
      // In general, we recommend this as a sensible approach in most cases
      onDataLoadComplete: (success, error, dataCount) => {
        if (error || dataCount === 0) {
          if (gridContainer.current) {
            gridContainer.current.style.display = 'none';
          }
        }
      },
    };
  }, [id, collection, displayLimit, isStorytellerInitialized]);

  return (
    <div ref={gridContainer}>
      {title && (
        <TitleAndMoreButton
          title={title}
          moreButton={{
            title: 'More',
            link: encodeURI(`/collection/${collection}`),
          }}
        />
      )}
      <div id={id} data-base-url={collection} className="storyteller"></div>
    </div>
  );
}

export default StorytellerClipsGrid;
