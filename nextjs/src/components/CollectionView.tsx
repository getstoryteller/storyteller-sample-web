import React from 'react';
import { useRouter } from 'next/router';
import StorytellerClipsGridView from '@/components/StorytellerClipsGridView';

interface QueryParams {
  collection: string;
  title: string;
}

const CategoryView = () => {
  const router = useRouter();
  const { collection, title } = router.query as unknown as QueryParams;

  return (
    <>
      <h2 className="text-lg sm:text-2xl font-bold leading-7 sm:truncate sm:tracking-tight mt-4 mx-4">
        {title && decodeURI(title)}
      </h2>
      <StorytellerClipsGridView
        key={collection}
        collection={collection}
        displayLimit={10}
      />
    </>
  );
};

export default CategoryView;
