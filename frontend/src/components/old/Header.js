import React from 'react';
import classes from './Header.module.css';

function Header(){
    return(
        <header className={classes.staticHeader}>
            <img
                src="https://media4.giphy.com/media/tR1ZZeJXR9RUDvaFVP/giphy.gif?cid=6c09b952id1ipxo7y46s143tcbc684hfpx91t9b4f17fx282&ep=v1_stickers_search&rid=giphy.gif&ct=s"
                alt="Problem?"
            />
            <p>Meme Byte</p>
            <div class={classes["neon-line"]}></div>
        </header>
    );
}

export default Header;