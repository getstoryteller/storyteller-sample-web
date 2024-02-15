import dynamic from 'next/dynamic';
import { Layout, VerticalVideoList, VideoType } from '@/models/content';

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

const StorytellerClipsGridView = dynamic(
  () => import('@/components/StorytellerClipsGridView'),
  { ssr: false },
);
const StorytellerClipsRowView = dynamic(
  () => import('@/components/StorytellerClipsRowView'),
  { ssr: false },
);

interface StorytellerListViewProps {
  list: VerticalVideoList;
  languageSetting: string;
}
const StorytellerListView = ({
  list,
  languageSetting,
}: StorytellerListViewProps) => {
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

  const isRow = list.layout === Layout.row;
  const isGrid = list.layout === Layout.grid;
  const isStoriesList = list.videoType === VideoType.stories;
  const isClipsList = list.videoType === VideoType.clips;

  if (isRow) {
    if (isStoriesList) {
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
    }

    if (isClipsList) {
      return (
        <StorytellerClipsRowView
          key={list.id}
          size={list.size}
          displayLimit={list.count}
          collection={list.collection}
          title={list.title}
          moreButtonTitle={list.moreButtonTitle}
        />
      );
    }
  }

  if (isGrid) {
    if (isStoriesList) {
      return (
        <StorytellerStoriesGridView
          key={list.id}
          categories={categories}
          title={list.title}
          displayLimit={list.count}
          moreButtonTitle={list.moreButtonTitle}
        />
      );
    }

    if (isClipsList) {
      return (
        <StorytellerClipsGridView
          key={list.id}
          displayLimit={list.count}
          collection={list.collection}
          title={list.title}
          moreButtonTitle={list.moreButtonTitle}
        />
      );
    }
  }

  return null;
};

export default StorytellerListView;
