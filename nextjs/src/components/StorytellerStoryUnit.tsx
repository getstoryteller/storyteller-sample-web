import { Layout, VerticalVideoList, VideoType } from '@/models/content';
import dynamic from 'next/dynamic';

// This component is responsible for rendering a single Storyteller unit.
// It converts the "Vertical Video List" model from the API into
// wrapper React components.

const StorytellerStoriesGridView = dynamic(
  () => import('@/components/StorytellerStoriesGridView'),
  { ssr: false },
);
const StorytellerStoriesRowView = dynamic(
  () => import('@/components/StorytellerStoriesRowView'),
  { ssr: false },
);

interface StorytellerStoryUnitProps {
  list: VerticalVideoList;
  languageSetting: string;
}
const StorytellerStoryUnit = ({
  list,
  languageSetting,
}: StorytellerStoryUnitProps) => {
  // On the settings page, the user is able to select the language which they
  // want to view content in.
  //
  // The API returns a row with the category set to "targeted-[LANGUAGE]"".
  // Here we replace the [LANGUAGE] portion of the category name with the
  // language with the user has selected. This means each Storyteller row or
  // grid requests a category like "targeted-en" or "targeted-fr".
  // These categories are configured in the Storyteller CMS.
  const categories =
    list.categories?.map((category) =>
      category.replace('[LANGUAGE]', languageSetting),
    ) || [];
  //
  const isRowOfStories =
    list.layout === Layout.row && list.videoType === VideoType.stories;
  const isGridOfStories =
    list.layout === Layout.grid && list.videoType === VideoType.stories;
  if (isRowOfStories) {
    return (
      <StorytellerStoriesRowView
        key={list.id}
        tileType={list.tileType}
        size={list.size}
        displayLimit={list.count}
        categories={categories}
        title={list.title}
        moreButtonTitle={list.moreButtonTitle}
      />
    );
  } else if (isGridOfStories) {
    return (
      <StorytellerStoriesGridView
        key={list.id}
        categories={categories}
        title={list.title}
        displayLimit={list.count}
        moreButtonTitle={list.moreButtonTitle}
      />
    );
  } else {
    return null;
  }
};

export default StorytellerStoryUnit;
