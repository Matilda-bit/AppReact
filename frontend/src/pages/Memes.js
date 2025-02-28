import React from 'react';
import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import MemesList from '../components/memes/MemesList';

function MemesPage() {
  const { memes } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={memes}>
        {(loadedMemes) => <MemesList memes={loadedMemes} />}
      </Await>
    </Suspense>
  );
}

export default MemesPage;

async function loadMemes() {
  const response = await fetch('http://localhost:8080/memes');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch memes.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch memes.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch memes.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.memes;
  }
}

export function loader() {
  return defer({
    memes: loadMemes(),
  });
}