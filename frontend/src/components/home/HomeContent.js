import classes from "./HomeContent.module.css";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cardImage from "../../assets/ads/cards.webp";

function HomeContent() {
  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    const duration = 5 * 1000;
    const timer = setTimeout(() => {
      setShowGif(false);
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className={classes.home}>
        <div className={classes["top-container"]}>
          <div className={classes.leftAdd}>
            <img src={cardImage} alt="Girl in a jacket" width="500" height="600"></img>
          </div>
          <div>
            <p className={classes.description}>
              Browse our amazing <Link to="/user-memes" className={classes.link}>Memes</Link> or create a <Link to="/memes/new" className={classes.link}>New One</Link>!
              <br />A funny moments can make your day...
              Why not share that joy with others?
              <br />With MemeByte’s free meme generator, you can easily transform memorable moments into viral memes.
              <br />Create your own unique brand of humor and brighten someone else's day in minutes!
              <br />
            </p>
            <div className={classes.gifContainer}>
              {showGif ? (
                <img src="https://media.giphy.com/media/MNmyTin5qt5LSXirxd/giphy.gif" alt="Funny GIF" className={classes.gif} />
              ) : (
                <img src="https://media.giphy.com/media/MNmyTin5qt5LSXirxd/giphy_s.gif" alt="Static GIF Frame" className={classes.gif} />
              )}
            </div>

            <p>
              <strong>Imagine this:</strong> you’re scrolling through your feed after a long day,
              chuckling at the memes that friends and strangers have shared.
              Suddenly, you remember that hilarious moment from earlier—the one that made you laugh out loud.
              Maybe it was your pet’s unexpected antics, a funny twist in a conversation,
              or even a clever thought you had. You think, this would make a perfect meme.
            </p>

          </div>

          <div className={classes.leftAdd}>
            <img src={cardImage} alt="Girl in a jacket" width="500" height="600"></img>
          </div>

        </div>



        <div className={classes.contentRow}>
          <img src="https://ww2.kqed.org/app/uploads/sites/38/2019/03/tomemeornot3.jpg" alt="To meme or not to meme" className={classes.imageLeft} />
          <p>
            With MemeByte, you don’t have to keep that laugh to yourself.
            Here, you can capture those moments, add your unique twist,
            and turn them into something shareable. In just a few clicks,
            you’ll have a meme ready to make others laugh just like you did.
            And who knows? Maybe your creation will be the one that goes viral,
            spreading smiles across the internet!
          </p>
        </div>

        <div className={classes.contentRowReverse}>
          <img src="https://napoleoncat.com/wp-content/uploads/2022/05/social-media-memes-toy-story-meme.jpg" alt="Memes are everywhere" className={classes.imageRight} />

          <p>
            So, why not give it a try?
            Dive into the MemeByte meme generator, unleash your creativity,
            and start making others laugh with your one-of-a-kind humor.
            Because let’s face it—the internet can always use more laughter,
            and you’ve got just the wit to bring it.
          </p>
        </div>


        <Link to="/memes/new" className={classes.button}>Create Meme</Link>
        <p className={classes.description}>Browse our memes to laugh or get inspired and find a humorous muse to create your own meme!</p>
        <Link to="/memes" className={classes.button}>Memes</Link>
        <hr className="solid"></hr>


        <section id="bottom" lassName="bottom">


          <p className={classes["coming-soon"]}>Will be added soon:</p>

          <ul className={classes.list}>
            <li className={classes.gold}><strong>Advertising</strong>:</li>
            <p className={classes.updates}> - Banners and display advertising:
              <br />Placing advertising banners on the site.
              <br />We will can use networks like Google AdSense.
            </p>
            <hr className="solid"></hr>
            <li className={classes.gold}><strong>Payments from users:</strong>:</li>
            <p className={classes.updates}> - Donations:
              <br />Placement of donation buttons through platforms like:
              <br /> Patreon, Boosty, PayPal or Ko-fi.
              <br />Donators can receive bonuses or recognition on the site.</p>
            <p className={classes.updates}> - Sale of merch:
              <br />Create an online store selling meme-related goods such as: T-shirts, mugs and other souvenirs.</p>
            <hr className="solid"></hr>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default HomeContent;
