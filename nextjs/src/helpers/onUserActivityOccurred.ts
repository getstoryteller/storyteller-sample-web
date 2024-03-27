// For more information on the events and associated data, please see:
// https://www.getstoryteller.com/documentation/web/analytics

import {
  ActivityType,
  type UserActivityData,
} from '@getstoryteller/storyteller-sdk-javascript';

export const onUserActivityOccurred = (
  type: ActivityType,
  data: UserActivityData,
) => {
  // For Stories:

  // Track every Story Page view
  if (type === ActivityType.openedPage) {
    console.log(`Page ${data.pageId} was opened.`);

    // Track the initial click on the tile
    if (data.openedReason === 'storyListTap') {
      console.log(`Page ${data.pageId} was opened from the Story list`);
    }
  }

  // For Clips:

  // Track every Clip view
  if (type === ActivityType.openedClip) {
    console.log(`Clip ${data.clipId} was opened.`);

    // Track the initial click on the tile
    if (data.openedReason === 'clipListTap') {
      console.log(`Clip ${data.clipId} was opened from the Clip list`);
    }
  }
};
