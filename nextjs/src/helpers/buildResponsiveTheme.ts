import {
  Alignment,
  Subset,
  Theme,
} from '@getstoryteller/storyteller-sdk-javascript';

// This function defines the theme for the Storyteller UI.
// For more details on the various properties, please refer to the documentation at
// https://www.getstoryteller.com/documentation/web/themes

export const TILE_SPACING = 8;

export const getGridColumns = (windowWidth: number) => {
  switch (true) {
    case windowWidth >= 860:
      return 4;
    default:
      return 2;
  }
};

const buildResponsiveTheme = (windowWidth: number) => ({
  primitives: {
    cornerRadius: 8,
  },
  colors: {
    primary: 'rgba(28, 98, 235, 1)',
  },
  lists: {
    backgroundColor: 'var(--bg-level-0)',
    row: {
      tileSpacing: TILE_SPACING,
      scrollIndicatorFade: true,
      endInset: 0,
      startInset: 0,
    },
    grid: {
      tileSpacing: TILE_SPACING,
      columns: getGridColumns(windowWidth),
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
        backgroundColor: 'rgba(28, 98, 235, 1)',
        textColor: 'rgba(255, 255, 255, 1)',
      },
      showGradient: true,
    },
    circularTile: {
      title: {
        unreadTextColor: 'var(--text-contrast-100)',
        readTextColor: 'var(--text-contrast-100)',
      },
      unreadIndicatorColor: 'rgba(28, 98, 235, 1)',
    },
    title: {
      alignment: Alignment.center,
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
  font: 'var(--type-storyteller)',
});

export const buildResponsiveLightTheme = (
  windowWidth: number,
): Subset<Theme> => {
  const baseTheme = buildResponsiveTheme(windowWidth);

  return {
    ...baseTheme,
    lists: {
      ...baseTheme.lists,
      row: {
        ...baseTheme.lists.row,
        scrollIndicatorBackgroundColor: 'rgba(255, 255, 255, 1)',
        scrollIndicatorColor: 'rgba(26, 26, 26, 0.7)',
      },
    },
  };
};

export const buildResponsiveDarkTheme = (
  windowWidth: number,
): Subset<Theme> => {
  const baseTheme = buildResponsiveTheme(windowWidth);

  return {
    ...baseTheme,
    lists: {
      ...baseTheme.lists,
      row: {
        ...baseTheme.lists.row,
        scrollIndicatorBackgroundColor: 'rgba(23, 26, 37, 1)',
        scrollIndicatorColor: 'rgba(255, 255, 255, 0.8)',
      },
    },
  };
};
