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
        id: 1,
        ProductId: '1',
        Color: 'red',
        stockCount: '10'
      },{
        id: 2,
        ProductId: '1',
        Color: 'silver',
        stockCount: '2'
      },{
        id: 3,
        ProductId: '2',
        Color: 'Grey',
        stockCount: '50'
      },{
        id: 4,
        ProductId: '3',
        Color: 'Black',
        stockCount: '28'
      },{
        id: 5,
        ProductId: '4',
        Color: 'silver',
        stockCount: '40'
      },{
        id: 6,
        ProductId: '5',
        Color: 'blue',
        stockCount: '30'
      },{
        id: 7,
        ProductId: '6',
        Color: 'black',
        stockCount: '35'
      }], { individualHooks: true });
    
  },

  down: async() => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      await sequelize.sync();
      return Color.sync({ force: true });
    
  }
};
