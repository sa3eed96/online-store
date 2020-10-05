'use strict';
const Purchase = require('../models/index').Purchase;

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
      return Purchase.bulkCreate([{
        id: '20',
        UserId: '1',
        total: '220',
        isPaid: true,
        paymentType: 'ondoor',
        ShipmentId: '20',
    },{
      id: '21',
      UserId: '1',
      total: '4',
      isPaid: false,
      paymentType: 'ondoor',
      ShipmentId: '21',
    },{
      id: '22',
      UserId: '1',
      total: '150',
      isPaid: false,
      paymentType: 'ondoor',
      ShipmentId: '22',
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
    return Purchase.sync({ force: true });

  }
};
