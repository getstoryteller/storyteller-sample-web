import { useParams } from 'react-router-dom';

import StorytellerContextProvider from '../contexts/StorytellerContext';
import StorytellerClipsGrid from '../components/StorytellerClipsGrid';

function CollectionPage() {
  const { externalId } = useParams();
  return (
    <StorytellerContextProvider>
      <div className="content">
        <StorytellerClipsGrid collection={externalId} />
      </div>
    </StorytellerContextProvider>
  );
}

export default CollectionPage;
