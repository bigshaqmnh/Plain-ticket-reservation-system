const path = require('path');
const fs = require('fs');

const userService = require('../services/user');

const getUserInfo = user => ({ username: user.username, email: user.email });

const getUserPhoto = userId => {
  const filePath = path.resolve('../server/static/photos', `${userId}.jpg`);
  const photo = fs.readFileSync(filePath);
  const encodedPhoto = Buffer.from(photo).toString('base64');

  return encodedPhoto;
};

const update = (id, user) => {
  userService.update(id, user);
};

module.exports = { getUserInfo, getUserPhoto, update };
