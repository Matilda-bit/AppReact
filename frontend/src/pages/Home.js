import React from 'react';

import PageContent from '../components/PageContent';
import {
  Link
} from 'react-router-dom';


function HomePage() {
  return (
    <PageContent title="Spread Laughter with MemeByte!">
      <p>Browse our amazing memes <span> <Link to="/memes"> Memes</Link></span> or create a <Link to="/memes/new"> New One</Link>!</p>
      <p>A funny moment on the internet can make your day.</p>
      <p>Why not share that joy with others? </p>
      <p>With MemeByte’s free meme generator, you can easily transform memorable moments into viral memes. </p>
      <p>Create your own unique brand of humor and brighten someone else's day in minutes!</p>
      <Link to="/memes/new"> Create Meme</Link>
      <p>Browse our memes to laugh or get inspired and find a humorous muse to create your own meme!</p>
      <Link to="/memes"> Memes</Link>
      <p>Will be added soon: </p>
      <hr className="solid"></hr>
       <ul>
        <li><strong>Advertising</strong>: </li>
        <p>- Banners and display advertising:</p> <p>Placing advertising banners on the site. You can use networks like Google AdSense.</p>
        <hr className="solid"></hr>
        <li><strong>Payments from users:</strong>: </li>
        <p>Donations:</p>
        <p>Placement of donation buttons through platforms like Patreon, Boosty, PayPal or Ko-fi.</p> <p> Donators can receive bonuses or recognition on the site.</p>
        <p>Sale of merch:</p>
        <p>Create an online store selling meme-related goods such as T-shirts, mugs and other souvenirs.</p>
        <hr className="solid"></hr>
        <li><strong>Advertising</strong>: </li>
        <p></p>
        <li><strong>Advertising</strong>: </li>
        <p></p>
        <li><strong>Advertising</strong>: </li>
        <p></p>
       </ul>

    </PageContent> 
  );
}

export default HomePage;
