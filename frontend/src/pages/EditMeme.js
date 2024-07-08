import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';

import MemeForm from '../components/MemeForm';

function EditMemePage() {
  const data = useRouteLoaderData('meme-detail');

  return <MemeForm method="patch" meme={data.meme} />;
}

export default EditMemePage;