'use strict';

const Rate = require('../models/index').Rate;
const sequelize =require('../models/index').sequelize;


module.exports = {
  up: () => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return Rate.bulkCreate([{
        ProductId: '1',
        rate: [0, 0, 0, 0, 0],
      },{
        ProductId: '2',
        rate: [0, 0, 0, 0, 0],
      },{
        ProductId: '3',
        rate: [0, 0, 0, 0, 0],
      },{
        ProductId: '4',
        rate: [0, 0, 0, 0, 0],
      },{
        ProductId: '5',
        rate: [0, 0, 0, 0, 0],
      },{
        ProductId: '6',
        rate: [0, 0, 0, 0, 0],
      }], { individualHooks: true });
    
  },

  down: async() => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      await sequelize.sync();
      return Rate.sync({ force: true });
  }
};
