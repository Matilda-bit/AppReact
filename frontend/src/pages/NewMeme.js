import React from 'react';
import MemeForm from '../components/MemeForm';

function NewMemePage() {
  console.log("Im here!");
  return <MemeForm method="post" />;
}

export default NewMemePage;
