import StorytellerContextProvider from '../contexts/StorytellerContext';
import StorytellerStoriesRow from '../components/StorytellerStoriesRow';
import StorytellerStoriesGrid from '../components/StorytellerStoriesGrid';

import Skeleton from '../components/Skeleton';
import SkeletonContainer from '../components/SkeletonContainer';
import StorytellerClipsGrid from '../components/StorytellerClipsGrid';
import StorytellerClipsRow from '../components/StorytellerClipsRow';

function IndexPage() {
  return (
    <StorytellerContextProvider>
      {/* Here we use the StorytellerContextProvider to make sure the 
    Storyteller SDK is initialized */}
      <div className="content">
        {/* We've created wrapper React components which expose some of the 
        properties typical for a Stories Row or Grid */}
        <StorytellerStoriesRow
          title="Game Stories"
          tileType="round"
          categories={['game-stories']}
        />
        {/* These skeleton components exist to stand in for the rest of your app */}
        <Skeleton />
        <StorytellerStoriesRow
          title="Top Stories"
          tileType="square"
          categories={['top-stories']}
        />
        <SkeletonContainer />
        <StorytellerStoriesGrid
          title="Trending Content"
          categories={['trending-content']}
          displayLimit={8}
        />
        <Skeleton />
        <StorytellerClipsGrid
          title="Top Clips"
          collection="top-clips"
          displayLimit={4}
        />
        <SkeletonContainer />
        <StorytellerClipsRow
          title="Trending Clips"
          size="medium"
          collection="trending-clips"
          displayLimit={8}
        />
      </div>
    </StorytellerContextProvider>
  );
}

export default IndexPage;
