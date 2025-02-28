import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
//pages
import RootLayout from './pages/Layout/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import MemesRootLayout from './pages/Layout/MemesRoot';
import MemesPage, { loader as memesLoader } from './pages/Memes';
import UserMemesPage, { loader as userMemesLoader } from './pages/UserMemes';
import MemeDetailPage, {
    loader as memeDetailLoader,
    action as deleteMemeAction,
  } from './pages/MemeDetail';

import EditMemePage from './pages/EditMeme';
import NewMemePage from './pages/NewMeme';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import AuthenticationPage, {
  action as authAction,
} from './pages/Authentication';
import { action as logoutAction } from './pages/Logout';

import { action as manipulateMemeAction } from './components/memes/MemeForm';
import { checkAuthLoader, tokenLoader } from './util/auth';


const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      id: 'root',
      loader: tokenLoader,
      children: [
        { index: true, 
          element: <HomePage />,
        },
        {
          path: 'memes',
          element: <MemesRootLayout />,
          children: [
            {
              index: true,
              element: <MemesPage />,
              loader: memesLoader,
            },
            {
              path: ':memeId',
              id: 'meme-detail',
              loader: memeDetailLoader,
              children: [
                {
                  index: true,
                  element: <MemeDetailPage />,
                  action: deleteMemeAction,
                },
                {
                  path: 'edit',
                  element: <EditMemePage />,
                  action: manipulateMemeAction,
                  loader: checkAuthLoader,
                },
              ],
            },
            {
             
              path: 'new',
              element: <NewMemePage />,
              action: manipulateMemeAction,
              loader: checkAuthLoader,
            },
          ],
        },

        {
          path: 'user-memes' ,
          element: <MemesRootLayout />,
          children: [
            {
              index: true,
              element: <UserMemesPage />,
              loader: userMemesLoader,
            }
          ]
        },
        {
          path: 'newsletter',
          element: <NewsletterPage />,
          action: newsletterAction,
        },
        {
          path: 'auth',
          element: <AuthenticationPage />,
          action: authAction,
        },
        {
          path: 'logout',
          action: logoutAction,
        },
      ],
    },
  ]);
  
  function App() {
    return <RouterProvider router={router} />;
  }
  
  export default App;

