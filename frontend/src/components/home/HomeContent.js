import classes from "./HomeContent.module.css";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function HomeContent() {

  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    const duration = 5 * 1000;
    const timer = setTimeout(() => {
      setShowGif(false);
    }, duration);

    return () => clearTimeout(timer);
  }, []);
  console.log('Welcome to the Home page \nHomeContent rendered...')
  return (
    <>
      <p className={classes.description}>
        Browse our amazing <Link to="/user-memes" className={classes.link}>Memes</Link> or create a <Link to="/memes/new" className={classes.link}>New One</Link>!
        <br />A funny moments can make your day...
        Why not share that joy with others?
        <br />With MemeByte’s free meme generator, you can easily transform memorable moments into viral memes.
        <br />Create your own unique brand of humor and brighten someone else's day in minutes!
        <br />
      </p>
      {showGif ? (
        <img
          src="https://media.giphy.com/media/MNmyTin5qt5LSXirxd/giphy.gif"
          alt="Funny GIF"
          className="gif"
        />
      ) : (
        <img
          src="https://media.giphy.com/media/MNmyTin5qt5LSXirxd/giphy_s.gif"
          alt="Static GIF Frame"
          className="gif"
        />
      )}
      <p>
        Imagine this: you’re scrolling through your feed after a long day,
        chuckling at the memes that friends and strangers have shared.
        Suddenly, you remember that hilarious moment from earlier—the one that made you laugh out loud.
        Maybe it was your pet’s unexpected antics, a funny twist in a conversation,
        or even a clever thought you had. You think, this would make a perfect meme.
      </p>

      <img
        src="https://ww2.kqed.org/app/uploads/sites/38/2019/03/tomemeornot3.jpg"
        alt="to meme or not to meme" width={750} height={335}
        className="" />

      <p>
        With MemeByte, you don’t have to keep that laugh to yourself.
        Here, you can capture those moments, add your unique twist,
        and turn them into something shareable. In just a few clicks,
        you’ll have a meme ready to make others laugh just like you did.
        And who knows? Maybe your creation will be the one that goes viral,
        spreading smiles across the internet!
      </p>

      <img
        src="https://napoleoncat.com/wp-content/uploads/2022/05/social-media-memes-toy-story-meme.jpg"
        alt="memes memes is everywhere" width={735} height={500}
        className="" />

      <p>
        So, why not give it a try?
        Dive into the MemeByte meme generator, unleash your creativity,
        and start making others laugh with your one-of-a-kind humor.
        Because let’s face it—the internet can always use more laughter,
        and you’ve got just the wit to bring it.
      </p>
      <Link to="/memes/new" className={classes.button}>Create Meme</Link>
      <p className={classes.description}>Browse our memes to laugh or get inspired and find a humorous muse to create your own meme!</p>
      <Link to="/memes" className={classes.button}>Memes</Link>
      <hr className="solid"></hr>
      <p className={classes["coming-soon"]}>Will be added soon:</p>
      <ul className={classes.list}>
        <li><strong>Advertising</strong>:</li>
        <p className={classes.updates}> - Banners and display advertising:
          <br />Placing advertising banners on the site.
          <br />We will can use networks like Google AdSense.
        </p>
        <hr className="solid"></hr>
        <li><strong>Payments from users:</strong>:</li>
        <p className={classes.updates}> - Donations:
          <br />Placement of donation buttons through platforms like:
          <br /> Patreon, Boosty, PayPal or Ko-fi.
          <br />Donators can receive bonuses or recognition on the site.</p>
        <p className={classes.updates}> - Sale of merch:
          <br />Create an online store selling meme-related goods such as: T-shirts, mugs and other souvenirs.</p>
        <hr className="solid"></hr>
      </ul>
    </>
  );
}

export default HomeContent;
