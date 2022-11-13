const API_KEY = 'd88b57d2-843a-4692-b975-27088c9a1915';
const USER_ID = 'test-user-dave';
let storyRow;
let topStoryRow;
let storyGrid;

(function () {
  ready(function () {
    Storyteller.sharedInstance
      .initialize(API_KEY, { externalId: USER_ID })
      .then(function () {
        const theme = {
          lists: {
            row: {
              endInset: 16,
              startInset: 16
            },
            grid: {
              columns: 4,
            }
          },
          instructions: {
            backgroundColor: 'white',
            headingColor: 'black',
            subHeadingColor: '#1a1a1a',
            button: {
              backgroundColor: '#1C62EB',
              textColor: 'white',
            },
            icons: {
              back: './arrow-back.svg',
              forward: './arrow-forward.svg',
              pause: './pause.svg',
              swipe: './swipe.svg',
            },  
          },
          player: {
            showStoryIcon: false,
          }
        };
        Storyteller.sharedInstance.theme = new Storyteller.UiTheme({
          light: theme,
          dark: theme
        });
        initializeRows();
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
    storyRow.delegate = {
      onUserActivityOccurred: (type, data) => console.log('activity', type, data),
      tileBecameVisible: (index) => console.log(index)
    }

    topStoryRow = new Storyteller.RowView('top-stories-row');
    topStoryRow.delegate = {
      onUserActivityOccurred: (type, data) => console.log('activity', type, data),
      tileBecameVisible: (index) => console.log(index)
    }

    storyGrid = new Storyteller.GridView('stories-grid');
  }
})();