import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import IndexPage from './routes/IndexPage';
import CategoryPage from './routes/CategoryPage';
import EnvVariablesContextProvider from './contexts/EnvVariablesContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/category/:externalId',
    element: <CategoryPage />
  }
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
