'use client';

import { useGetStorytellerViews } from '@/hooks/useGetStorytellerViews';
import StorytellerView from './StorytellerView';

export default function StorytellerViews() {
  const { views } = useGetStorytellerViews();

  return (
    <>
      {views.map((view) => (
        <StorytellerView key={view.id} {...view} />
      ))}
    </>
  );
}
