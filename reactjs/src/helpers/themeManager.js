import { UiTheme } from '@getstoryteller/storyteller-sdk-javascript';

// This function defines the theme for the Storyteller UI.
// For more details on the various properties, please refer to the documentation at
// https://www.getstoryteller.com/documentation/web/themes
function getStorytellerTheme() {
  const gridCols = window.innerWidth < 680 ? 2 : 4;
  const lightTheme = {
    lists: {
      backgroundColor: '#FFFFFF',
      row: {
        endInset: 16,
        startInset: 16,
      },
      grid: {
        columns: gridCols,
        startInset: 16,
        endInset: 16,
      },
    },
    storyTiles: {
      rectangularTile: {
        showGradient: false,
      },
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
        back: '/arrow-back.svg',
        forward: '/arrow-forward.svg',
        pause: '/pause.svg',
        swipe: '/swipe.svg',
      },
    },
    player: {
      showStoryIcon: false,
    },
    engagementUnits: {
      poll: {
        answerTextColor: '#1a1a1a',
        selectedAnswerBorderColor: 'white',
        answeredMessageTextColor: 'white',
      },
    },
  };
  const darkTheme = {
    lists: {
      backgroundColor: '#000000',
      grid: {
        columns: gridCols,
        startInset: 16,
        endInset: 16,
      },
      row: {
        startInset: 16,
        endInset: 16,
      },
    },
  };
  return new UiTheme({
    light: lightTheme,
    dark: darkTheme,
  });
}

export default getStorytellerTheme;
