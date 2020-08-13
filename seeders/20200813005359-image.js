'use strict';

const Image = require('../models/index').Image;
const sequelize =require('../models/index').sequelize;

module.exports = {
  up: () => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return Image.bulkCreate([{
        ColorId: '1',
        image: 'https://ik.imagekit.io/rvfdomceug/red_MVo3o3tlUvoU.jpg',
      },{
        ColorId: '1',
        image: 'https://ik.imagekit.io/rvfdomceug/redbottle_zc15Lw8_a.jpg',
      },{
        ColorId: '2',
        image: 'https://ik.imagekit.io/rvfdomceug/silver_EO4EGRrXQw.jpg',
      },{
        ColorId: '3',
        image: 'https://ik.imagekit.io/rvfdomceug/cur1_aH7fuMOWc5X.jpg',
      },{
        ColorId: '3',
        image: 'https://ik.imagekit.io/rvfdomceug/cur2_nIKc8Ce3MJh.jpg',
      },{
        ColorId: '4',
        image: 'https://ik.imagekit.io/rvfdomceug/d1_TZMPr5Luoy7.jpg'
      },{
        ColorId: '4',
        image: 'https://ik.imagekit.io/rvfdomceug/d2_L4LybozO6L2.jpg',
      },{
        ColorId: '5',
        image: 'https://ik.imagekit.io/rvfdomceug/d1_NrtIeKS3r.jpg',
      },{
        ColorId: '5',
        image: 'https://ik.imagekit.io/rvfdomceug/d2_-JsMK_GEM2s.jpg',
      },{
        ColorId: '6',
        image: 'https://ik.imagekit.io/rvfdomceug/bd1_SKwWjCYWm.jpg',
      },{
        ColorId: '7',
        image: 'https://ik.imagekit.io/rvfdomceug/belt1_oDGII_sk8.jpg',
      },{
        ColorId: '7',
        image: 'https://ik.imagekit.io/rvfdomceug/belt2_aXSYJNge_9.jpg',
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
