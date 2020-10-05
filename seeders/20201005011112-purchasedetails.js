'use strict';

const PurchaseDetail = require('../models/index').PurchaseDetail;


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
   return PurchaseDetail.bulkCreate([{
      id: '20',
      PurchaseId:'20',
      ProductId: 5, 
      quantity: 1, 
      color: 'blue',
      UserRateId: '20',
    },{
      id: '21',
      PurchaseId:'21',
      ProductId: 1, 
      quantity: 1, 
      color: 'red',
    },{
      id: '22',
      PurchaseId:'22',
      ProductId: 2, 
      quantity: 1, 
      color: 'Grey',
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
    return PurchaseDetail.sync({ force: true });
  }
};
