'use client';

import { notFound } from 'next/navigation';
import { CategoryHeader } from '@/components/CategoryHeader/CategoryHeader';
import StoriesGrid from '@/components/StoriesGrid/StoriesGrid';
import { useGetStorytellerViews } from '@/hooks/useGetStorytellerViews';
import {
  getCategoryNameFromParam,
  getCategoryParamFromName,
} from '@/helpers/getCategoryParam';

export function Category({ category }: { category: string }) {
  const { views } = useGetStorytellerViews();
  const categoryName = getCategoryNameFromParam(category);

  const categories = views.find(
    (view) => getCategoryParamFromName(view.title || '') === category,
  )?.categories;

  if (!categories) {
    notFound();
  }

  return (
    <>
      <CategoryHeader title={categoryName} />
      <StoriesGrid
        basename={categories.join('-')}
        categories={categories}
        displayLimit={24}
      />
    </>
  );
}
