import { useEffect, useRef } from 'react';
import Storyteller from '@getstoryteller/storyteller-sdk-javascript';

import useStoryteller from '../hooks/useStoryteller';
import getStorytellerTheme from '../helpers/themeManager';

function StorytellerStoriesRow({ tileType, size, categories, displayLimit }) {
  const urlSafeCategories = categories ? categories.join('-') : 'top';
  const id = 'storyteller-stories-row-' + urlSafeCategories;
  const storyRow = useRef();

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

    // This method creates a new Storyteller row, replacing the div with the id generated above
    // For more information on creating and configuring Storyteller lists, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-row-view
    // 
    // The row will display stories from the categories contained in the categories array
    // For more information on stories and categories, please see
    // https://www.getstoryteller.com/user-guide/stories-and-scheduling/categories
    storyRow.current = new Storyteller.RowView(id, categories);
    storyRow.current.displayLimit = displayLimit;
    storyRow.current.theme = getStorytellerTheme();
    storyRow.current.cellType =
      tileType === 'round'
        ? Storyteller.CellType.round
        : Storyteller.CellType.square;
    // The Story Row has a delegate object attached which allows your code
    // to take actions based on events which happen inside the Storyteller SDK
    // For more information on the various delegate callbacks, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-list-view-delegate
    storyRow.current.delegate = {
      // This callback is used to inform your code about actions which a user
      // takes inside Storyteller. Here we are logging the relevant information
      // to the console, but see the NextJS sample for an example of sending
      // this data to Amplitude.
      // For more information on the events and associated data, please see:
      // https://www.getstoryteller.com/documentation/web/analytics
      onUserActivityOccurred: (type, data) => {
        console.log('Storyteller Activity Occurred', type, data);
      },
      // This function is called when the Story data has been loaded from our API
      // In the sample implementation, we check if there was an error or if no
      // stories were returned and if so, we find the relevant element and hide it
      // In general, we recommend this as a sensible approach in most cases
      onStoriesDataLoadComplete: (success, error, dataCount) => {
        if (error || dataCount === 0) {
          if (storyRow && storyRow.current) {
            storyRow.current.rootEl.style.display = 'none';
          }
        }
      },
    };
  }, [id, categories, displayLimit, tileType, isStorytellerInitialized]);

  // Note that the div which is being used to render the Storyteller Row
  // needs to have an explicit height set (as shown below) otherwise the
  // Storyteller Row will not render correctly
  return (
    <div
      id={id}
      style={{ height: `${height}px` }}
      data-base-url={urlSafeCategories}
      className="storyteller"
    ></div>
  );
}

export default StorytellerStoriesRow;
