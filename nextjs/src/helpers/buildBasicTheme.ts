// This function defines the theme for the Storyteller UI.
// For more details on the various properties, please refer to the documentation at
// https://www.getstoryteller.com/documentation/web/themes

const storyCellOutlineColor = '#F9BF4B';

const singleRowRoundTheme = {
  storyTiles: {
    title: {
      show: false,
    },
    chip: {
      show: false,
    },
    circularTile: {
      unreadStrokeWidth: 2,
      readStrokeWidth: 2,
      unreadIndicatorColor: storyCellOutlineColor,
      readIndicatorColor: storyCellOutlineColor,
    },
    liveChip: {
      unreadBackgroundColor: storyCellOutlineColor,
      readBackgroundColor: storyCellOutlineColor,
    },
  },
};

const buildBasicTheme = () => ({
  colors: {
    primary: '#F75258',
  },
  font: 'Questrial, sans-serif',
  lists: {
    row: {
      scrollIndicatorIcon: '/caret-forward-outline.svg',
    },
  },
});

export default buildBasicTheme;
