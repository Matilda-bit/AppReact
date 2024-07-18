import React from 'react';
import MemeForm from '../components/MemeForm';
// import AvailableMemeTemplates from '../components/AvailableMemeTemplates';

function NewMemePage() {
  console.log("NewMemePage...");

  return (
    <MemeForm method="post" />
  );
}

export default NewMemePage;
