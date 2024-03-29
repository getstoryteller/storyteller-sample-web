import { useParams } from 'react-router-dom';

import StorytellerContextProvider from '../contexts/StorytellerContext';
import StorytellerStoriesGrid from '../components/StorytellerStoriesGrid';

function CategoryPage() {
  const { externalId } = useParams();
  return (
    <StorytellerContextProvider>
      <div className="content">
        <StorytellerStoriesGrid categories={[externalId]} />
      </div>
    </StorytellerContextProvider>
  );
}

export default CategoryPage;
