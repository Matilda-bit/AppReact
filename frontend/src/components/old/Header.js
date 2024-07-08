import React from 'react';
import classes from './Header.module.css';

function Header(){
    return(
        <header className={classes.staticHeader}>
            <img
                src="https://img.icons8.com/clouds/2x/angry-face-meme.png"
                alt="Problem?"
            />
            <p>Meme Byte</p>
        </header>
    );
}

export default Header;