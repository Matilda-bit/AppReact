import classes from "./HomeContent.module.css";

import React from 'react';
import { Link } from 'react-router-dom';
// import './HomePage.css'; // Import the CSS file

function HomeContent() {
  return (
    <>
      <img
        src="https://media.giphy.com/media/MNmyTin5qt5LSXirxd/giphy.gif?cid=790b7611r45we2h18dsl7d1b1jtop7fl6559ax2f7uy0wl1z&ep=v1_gifs_search&rid=giphy.gif&ct=g"
        alt="Funny GIF"
        className="gif"
      />
      <p className="description">
        Browse our amazing memes <Link to="/memes" className="link">Memes</Link> or create a <Link to="/memes/new" className="link">New One</Link>!
      </p>
      <p className={classes.description}>A funny moment on the internet can make your day.</p>
      <p className="description">Why not share that joy with others?</p>
      <p className="description">With MemeByte’s free meme generator, you can easily transform memorable moments into viral memes.</p>
      <p className="description">Create your own unique brand of humor and brighten someone else's day in minutes!</p>
      <Link to="/memes/new" className="button">Create Meme</Link>
      <p className="description">Browse our memes to laugh or get inspired and find a humorous muse to create your own meme!</p>
      <Link to="/memes" className="button">Memes</Link>
      <p className="coming-soon">Will be added soon:</p>
      <hr className="solid"></hr>
      <ul className="list">
        <li><strong>Advertising</strong>:</li>
        <p className="description">- Banners and display advertising: Placing advertising banners on the site. You can use networks like Google AdSense.</p>
        <hr className="solid"></hr>
        <li><strong>Payments from users:</strong>:</li>
        <p className="description">Donations: Placement of donation buttons through platforms like Patreon, Boosty, PayPal or Ko-fi. Donators can receive bonuses or recognition on the site.</p>
        <p className="description">Sale of merch: Create an online store selling meme-related goods such as T-shirts, mugs and other souvenirs.</p>
        <hr className="solid"></hr>
      </ul>
    </>
  );
}

export default HomeContent;
