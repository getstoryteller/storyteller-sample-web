import { useEffect, useRef } from 'react';
import { StorytellerClipsRowView } from '@getstoryteller/storyteller-sdk-javascript';

import useStoryteller from '../hooks/useStoryteller';
import getStorytellerTheme from '../helpers/themeManager';
import TitleAndMoreButton from './TitleAndMoreButton';

function StorytellerClipsRow({ title, size, collection, displayLimit }) {
  const id = 'storyteller-clips-row-' + collection;
  const clipsRow = useRef();
  const rowContainer = useRef();

  let height = 140;
  switch (size) {
    case 'medium':
      height = 240;
      break;
    case 'large':
      height = 350;
      break;
    default:
      break;
  }

  const { isStorytellerInitialized } = useStoryteller();

  useEffect(() => {
    if (!isStorytellerInitialized) {
      return;
    }

    // This method creates a new Clips row, replacing the div with the id generated above
    // For more information on creating and configuring Storyteller lists, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-row-view
    //
    // The row will display clips from the collection specified
    // For more information on clips and collections, please see
    // https://www.getstoryteller.com/user-guide/clips-and-collections/creating-collections
    clipsRow.current = new StorytellerClipsRowView(id, collection);
    clipsRow.current.configuration = {
      displayLimit,
      theme: getStorytellerTheme(),
    };

    // The Story Row has a delegate object attached which allows your code
    // to take actions based on events which happen inside the Storyteller SDK
    // For more information on the various delegate callbacks, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-list-view-delegate
    clipsRow.current.delegate = {
      // This function is called when the Story data has been loaded from our API
      // In the sample implementation, we check if there was an error or if no
      // stories were returned and if so, we find the relevant element and hide it
      // In general, we recommend this as a sensible approach in most cases
      onDataLoadComplete: (success, error, dataCount) => {
        if (error || dataCount === 0) {
          if (rowContainer && rowContainer.current) {
            rowContainer.current.style.display = 'none';
          }
        }
      },
    };
  }, [id, collection, displayLimit, isStorytellerInitialized]);

  // Note that the div which is being used to render the Storyteller Row
  // needs to have an explicit height set (as shown below) otherwise the
  // Storyteller Row will not render correctly
  return (
    <div ref={rowContainer}>
      {title && (
        <TitleAndMoreButton
          title={title}
          moreButton={{
            title: 'More',
            link: encodeURI(`/collection/${collection}`),
          }}
        />
      )}
      <div
        id={id}
        style={{ height: `${height}px` }}
        data-base-url={collection}
        className="storyteller"
      ></div>
    </div>
  );
}

export default StorytellerClipsRow;
