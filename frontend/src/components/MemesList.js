// import { useLoaderData } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';

import classes from './MemesList.module.css';

function MemesList({memes}) {
  // const memes = useLoaderData();
  console.log("MemesList");

  if(memes) {
    return (
      <div className={classes.memes}>
        <h1>All Memes</h1>
        <ul className={classes.list + " " +  classes['meme-catalog']}>
          {memes.map((meme,index) => (
            <li key={meme.id} className={classes.item}>
              <Link to={`/memes/${meme.id}}`}>
                  <div id="meme-images" className={classes.content + " " + classes['meme-images']}>
                          <img
                              key={index}
                              src={meme.item.img}
                              alt={meme.item.name}
                              draggable="false"
                          />
                  </div>
              </Link>
            </li>
          ))}
        </ul>

      </div>);
  } else {
    return (
      <div className={classes.memes}>
        <h1>All Memes</h1>
        <p>You can create new memes and store it here...</p>
        </div>
    );
  }

}

export default MemesList;