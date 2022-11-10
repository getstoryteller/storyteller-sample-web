import { useEffect, useRef } from 'react';
import './App.css';
import { API_KEY, USER_ID } from './constants';
import Storyteller from '@getstoryteller/storyteller-sdk-javascript';

import '@getstoryteller/storyteller-sdk-javascript/dist/storyteller.min.css';

function App() {
  const topStoryRow = useRef();
  const storyRow = useRef();
  const storyGrid = useRef();

  useEffect(() => {
    Storyteller.sharedInstance
      .initialize(API_KEY, { externalId: USER_ID })
      .then(function () {
        const gridCols = window.innerWidth < 680 ? 2 : 4;

        Storyteller.sharedInstance.theme = new Storyteller.UiTheme({
          light: {
            lists: {
              row: {
                endInset: 16,
                startInset: 16
              },
              grid: {
                columns: gridCols,
              },
              
            },
            instructions: {
              backgroundColor: 'white',
              headingColor: 'black',
              subHeadingColor: '#1a1a1a',
              button: {
                backgroundColor: '#1C62EB',
                textColor: 'white',
              },
              icons: {
                back: '/arrow-back.svg',
                forward: '/arrow-forward.svg',
                pause: '/pause.svg',
                swipe: '/swipe.svg',
              },  
            },
            player: {
              showStoryIcon: false,
            }
          }
        });
      
        storyRow.current = new Storyteller.RowView('default-stories');
        storyRow.current.delegate = {
          onUserActivityOccurred: (type, data) => console.log('activity', type, data),
          tileBecameVisible: (index) => console.log(index)
        }

        topStoryRow.current = new Storyteller.RowView('top-stories-row');
        topStoryRow.current.delegate = {
          onUserActivityOccurred: (type, data) => console.log('activity', type, data),
          tileBecameVisible: (index) => console.log(index)
        }

        storyGrid.current = new Storyteller.GridView('stories-grid');
    }).catch(e => {
      console.warn(e);
    });
  }, []);

  return (
    <div className="content">
      <div className="storyteller" id="top-stories-row" data-cell-type="round" data-base-url="top-stories" style={{ height: 150 }} />
      <div className="skeleton-1" />
      <div className="storyteller" id="default-stories" data-cell-type="square" style={{ height: 150 }} />
      <div className="skeleton-container">
          <div className="skeleton-2"/>
          <div className="skeleton-right">
              <div className="skeleton-3"/>
              <div className="skeleton-4"/>
          </div>
      </div>
      <div className="storyteller" id="stories-grid" />
    </div>
  );
}

export default App;

