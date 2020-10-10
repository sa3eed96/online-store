'use strict';

const News = require('../models/index').News;
const sequelize =require('../models/index').sequelize;


module.exports = {
  up: () => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return News.bulkCreate([{
        image: 'https://ik.imagekit.io/rvfdomceug/home-appliances_OXZL37QY6.jpg',
        content: 'Home Appliances Coming Soon'
      },{
        image: 'https://ik.imagekit.io/rvfdomceug/paypal-news_-s1JpXq3NSh.jpg',
        content: 'Online Payment Available Now'
      }], { individualHooks: true });
    
  },

  down: async() => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return News.sync({ force: true });
  }
};
