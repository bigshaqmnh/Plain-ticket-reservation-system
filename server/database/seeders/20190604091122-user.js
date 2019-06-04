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
        password_hash: genPassHash('qwerty'),
        is_admin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4af5fd33-c752-4e10-ab24-d5f5d54c433a',
        username: 'Batman98',
        email: 'hatesuperman@gmail.com',
        password_hash: genPassHash('j0k3r-p0k3r'),
        is_admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, { truncate: true });
  }
};
