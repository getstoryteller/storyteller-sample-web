const apiKey = 'cdf9f393-7dd0-4f77-b2a0-58e3c9f67eab';
const userId = 'test-user';
let storyRow;

(function () {
  ready(function () {
    Storyteller.sharedInstance.initialize(apiKey).then(function () {
      Storyteller.sharedInstance.setUserDetails({ externalId: userId });
      Storyteller.sharedInstance.theme = new Storyteller.Theme({
        row: {
          newIndicatorBackgroundColor: 'white',
          newIndicatorTextColor: 'black',
          newIndicatorAlignment: 'left',
          storyTitleAlignment: 'center',
        },
        player: { showStoryIcon: true },
      });
      initializeRows(apiKey);
    }).catch(e => {
      console.warn(e);
      error = true;
    });
  });

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

  function initializeRows() {
    storyRow = new Storyteller.RowView('default-stories');
    storyRow.theme = new Storyteller.RowTheme({
      leftInset: 16,
      rightInset: 16,
    });

    storyRow.delegate = {
      onUserActivityOccurred: (type, data) => console.log('activity', type, data)
    }
  }
})();