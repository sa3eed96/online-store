'use strict';

const Address = require('../models/index').Address;
const sequelize =require('../models/index').sequelize;


module.exports = {
  up: () => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return Address.bulkCreate([{
        country: 'Egypt',
        city: 'Cairo',
        address: '10 heliopolis street',
        zipCode: '11757',
        UserId: 1,
      }], {  individualHooks: true });
  },

  down: async() => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      await sequelize.sync();
      return Address.sync({ force: true });
  }
};
