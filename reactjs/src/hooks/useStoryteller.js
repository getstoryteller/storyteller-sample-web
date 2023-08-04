import { useContext } from 'react';
import { StorytellerContext } from '../contexts/StorytellerContext';

// This is just a boilerplate hook to expose the Storyteller context
// to the rest of your app.

const useStoryteller = () => useContext(StorytellerContext);

export default useStoryteller;
