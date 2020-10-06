'use strict';

const PasswordReset = require('../models/index').PasswordReset;

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return PasswordReset.bulkCreate([{
    id: '20', 
    link:'123', 
    UserId: 1
    }], { 
    individualHooks: true 
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
     return PasswordReset.sync({ force: true });

  }
};
