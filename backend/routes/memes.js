const express = require('express');

const { getAll, get, add, replace, remove } = require('../data/meme');
const { checkAuth } = require('../util/auth');
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require('../util/validation');

const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log(req.token);
  try {
    const memes = await getAll();
    res.json({ memes: memes });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const meme = await get(req.params.id);
    res.json({ meme: meme });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

router.post('/', async (req, res, next) => {
  console.log(req.token);
  const data = req.body;

  let errors = {};
  //here I need to add conditions to check validation of the sended data
  if(data){
     try {
    await add(data);
    res.status(201).json({ message: 'Meme saved.', meme: data });
  } catch (error) {
    next(error);
  }
} else {
  console.log("Data is EMPTY");
}
 
});

router.patch('/:id', async (req, res, next) => {
  const data = req.body;

  let errors = {};
  //here I need to add conditions to check validation of the sended data
  // if (!isValidText(data.description)) {
  //   errors.description = 'Invalid description.';
  // }

  // if (!isValidDate(data.date)) {
  //   errors.date = 'Invalid date.';
  // }

  // if (!isValidImageUrl(data.image)) {
  //   errors.image = 'Invalid image.';
  // }

  // if (Object.keys(errors).length > 0) {
  //   return res.status(422).json({
  //     message: 'Updating the meme failed due to validation errors.',
  //     errors,
  //   });
  // }

  try {
    await replace(req.params.id, data);
    res.json({ message: 'Meme updated.', meme: data });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: 'Meme deleted.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;