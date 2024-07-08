const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

async function getAll() {
  const storedData = await readData();
  if (!storedData.memes) {
    throw new NotFoundError('Could not find any memes.');
  }
  return storedData.memes;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.memes || storedData.memes.length === 0) {
    throw new NotFoundError('Could not find any memes.');
  }

  const meme = storedData.memes.find((ev) => ev.id === id);
  if (!meme) {
    throw new NotFoundError('Could not find meme for id ' + id);
  }

  return meme;
}

async function add(data) {
  const storedData = await readData();
  storedData.memes.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.memes || storedData.memes.length === 0) {
    throw new NotFoundError('Could not find any memes.');
  }

  const index = storedData.memes.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find meme for id ' + id);
  }

  storedData.memes[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.memes.filter((ev) => ev.id !== id);
  await writeData({ ...storedData, memes: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;


// [
//   {"id":"112126428","name":"Distracted Boyfriend","url":"https://i.imgflip.com/1ur9b0.jpg","width":1200,"height":800,"box_count":3},
//   {"id":"181913649","name":"Drake Hotline Bling","url":"https://i.imgflip.com/30b1gx.jpg","width":1200,"height":1200,"box_count":2},
//   {"id":"87743020","name":"Two Buttons","url":"https://i.imgflip.com/1g8my4.jpg","width":600,"height":908,"box_count":2}
// ]
