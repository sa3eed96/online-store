'use strict';

const Specification = require('../models/index').Specification;
const sequelize =require('../models/index').sequelize;


module.exports = {
  up: () => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return Specification.bulkCreate([{
        ProductId: '1',
        weight: '1608 gm',
        width: ' 26 cm',
        height: '32 cm',
        brand: 'RCR',
        specs: 'Type:Water Bottle,Material:Glass',
      },{
        ProductId: '2',
        weight: '1 kg',
        width: ' 140 cm',
        height: '245 cm',
        brand: 'Indes Fuggerhaus',
        specs: 'Material:polyester,Type:Single Curtain Panels,Pattern:Solid,Country of Origin:Germany,Fabric Quality:Blackout,Suspension:Eyelets',
      },{
        ProductId: '3',
        weight: '-',
        width: ' 70 cm',
        height: '50 cm',
        brand: 'Other',
        specs: 'Theme:Cartoon,Material:PVC,Installation Type:Self-Adhesive',
      },{
        ProductId: '4',
        weight: '1594 gm',
        width: ' 7.3 cm',
        height: '6.1 cm',
        brand: 'Pro Hanson',
        specs: 'diameter: 2.8mm, Material:steel',
      },{
        ProductId: '5',
        weight: '2 kg',
        width: ' 5 cm',
        height: '5 cm',
        brand: 'other',
        specs: 'Targeted Group:unisex,Filling Material:steel,Coated Material:Rubber',
      },{
        ProductId: '6',
        weight: '330 gm',
        width: '-',
        height: '-',
        brand: 'Wolon',
        specs: 'MATERIAL: NYLON, WAIST(M):80-95',
      }], { individualHooks: true });
    
  },

  down: async() => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      await sequelize.sync();
      return Specification.sync({ force: true });
  }
};
