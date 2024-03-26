import dynamic from 'next/dynamic';
import { CellType } from '@getstoryteller/storyteller-sdk-javascript';
import type { StorytellerView } from '@/api/getStorytellerViews';

// This component is responsible for rendering a single Storyteller unit.
// It converts the "StorytellerView" model from the API into
// wrapper React components.

const ClipsGrid = dynamic(() => import('@/components/ClipsGrid/ClipsGrid'), {
  ssr: false,
});
const ClipsRow = dynamic(() => import('@/components/ClipsRow/ClipsRow'), {
  ssr: false,
});

const StoriesGrid = dynamic(
  () => import('@/components/StoriesGrid/StoriesGrid'),
  {
    ssr: false,
  },
);
const StoriesRow = dynamic(() => import('@/components/StoriesRow/StoriesRow'), {
  ssr: false,
});

export default function StorytellerView({
  id,
  categories,
  collection,
  count,
  layout,
  moreButtonTitle,
  tileType,
  title,
  size,
  videoType,
}: StorytellerView) {
  const viewProps = {
    basename: id,
    displayLimit: count,
    moreButtonTitle,
    title,
  };

  const showGridView =
    layout === 'grid' || layout === 'singleton' || count === 1;

  if (videoType === 'clips' && collection) {
    if (showGridView) {
      return <ClipsGrid key={id} collection={collection} {...viewProps} />;
    }

    return (
      <ClipsRow key={id} collection={collection} size="large" {...viewProps} />
    );
  }

  if (showGridView) {
    return <StoriesGrid key={id} categories={categories} {...viewProps} />;
  }

  return (
    <StoriesRow
      key={id}
      categories={categories}
      cellType={tileType === 'round' ? CellType.round : CellType.square}
      size={tileType === 'round' ? size : 'large'}
      {...viewProps}
    />
  );
}
