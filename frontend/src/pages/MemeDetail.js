import React from 'react';
import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';

import MemeItem from '../components/memes/MemeItem';
import MemesList from '../components/memes/MemesList';
import { getAuthToken } from '../util/auth';

function MemeDetailPage() {
  const { meme, memes } = useRouteLoaderData('meme-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={meme}>
          {(loadedMeme) => <MemeItem meme={loadedMeme} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={memes}>
          {(loadedMemes) => <MemesList memes={loadedMemes} />}
        </Await>
      </Suspense>
    </>
  );
}

export default MemeDetailPage;

async function loadMeme(id) {
  const response = await fetch('http://localhost:8080/memes/' + id);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected meme.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.meme;
  }
}

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

export async function loader({ request, params }) {
  const id = params.memeId;

  return defer({
    meme: await loadMeme(id),
    memes: loadMemes(),
  });
}

export async function action({ params, request }) {
  const memeId = params.memeId;

  const token = getAuthToken();
  const response = await fetch('http://localhost:8080/memes/' + memeId, {
    method: request.method,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete meme.' },
      {
        status: 500,
      }
    );
  }
  return redirect('/memes');
}