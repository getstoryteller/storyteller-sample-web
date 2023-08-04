import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import EnvVariablesContextProvider from './contexts/EnvVariablesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EnvVariablesContextProvider storytellerApiKey={process.env.REACT_APP_STORYTELLER_API_KEY}>
      <App />
    </EnvVariablesContextProvider>
  </React.StrictMode>,
);
