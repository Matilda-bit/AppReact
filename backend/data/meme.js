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
  const newData = { ...data, id: generateId()};
  storedData.memes.unshift(newData);
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

