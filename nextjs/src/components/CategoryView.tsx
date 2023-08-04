import { useRouter } from 'next/router';
import React from 'react';
import StorytellerStoriesGridView from '@/components/StorytellerStoriesGridView';

interface QueryParams {
  category: string;
  title: string;
}

const CategoryView = () => {
  const router = useRouter();
  const { category, title } = router.query as unknown as QueryParams;

  return (
    <>
      <h2 className="text-lg sm:text-2xl font-bold leading-7 sm:truncate sm:tracking-tight mt-4 mx-4">
        {title && decodeURI(title)}
      </h2>
      <StorytellerStoriesGridView
        key={category}
        categories={[category]}
        displayLimit={10}
      />
    </>
  );
};

export default CategoryView;
