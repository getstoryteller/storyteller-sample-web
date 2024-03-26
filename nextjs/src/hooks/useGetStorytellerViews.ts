'use client';

import { useEffect, useState } from 'react';
import { CellType } from '@getstoryteller/storyteller-sdk-javascript';
import { useEnvVariables } from './useEnvVariables';

export type StorytellerView = {
  categories: string[];
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
  const { storytellerApiKey } = useEnvVariables();
  const [views, setViews] = useState<StorytellerView[]>([]);
  const [status, setStatus] = useState<Status>('initial');

  useEffect(() => {
    if (!storytellerApiKey) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sampleappcontent.usestoryteller.com/api/entries?apiKey=${storytellerApiKey}`,
        );
        const result = await response.json();

        setViews(result.data);
        setStatus('success');
      } catch (err) {
        setStatus('error');
      }
    };

    fetchData();
  }, [storytellerApiKey]);

  return { views, status };
}
