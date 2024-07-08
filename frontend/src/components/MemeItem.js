import React from 'react';
import { Link, useSubmit } from 'react-router-dom';

import classes from './MemeItem.module.css';

function MemeItem({ meme }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }

  return (
    <article className={classes.meme}>
      <img src={meme.image} alt={meme.title} />
      <h1>{meme.title}</h1>
      <time>{meme.date}</time>
      <p>{meme.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default MemeItem;