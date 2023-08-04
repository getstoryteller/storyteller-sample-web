(function () {
  // Replace this with your own API key. You can reach out to hello@getstoryteller.com
  // to obtain an API key.
  const API_KEY = '[API-KEY]';

  let storyRow;
  let topStoryRow;
  let storyGrid;

  ready(function () {
    // This call should be made before initializing any Storyteller rows
    // For more information see https://www.getstoryteller.com/documentation/web/quickstart
    Storyteller.sharedInstance.initialize(API_KEY).then(function () {
      initializeStoryLists();
    });
  });

  function initializeStoryLists() {
    // This method creates a new Storyteller row, replacing the div with id "default-stories"
    // For more information on creating Storyteller lists, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-row-view
    // 
    // The row will display stories from the category with ID "game-stories"
    // For more information on stories and categories, please see
    // https://www.getstoryteller.com/user-guide/stories-and-scheduling/categories
    //
    // Finally, the row has a delegate object attached which allows your code
    // to take actions based on events which happen inside the Storyteller SDK
    // For more information on the various delegate callbacks, please see
    // https://www.getstoryteller.com/documentation/web/storyteller-list-view-delegate
    storyRow = new Storyteller.RowView('default-stories', ['game-stories']);
    storyRow.delegate = {
      // This callback is used to inform your code about actions which a user
      // takes inside Storyteller. Here we are logging the relevant information
      // to the console, but see the NextJS sample for an example of sending
      // this data to Amplitude.
      // For more information on the events and associated data, please see:
      // https://www.getstoryteller.com/documentation/web/analytics
      onUserActivityOccurred: (type, data) =>
        console.log('Storyteller Activity Occurred', type, data),
      // This function is called when the Story data has been loaded from our API
      // In the sample implementation, we check if there was an error or if no
      // stories were returned and if so, we find the relevant element and hide it
      // In general, we recommend this as a sensible approach in most cases
      onStoriesDataLoadComplete: (success, error, dataCount) => {
        if (error || dataCount === 0) {
          document.getElementById('default-stories').style.display = 'none';
        }
      },
    };

    topStoryRow = new Storyteller.RowView('top-stories-row', ['top-stories']);
    topStoryRow.delegate = {
      onUserActivityOccurred: (type, data) =>
        console.log('Storyteller Activity Occurred', type, data),
      onStoriesDataLoadComplete: (success, error, dataCount) => {
        if (error || dataCount === 0) {
          document.getElementById('top-stories-row').style.display = 'none';
        }
      },
    };

    storyGrid = new Storyteller.GridView('stories-grid', ['trending-content']);
  }
})();

// This is a boilerplate function from https://youmightnotneedjquery.com/#ready
function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  ) {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
