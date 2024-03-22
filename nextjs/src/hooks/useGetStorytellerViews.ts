'use client';

import { useEffect, useState } from 'react';
import { CellType } from '@getstoryteller/storyteller-sdk-javascript';
import { useEnvVariables } from './useEnvVariables';

export type StorytellerView = {
  categories?: string[];
  collection?: string;
  count?: number;
  id: string;
  internalTitle: string;
  layout: 'row' | 'grid' | 'singleton';
  moreButtonTitle?: string;
  size: 'regular' | 'medium' | 'large';
  sortOrder: number;
  tileType: CellType;
  title?: string;
  videoType: 'stories' | 'clips';
};

type Status = 'initial' | 'loading' | 'success' | 'error';

// This is an example of a custom hook that fetches data from the Storyteller API based on some dynamic params
// (in this case, the API key). However, in your own application, you may want to fetch data on the server rather
// than the client. For an example, check our the server/page.tsx file which uses getStorytellerViews instead.

export function useGetStorytellerViews() {
  // @todo
  // const { storytellerApiKey } = useEnvVariables();
  // const [views, setViews] = useState<StorytellerView[]>([]);
  // const [status, setStatus] = useState<Status>('initial');

  // useEffect(() => {
  //   if (!storytellerApiKey) {
  //     return;
  //   }

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://sampleappcontent.usestoryteller.com/api/entries?apiKey=${storytellerApiKey}`,
  //       );
  //       const result = await response.json();

  //       setViews(result.data);
  //       setStatus('success');
  //     } catch (err) {
  //       setStatus('error');
  //     }
  //   };

  //   fetchData();
  // }, [storytellerApiKey]);

  const views: StorytellerView[] = [
    {
      categories: ['live-stories'],
      count: 30,
      layout: 'row',
      size: 'regular',
      sortOrder: 1,
      tileType: 'round',
      videoType: 'stories',
      id: '9h859g',
    },
    {
      categories: ['top-stories'],
      count: 20,
      layout: 'row',
      moreButtonTitle: 'More',
      size: 'medium',
      sortOrder: 2,
      tileType: 'rectangular',
      title: 'Top Stories',
      videoType: 'stories',
      id: 'fvgio',
    },
    {
      categories: [],
      collection: 'opening-week-fire-moments',
      count: 14,
      layout: 'row',
      moreButtonTitle: 'More',
      size: 'medium',
      sortOrder: 3,
      tileType: 'rectangular',
      title: 'Must-see Moments',
      videoType: 'clips',
      id: '9w5dm',
    },
    {
      categories: ['trending-content'],
      count: 20,
      layout: 'row',
      moreButtonTitle: 'More',
      size: 'medium',
      sortOrder: 4,
      tileType: 'rectangular',
      title: 'Trending',
      videoType: 'stories',
      id: 'tuotug',
    },
  ];

  const status = 'success';

  return { views, status };
}
