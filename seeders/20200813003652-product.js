'use strict';

const Product = require('../models/index').Product;
const sequelize =require('../models/index').sequelize;


module.exports = {
  up: () => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return Product.bulkCreate([{
        id: 1,
        name: 'RCR Glass Water Bottle,  Clear',
        description: 'Glass and clear Bottle with diffrent colors for water and juice, Dish washer proof',
        price: '4',
        rate: [0, 0, 0, 0, 0],
        SubcategoryName: 'Kitchen',
      },{
        id: 2,
        name: 'Indes Fuggerhaus Polyester Grey 140 x 245 cm Denton Single Panel Curtain',
        description: 'The grey colored curtain "Denton" comes in a classic design and fits into the most diverse living styles. Incorporated eyelets ensure a foolproof suspension. With this blackout curtain you can dim your room, an ideal sunscreen for bedroom or nursery',
        price: '150',
        rate: [0, 0, 0, 0, 0],
        SubcategoryName: 'Decor',
      },{
        id: 3,
        name: 'DIY Removable Wall Stickers For Living Room Home Decor, Bead curtain',
        description: 'Removable wall stickers for iving and bed rooms, water resistant and totally removable and adhesive.',
        price: '184',
        rate: [0, 0, 0, 0, 0],
        SubcategoryName: 'Decor',
      },{
        id: 4,
        name: 'Pro Hanson Dumbbell Bar Hand With Locks, 40 cm',
        description: 'High quality 2.8 mm diameter, 40 cm long dumbbell bar, Includes 2 spin lock star collars',
        price: '105.50',
        rate: [0, 0, 0, 0, 0],
        SubcategoryName: 'Dumbells',
      },{
        id: 5,
        name: 'Double Dumbbells Vinyl, 2 KG',
        description: 'Exercising the main muscles, Suitable for women or kids, Great for home or gym workouts, Great for physiotherapy exercises',
        price: '220',
        rate: [0, 0, 0, 0, 0],
        SubcategoryName: 'Dumbells',
      },{
        id: 6,
        name: 'Neoprene Weight Lifting Belts Gym Belt Fitness',
        description: 'Material: NylonWaist(M):80-95Waist Belt:1. Neoprene Training Belt2. Stainless-Steel Slide Bar Buckle.',
        price: '120',
        rate: [0, 0, 0, 0, 0],
        SubcategoryName: 'Belts',
      }], { individualHooks: true });
  },

  down: async() => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      await sequelize.sync();
      return Product.sync({ force: true });
    
  }
};
