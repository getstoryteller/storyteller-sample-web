import { notFound } from 'next/navigation';
import StoriesGrid from '@/components/StoriesGrid/StoriesGrid';
import { useGetStorytellerViews } from '@/hooks/useGetStorytellerViews';
import {
  getCategoryNameFromParam,
  getCategoryParamFromName,
} from '@/helpers/getCategoryParam';

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { views } = useGetStorytellerViews();
  const categoryName = getCategoryNameFromParam(params.category);

  const categories = views.find(
    (view) => getCategoryParamFromName(view.title || '') === params.category,
  )?.categories;

  if (!categories) {
    notFound();
  }

  return (
    <>
      <h1>{categoryName}</h1>
      <StoriesGrid
        basename={categories.join('-')}
        categories={categories}
        displayLimit={24}
      />
    </>
  );
}
