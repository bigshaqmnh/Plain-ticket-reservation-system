const path = require('path');
const fsPromises = require('fs').promises;

const userService = require('../services/user');

const getUserInfo = user => ({ username: user.username, email: user.email });

const getUserPhoto = async userId => {
  const filePath = path.resolve('../server/static/photos', `${userId}.jpg`);

  const filehandle = await fsPromises.open(filePath, 'r');
  const photo = await filehandle.readFile();
  await filehandle.close();

  const encodedPhoto = Buffer.from(photo).toString('base64');

  return encodedPhoto;
};

const update = (id, user) => {
  userService.update(id, user);
};

module.exports = { getUserInfo, getUserPhoto, update };
