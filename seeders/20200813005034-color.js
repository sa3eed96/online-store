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
        images:[
          'https://ik.imagekit.io/rvfdomceug/red_MVo3o3tlUvoU.jpg',
          'https://ik.imagekit.io/rvfdomceug/redbottle_zc15Lw8_a.jpg',
        ],
        stockCount: '10',
      },{
        id: 2,
        ProductId: '1',
        Color: 'silver',
        images:[
          'https://ik.imagekit.io/rvfdomceug/silver_EO4EGRrXQw.jpg',
        ],
        stockCount: '2'
      },{
        id: 3,
        ProductId: '2',
        Color: 'Grey',
        images:[
          'https://ik.imagekit.io/rvfdomceug/cur1_aH7fuMOWc5X.jpg',
          'https://ik.imagekit.io/rvfdomceug/cur2_nIKc8Ce3MJh.jpg',
        ],
        stockCount: '50'
      },{
        id: 4,
        ProductId: '3',
        Color: 'Black',
        images:[
          'https://ik.imagekit.io/rvfdomceug/d1_TZMPr5Luoy7.jpg',
          'https://ik.imagekit.io/rvfdomceug/d2_L4LybozO6L2.jpg',
        ],
        stockCount: '28'
      },{
        id: 5,
        ProductId: '4',
        Color: 'silver',
        images:[
          'https://ik.imagekit.io/rvfdomceug/d1_NrtIeKS3r.jpg',
          'https://ik.imagekit.io/rvfdomceug/d2_-JsMK_GEM2s.jpg',
        ],
        stockCount: '40'
      },{
        id: 6,
        ProductId: '5',
        Color: 'blue',
        images:[
          'https://ik.imagekit.io/rvfdomceug/bd1_SKwWjCYWm.jpg',
        ],
        stockCount: '30'
      },{
        id: 7,
        ProductId: '6',
        Color: 'black',
        images:[
          'https://ik.imagekit.io/rvfdomceug/belt1_oDGII_sk8.jpg',
          'https://ik.imagekit.io/rvfdomceug/belt2_aXSYJNge_9.jpg',
        ],
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
