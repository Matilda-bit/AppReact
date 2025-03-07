import React from 'react';
import { NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './MemesNavigation.module.css';

function MemesNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/memes"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >

              My Memes
            </NavLink>
          </li>
          {token && (
            <li>
              <NavLink
                to="/memes/new"
                //to={{pathname: "/memes/new", state:["a"]}} // test
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                New Meme
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MemesNavigation;