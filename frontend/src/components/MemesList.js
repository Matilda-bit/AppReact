// import { useLoaderData } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';

import classes from './MemesList.module.css';
import MemeGenerator from './old/MemeGenerator';

function MemesList({memes}) {
  // const memes = useLoaderData();

  return (
    <div className={classes.memes}>
      <h1>All Memes</h1>
      <ul className={classes.list}>
        {memes.map((meme) => (
          <li key={meme.id} className={classes.item}>
            <Link to={meme.id}>
              <img src={meme.image} alt={meme.title} />
              <div className={classes.content}>
                <h2>{meme.title}</h2>
                <time>{meme.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <MemeGenerator
            />
    </div>
  );
}

export default MemesList;