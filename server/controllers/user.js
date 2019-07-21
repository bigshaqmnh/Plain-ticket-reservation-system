const path = require('path');
const fs = require('fs');

const userService = require('../services/user');

const photosStoragePath = '../server/static/photos';
const parseBase64 = {
  data: 'data:image/',
  base: ';base64'
};

const _clearFolder = folderName => {
  const files = fs.readdirSync(folderName);
  files.forEach(file => fs.unlinkSync(path.join(folderName, file)));
};

const getUserInfo = async userId => {
  const user = await userService.findById(userId);

  if (!user) {
    return;
  }

  const photo = fs.readFileSync(user.photo);
  const encodedPhoto = Buffer.from(photo).toString('base64');

  return { data: { ...user, photo: encodedPhoto } };
};

const update = (id, user) => {
  const { photo } = user;

  _clearFolder(`${photosStoragePath}/${id}`);

  const fileExtension = photo.slice(parseBase64.data.length, photo.indexOf(parseBase64.base));
  const fileData = photo.slice(parseBase64.data.length + fileExtension.length + parseBase64.base.length);
  const filePath = `${photosStoragePath}/${id}/photo.${fileExtension}`;

  fs.writeFileSync(filePath, fileData, 'base64');

  userService.update(id, { ...user, photo: filePath });
};

module.exports = { getUserInfo, update };
