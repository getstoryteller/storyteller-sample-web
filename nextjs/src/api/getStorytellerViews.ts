import { CellType } from '@getstoryteller/storyteller-sdk-javascript';

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

export async function getStorytellerViews(): Promise<{
  data: StorytellerView[];
}> {
  const res = await fetch(
    `https://sampleappcontent.usestoryteller.com/api/entries?apiKey=${process.env.NEXT_PUBLIC_STORYTELLER_API_KEY}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch Storyteller views');
  }

  return res.json();
}
