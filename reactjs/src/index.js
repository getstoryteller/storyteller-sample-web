import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import IndexPage from './routes/IndexPage';
import CategoryPage from './routes/CategoryPage';
import CollectionPage from './routes/CollectionPage';
import EnvVariablesContextProvider from './contexts/EnvVariablesContext';

import '@getstoryteller/storyteller-sdk-javascript/dist/storyteller.min.css';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/category/:externalId',
    element: <CategoryPage />,
  },
  {
    path: '/collection/:externalId',
    element: <CollectionPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <EnvVariablesContextProvider
      storytellerApiKey={process.env.REACT_APP_STORYTELLER_API_KEY}
    >
      <RouterProvider router={router} />
    </EnvVariablesContextProvider>
  </React.StrictMode>,
);
