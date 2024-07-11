// import Places from './Places.jsx';
import { useDispatch } from 'react-redux';
import React from 'react';
import Error from '../pages/Error.js';
// import { fetchAvailableMemes } from '../http.js';
import { useFetch } from '../hooks/useFetch.js';
import MemeCatalog from "./old/MemeCatalog";

export default function AvailableMemeTemplates() {

  console.log("AvailableMemeTemplates...");
  const dispatch = useDispatch();

  const {
    // isFetching,
    fetchedData,
    // setFetchedData,
    error
  } = useFetch();

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  const setItem = (newItem) => {
    dispatch({ type: 'SET_ITEM', payload: newItem });
};

function handleSubmit(event) {
  //from MemeGenerator
  // event.preventDefault();
  // const memeBox = document.getElementById('meme-box');

  // // Use html2canvas to render the meme-box to a canvas
  // html2canvas(memeBox, { useCORS: true }).then(canvas => {
  //     // Convert the canvas to a data URL
  //     const dataUrl = canvas.toDataURL();

  //     // Optionally, create a link element to download the image
  //     const a = document.createElement('a');
  //     a.setAttribute('download', 'meme.png');
  //     a.setAttribute('href', dataUrl);
  //     a.click();
  // });

  console.log("set item");
}

if(fetchedData){
  console.log(fetchedData)
}

  return (
     <>
    { fetchedData ? (
    <MemeCatalog
    allMemeImgs={fetchedData.data.memes}
    setItem={setItem}
    handleSubmit={handleSubmit} />) : null}
    </>
  );
}