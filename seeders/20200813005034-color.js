'use strict';

const Color = require('../models/index').Color;
const sequelize =require('../models/index').sequelize;

module.exports = {
  up: () => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return Color.bulkCreate([{
        ProductId: '1',
        Color: 'red',
        stockCount: '10'
      },{
        ProductId: '1',
        Color: 'silver',
        stockCount: '2'
      },{
        ProductId: '2',
        Color: 'Grey',
        stockCount: '50'
      },{
        ProductId: '3',
        Color: 'Black',
        stockCount: '28'
      },{
        ProductId: '4',
        Color: 'silver',
        stockCount: '40'
      },{
        ProductId: '5',
        Color: 'blue',
        stockCount: '30'
      },{
        ProductId: '6',
        Color: 'black',
        stockCount: '35'
      }], { individualHooks: true });
    
  },

  down: () => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return sequelize.sync({ force: true });
    
  }
};
