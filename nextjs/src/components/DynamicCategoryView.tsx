import React, { useState } from 'react';
import StorytellerStoriesGridView from '@/components/StorytellerStoriesGridView';

const DynamicCategoryView = () => {
  const [category, setCategory] = useState<string>('');

  return (
    <>
      <form
        className="mt-8 px-4"
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);
          const formValues = Object.fromEntries(formData);
          const selectedCategory = formValues.category as string;

          setCategory(selectedCategory);
        }}
      >
        <label
          className="text-md font-semibold leading-6 text-gray-900"
          htmlFor="category"
        >
          Category:
        </label>
        <input
          type="text"
          id="category"
          name="category"
          className="ml-2.5 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-md sm:leading-6"
        />
        <button
          type="submit"
          className="ml-2.5 rounded-md bg-indigo-600 px-3.5 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update
        </button>
      </form>
      <StorytellerStoriesGridView
        key={category}
        categories={[category]}
        displayLimit={10}
        title="Story with dynamic category"
      />
    </>
  );
};

export default DynamicCategoryView;
