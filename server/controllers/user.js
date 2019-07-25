const path = require('path');
const fsPromises = require('fs').promises;

const userService = require('../services/user');

const photosStoragePath = '../server/static/photos';
const parseBase64 = {
  data: 'data:image/',
  base: ';base64'
};

const _clearFolder = async folderName => {
  const files = await fsPromises.readdir(folderName);
  files.forEach(async file => await fsPromises.unlink(path.join(folderName, file)));
};

const getUserInfo = async userId => {
  const user = await userService.findById(userId);

  if (!user) {
    return;
  }

  const filehandle = await fsPromises.open(user.photo, 'r');
  const photo = await filehandle.readFile();
  await filehandle.close();

  const encodedPhoto = Buffer.from(photo).toString('base64');

  return { data: { ...user, photo: encodedPhoto } };
};

const update = async (id, user) => {
  const { photo } = user;

  await _clearFolder(`${photosStoragePath}/${id}`);

  const fileExtension = photo.slice(parseBase64.data.length, photo.indexOf(parseBase64.base));
  const fileData = photo.slice(parseBase64.data.length + fileExtension.length + parseBase64.base.length);
  const photoFilePath = `${photosStoragePath}/${id}/photo.${fileExtension}`;

  await fsPromises.writeFile(photoFilePath, fileData, 'base64');

  userService.update(id, { ...user, photo: photoFilePath });
};

module.exports = { getUserInfo, update };
