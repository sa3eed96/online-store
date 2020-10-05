'use strict';

const UserRate = require('../models/index').UserRate;

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
   return UserRate.bulkCreate([{
      id: '20',
      rate: '4',
      comment: 'great',
    },], { 
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
    return UserRate.sync({ force: true });
  }
};
