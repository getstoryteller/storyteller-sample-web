import { getStorytellerViews } from '@/api/getStorytellerViews';
import StorytellerView from '@/components/StorytellerView/StorytellerView';

// This is an example of a component that fetches data on the server side
// (you'll need to set the NEXT_PUBLIC_STORYTELLER_API_KEY environment variable to test this out)
// For a client-side example, check out useGetStorytellerViews.ts

export default async function Server() {
  const views = await getStorytellerViews();

  return (
    <>
      {views.data.map((view) => (
        <StorytellerView key={view.id} {...view} />
      ))}
    </>
  );
}
