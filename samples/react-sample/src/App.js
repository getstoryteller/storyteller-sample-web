import { useEffect, useRef } from 'react';
import './App.css';
import { API_KEY, USER_ID } from './constants';

function App() {
  const storyRow = useRef();

  useEffect(() => {
    window.Storyteller.sharedInstance.initialize(API_KEY).then(function () {
      window.Storyteller.sharedInstance.setUserDetails({ externalId: USER_ID });
      window.Storyteller.sharedInstance.theme = new window.Storyteller.Theme({
        row: {
          newIndicatorBackgroundColor: 'white',
          newIndicatorTextColor: 'black',
          newIndicatorAlignment: 'left',
          storyTitleAlignment: 'center',
        },
        player: { showStoryIcon: true },
      });
    
      storyRow.current = new window.Storyteller.RowView('default-stories');
      storyRow.current.theme = new window.Storyteller.RowTheme({
        leftInset: 16,
        rightInset: 16,
      });

      storyRow.current.delegate = {
        onUserActivityOccurred: (type, data) => console.log('activity', type, data),
        tileBecameVisible: (index) => console.log(index)
      }
      }).catch(e => {
        console.warn(e);
      });

      console.log(storyRow);
  }, []);

  return (
    <div className="content">
        <div className="skeleton-1" />
        <div className="storyteller" id="default-stories" data-cell-type="Square" ref={storyRow} />
        <div className="skeleton-container">
            <div className="skeleton-2"/>
            <div className="skeleton-right">
                <div className="skeleton-3"/>
                <div className="skeleton-4"/>
            </div>
        </div>
    </div>
  );
}

export default App;
