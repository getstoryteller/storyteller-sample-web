import '@getstoryteller/storyteller-sdk-javascript/dist/storyteller.min.css';
import './App.css';

import StorytellerContextProvider from './contexts/StorytellerContext';
import StorytellerStoriesRow from './components/StorytellerStoriesRow';
import StorytellerStoriesGrid from './components/StorytellerStoriesGrid';

import Skeleton from './components/Skeleton';
import SkeletonContainer from './components/SkeletonContainer';

function App() {
  return (
    <StorytellerContextProvider>
      {/* Here we use the StorytellerContextProvider to make sure the 
    Storyteller SDK is initialized */}
      <div className="content">
        {/* We've created wrapper React components which expose some of the 
        properties typical for a Stories Row or Grid */}
        <StorytellerStoriesRow tileType="round" categories={['game-stories']} />
        {/* These skeleton components exist to stand in for the rest of your app */}
        <Skeleton />
        <StorytellerStoriesRow tileType="square" categories={['top-stories']} />
        <SkeletonContainer />
        <StorytellerStoriesGrid
          categories={['trending-content']}
          displayLimit={8}
        />
      </div>
    </StorytellerContextProvider>
  );
}

export default App;
