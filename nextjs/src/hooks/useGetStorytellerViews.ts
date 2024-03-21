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
}
