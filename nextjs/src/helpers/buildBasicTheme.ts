import { Alignment } from '@getstoryteller/storyteller-sdk-javascript';

// This function defines the theme for the Storyteller UI.
// For more details on the various properties, please refer to the documentation at
// https://www.getstoryteller.com/documentation/web/themes

export const TILE_SPACING = 8;
export const GRID_COLUMNS = 2;

export const buildBasicTheme = () => ({
  primitives: {
    cornerRadius: 8,
  },
  colors: {
    primary: '#F75258',
  },
  lists: {
    backgroundColor: '#0a0a0a',
    row: {
      tileSpacing: TILE_SPACING,
      scrollIndicatorBackgroundColor: '#000000',
      scrollIndicatorColor: '#ffffff',
      scrollIndicatorFade: true,
      endInset: 0,
      startInset: 0,
      topInset: 0,
    },
    grid: {
      tileSpacing: TILE_SPACING,
      columns: GRID_COLUMNS,
      endInset: 0,
      startInset: 0,
      topInset: 0,
      bottomInset: 0,
    },
  },
  storyTiles: {
    liveChip: {
      unreadBackgroundColor: '#C8102E',
      readBackgroundColor: '#4E5356',
    },
    rectangularTile: {
      chip: {
        alignment: Alignment.start,
      },
      unreadIndicator: {
        backgroundColor: '#FBCD44',
        textColor: '#000000',
      },
      showGradient: true,
    },
    circularTile: {
      title: {
        unreadTextColor: '#FFFFFF',
        readTextColor: '#FFFFFF',
      },
      unreadIndicatorColor: '#C8102E',
    },
    title: {
      alignment: Alignment.start,
      textSize: 14,
      lineHeight: 20,
    },
  },
  player: {
    playAllStories: true,
    showStoryIcon: false,
  },
  instructions: {
    show: false,
  },
  font: 'Questrial, sans-serif',
});
