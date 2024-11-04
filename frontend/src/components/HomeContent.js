import classes from "./HomeContent.module.css";

import React from 'react';
import { Link } from 'react-router-dom';
// import './HomePage.css'; // Import the CSS file

function HomeContent() {
  console.log('Welcome to the Home page \nHomeContent rendered...')
  return (
    <>
      <img
        src="https://media.giphy.com/media/MNmyTin5qt5LSXirxd/giphy.gif?cid=790b7611r45we2h18dsl7d1b1jtop7fl6559ax2f7uy0wl1z&ep=v1_gifs_search&rid=giphy.gif&ct=g"
        alt="Funny GIF"
        className="gif"
      />
      <p className={classes.description}>
        Browse our amazing memes <Link to="/user-memes" className={classes.link}>memes</Link> or create a <Link to="/memes/new" className={classes.link}>new one</Link>!
      <br/>A funny moment on the internet can make your day.
      <br/>Why not share that joy with others?
      <br/>With MemeByte’s free meme generator, you can easily transform memorable moments into viral memes.
      <br/>Create your own unique brand of humor and brighten someone else's day in minutes!
      <br/>
      </p>
      <Link to="/memes/new" className={classes.button}>Create Meme</Link>
      <p className={classes.description}>Browse our memes to laugh or get inspired and find a humorous muse to create your own meme!</p>
      <Link to="/memes" className={classes.button}>Memes</Link>
      <hr className="solid"></hr>
      <p className={classes["coming-soon"]}>Will be added soon:</p>
      <ul className={classes.list}>
        <li><strong>Advertising</strong>:</li>
        <p className={classes.updates}> - Banners and display advertising: 
          <br/>Placing advertising banners on the site. 
          <br/>We will can use networks like Google AdSense.
        </p>
        <hr className="solid"></hr>
        <li><strong>Payments from users:</strong>:</li>
        <p className={classes.updates}> - Donations: 
          <br/>Placement of donation buttons through platforms like: 
          <br/> Patreon, Boosty, PayPal or Ko-fi. 
          <br/>Donators can receive bonuses or recognition on the site.</p>
        <p className={classes.updates}> - Sale of merch: 
          <br/>Create an online store selling meme-related goods such as: T-shirts, mugs and other souvenirs.</p>
        <hr className="solid"></hr>
      </ul>
    </>
  );
}

export default HomeContent;
