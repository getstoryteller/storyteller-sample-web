import { notFound } from 'next/navigation';
import ClipsGrid from '@/components/ClipsGrid/ClipsGrid';
import { useGetStorytellerViews } from '@/hooks/useGetStorytellerViews';
import {
  getCategoryNameFromParam,
  getCategoryParamFromName,
} from '@/helpers/getCategoryParam';

export default async function CategoryPage({
  params,
}: {
  params: { collection: string };
}) {
  const { views } = useGetStorytellerViews();
  const collectionName = getCategoryNameFromParam(params.collection);

  const collection = views.find(
    (view) => getCategoryParamFromName(view.title || '') === params.collection,
  )?.collection;

  if (!collection) {
    notFound();
  }

  return (
    <>
      <h1>{collectionName}</h1>
      <ClipsGrid
        basename={collection}
        collection={collection}
        displayLimit={24}
      />
    </>
  );
}
