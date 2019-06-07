'use strict';

const bcrypt = require('bcrypt');

const genPassHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('users', [
      {
        id: 'df198ce7-14de-4c7f-bfd5-b9b96f76ace5',
        username: 'Mike',
        email: 'kmikecoder@gmail.com',
        passwordHash: genPassHash('qwerty'),
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4af5fd33-c752-4e10-ab24-d5f5d54c433a',
        username: 'Batman98',
        email: 'hatesuperman@gmail.com',
        passwordHash: genPassHash('j0k3r-p0k3r'),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'c648c063-2e51-49c7-98b7-749154a0e43e',
        username: 'User3748',
        email: 'example@mail.com',
        passwordHash: genPassHash('3hjbf84'),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, { truncate: true });
  }
};
