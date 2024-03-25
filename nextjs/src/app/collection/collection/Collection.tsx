'use client';

import { notFound } from 'next/navigation';
import { CategoryHeader } from '@/components/CategoryHeader/CategoryHeader';
import ClipsGrid from '@/components/ClipsGrid/ClipsGrid';
import { useGetStorytellerViews } from '@/hooks/useGetStorytellerViews';
import {
  getCategoryNameFromParam,
  getCategoryParamFromName,
} from '@/helpers/getCategoryParam';

export function Collection({ collection }: { collection: string }) {
  const { views } = useGetStorytellerViews();
  const collectionName = getCategoryNameFromParam(collection);

  const gridCollection = views.find(
    (view) => getCategoryParamFromName(view.title || '') === collection,
  )?.collection;

  if (!gridCollection) {
    notFound();
  }

  return (
    <>
      <CategoryHeader title={collectionName} />
      <ClipsGrid
        basename={gridCollection}
        collection={gridCollection}
        displayLimit={24}
      />
    </>
  );
}
