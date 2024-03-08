import { useEffect, useRef } from 'react';
import {
  CellType,
  StorytellerStoriesRowView,
} from '@getstoryteller/storyteller-sdk-javascript';

import useStoryteller from '../hooks/useStoryteller';
import getStorytellerTheme from '../helpers/themeManager';
import TitleAndMoreButton from './TitleAndMoreButton';

function StorytellerStoriesRow({
  title,
  tileType,
  size,
  categories,
  displayLimit,
}) {
  const urlSafeCategories = categories ? categories.join('-') : 'home';
  const id = 'storyteller-stories-row-' + urlSafeCategories;
  const storyRow = useRef();
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

    // This method creates a new Stories row, replacing the div with the id generated above
    // For more information on creating and configuring Storyteller lists, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-row-view
    //
    // The row will display stories from the categories contained in the categories array
    // For more information on stories and categories, please see
    // https://www.getstoryteller.com/user-guide/stories-and-scheduling/categories
    storyRow.current = new StorytellerStoriesRowView(id, categories);
    storyRow.current.configuration = {
      cellType: tileType === 'round' ? CellType.round : CellType.square,
      displayLimit,
      preload: true,
      theme: getStorytellerTheme(),
    };

    // The Story Row has a delegate object attached which allows your code
    // to take actions based on events which happen inside the Storyteller SDK
    // For more information on the various delegate callbacks, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-list-view-delegate
    storyRow.current.delegate = {
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
  }, [id, categories, displayLimit, tileType, isStorytellerInitialized]);

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
            link: encodeURI(`/category/${urlSafeCategories}`),
          }}
        />
      )}
      <div
        id={id}
        style={{ height: `${height}px` }}
        data-base-url={urlSafeCategories}
        className="storyteller"
      ></div>
    </div>
  );
}

export default StorytellerStoriesRow;
