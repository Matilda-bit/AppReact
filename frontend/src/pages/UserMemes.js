import React from 'react';
import { Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';

import MemesList from '../components/memes/MemesList';

import { fetchUserMemes } from '../http.js';

function UserMemesPage() {
  const { userMemes } = useLoaderData();

  console.log("UserMemesPage...");

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={userMemes}>
        {(loadedMemes) => <MemesList memes={loadedMemes} />}
      </Await>
    </Suspense>
  );
}

export default UserMemesPage;

export function loader() {
  return defer({
    memes: fetchUserMemes(),
  });
}