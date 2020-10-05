'use strict';
const Shipment = require('../models/index').Shipment;

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
   return Shipment.bulkCreate([{
      id: '20',
      AddressId: 1,
      delivered: true
    },{
      id: '21',
      AddressId: 1,
      delivered: true
    },{
      id: '22',
      AddressId: 1,
      delivered: false
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
    return Shipment.sync({ force: true });
  }
};
