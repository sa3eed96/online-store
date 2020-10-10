'use strict';

const Discount = require('../models/index').Discount;

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
   return Discount.bulkCreate([{
    id: '20', 
    name:'back to school', 
    discount: '30',
    until: Date(),
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
     return Discount.sync({ force: true });

  }
};
