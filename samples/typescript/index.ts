import Storyteller from "@getstoryteller/storyteller-sdk-javascript";
import GridViewRenderer from "@getstoryteller/storyteller-sdk-javascript/dist/row/gridViewRenderer";
import RowViewRenderer from "@getstoryteller/storyteller-sdk-javascript/dist/row/rowViewRenderer";

const API_KEY = "d88b57d2-843a-4692-b975-27088c9a1915";
let storyRow: RowViewRenderer;
let topStoryRow: RowViewRenderer;
let storyGrid: GridViewRenderer;

(() => {
  ready(() => {
    Storyteller.sharedInstance
      .initialize(API_KEY)
      .then(() => {
        const gridCols = document.documentElement.clientWidth < 768 ? 2 : 5;

        const theme = new Storyteller.Theme({
          lists: {
            row: {
              endInset: 16,
              startInset: 16,
            },
            grid: {
              columns: gridCols,
            },
          },
          storyTiles: {
            chip: {
              show: false,
            },
            rectangularTile: {
              showWebStoriesIcon: true,
            },
          },
        });

        Storyteller.sharedInstance.theme = new Storyteller.UiTheme({
          light: theme,
          dark: theme,
        });

        initializeRows();
      })
      .catch((e) => {
        console.warn(e);
      });
  });

  function ready(fn: () => void) {
    if (
      (document as any).attachEvent
        ? document.readyState === "complete"
        : document.readyState !== "loading"
    ) {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  function initializeRows() {
    storyRow = new Storyteller.RowView("default-stories", []);
    storyRow.delegate = {
      onUserActivityOccurred: (type, data) =>
        console.log("activity", type, data),
      tileBecameVisible: (index) => console.log(index),
      onStoriesDataLoadComplete: (success, error, dataCount) => {
        if (error || dataCount === 0) {
          const storyRowEl = document.getElementById("default-stories");
          if (storyRowEl) {
            storyRowEl.style.display = "none";
          }
        }
      },
    };

    topStoryRow = new Storyteller.RowView("top-stories-row", []);
    topStoryRow.delegate = {
      onUserActivityOccurred: (type, data) =>
        console.log("activity", type, data),
      tileBecameVisible: (index) => console.log(index),
      onStoriesDataLoadComplete: (success, error, dataCount) => {
        if (error || dataCount === 0) {
          const topStoriesRowElem = document.getElementById("top-stories-row");
          if (topStoriesRowElem) {
            topStoriesRowElem.style.display = "none";
          }
        }
      },
    };

    storyGrid = new Storyteller.GridView("stories-grid", []);
  }
})();
