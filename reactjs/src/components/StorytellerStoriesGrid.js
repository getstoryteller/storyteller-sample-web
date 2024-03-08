import { useEffect, useRef } from 'react';
import { StorytellerStoriesGridView } from '@getstoryteller/storyteller-sdk-javascript';

import useStoryteller from '../hooks/useStoryteller';
import getStorytellerTheme from '../helpers/themeManager';
import TitleAndMoreButton from './TitleAndMoreButton';

function StorytellerStoriesGrid({ title, categories, displayLimit }) {
  const urlSafeCategories = categories ? categories.join('-') : 'home';
  const id = 'storyteller-stories-grid-' + urlSafeCategories;
  const storyGrid = useRef();
  const gridContainer = useRef();

  const { isStorytellerInitialized } = useStoryteller();

  useEffect(() => {
    if (!isStorytellerInitialized) {
      return;
    }

    // This method creates a new Stories grid, replacing the div with the id generated above
    // For more information on creating and configuring Storyteller lists, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-grid-view
    //
    // The grid will display stories from the categories contained in the categories array
    // For more information on stories and categories, please see
    // https://www.getstoryteller.com/user-guide/stories-and-scheduling/categories
    storyGrid.current = new StorytellerStoriesGridView(id, categories);
    storyGrid.current.configuration = {
      displayLimit,
      preload: true,
      theme: getStorytellerTheme(),
    };

    // The Story Grid has a delegate object attached which allows your code
    // to take actions based on events which happen inside the Storyteller SDK
    // For more information on the various delegate callbacks, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-list-view-delegate
    storyGrid.current.delegate = {
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
  }, [id, categories, displayLimit, isStorytellerInitialized]);

  return (
    <div ref={gridContainer}>
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
        data-base-url={urlSafeCategories}
        className="storyteller"
      ></div>
    </div>
  );
}

export default StorytellerStoriesGrid;
