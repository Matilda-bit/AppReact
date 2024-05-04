import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(express.static('images'));//only for png img files
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
             
  next();
});

app.get('/memes', async (req, res) => {
  const fileContent = await fs.readFile('./data/memes.json');

  const memesData = JSON.parse(fileContent);

  res.status(200).json({ memes: memesData });
});

app.get('/user-memes', async (req, res) => {

  const fileContent = await fs.readFile('./data/user-memes.json');

  const memes = JSON.parse(fileContent);

  res.status(200).json({ memes });
});

app.put('/user-memes', async (req, res) => {
  const memes = req.body.memes;

  await fs.writeFile('./data/user-places.json', JSON.stringify(memes));

  res.status(200).json({ message: 'User nenes updated!' });
});

// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3000);