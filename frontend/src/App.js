import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
//pages
import RootLayout from './pages/Layout/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import MemesRootLayout from './pages/Layout/MemesRoot';
import MemesPage, { loader as memesLoader } from './pages/Memes';
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

import { action as manipulateMemeAction } from './components/MemeForm';
import { checkAuthLoader, tokenLoader } from './util/auth';
import { action as logoutAction } from './pages/Logout';

// import Header from "./components/Header";
// import MemeGenerator from "./components/MemeGenerator";

// function App(){

//         return(
//             <div>
//                 <Header />
//                 <MemeGenerator />
//             </div>
//         )
// }
// export default App;



const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      id: 'root',
      loader: tokenLoader,
      children: [
        { index: true, element: <HomePage /> },
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
          path: 'auth',
          element: <AuthenticationPage />,
          action: authAction,
        },
        {
          path: 'newsletter',
          element: <NewsletterPage />,
          action: newsletterAction,
        },
        {
          path: 'logout',
          action: logoutAction,
        },
      ],
    },
  ]);
  
  function App() {

    console.log("test");
    console.log(router);
    return <RouterProvider router={router} />;
  }
  
  export default App;

