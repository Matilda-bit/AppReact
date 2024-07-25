import React from 'react';
import MemeForm from '../components/MemeForm';
// import AvailableMemeTemplates from '../components/AvailableMemeTemplates';

function NewMemePage() {
  console.log("NewMemePage...");
  //mb in this level I can call dispatch and send it to the MemeForm

  return (
    <MemeForm method="post" />
  );
}

export default NewMemePage;
