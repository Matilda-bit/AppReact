const bodyParser = require('body-parser');
const express = require('express');

const memeRoutes = require('./routes/memes');
const userMemeRoutes = require('./routes/user-meme');
const authRoutes = require('./routes/auth');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use(authRoutes);

app.use('/memes', memeRoutes);
app.use('/user-memes', userMemeRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080')});