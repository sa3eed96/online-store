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
        DiscountId: '20',
        specifications:[
        'weight:1608 gm',
        'width:26 cm',
        'height:32 cm',
        'brand:RCR',
        'Type:Water Bottle',
        'Material:Glass',
        ],
      },{
        id: 2,
        name: 'Indes Fuggerhaus Polyester Grey 140 x 245 cm Denton Single Panel Curtain',
        description: 'The grey colored curtain "Denton" comes in a classic design and fits into the most diverse living styles. Incorporated eyelets ensure a foolproof suspension. With this blackout curtain you can dim your room, an ideal sunscreen for bedroom or nursery',
        price: '150',
        rate: [0, 0, 0, 0, 0],
        SubcategoryName: 'Decor',
        specifications:[
        'weight:1 kg',
        'width:140 cm',
        'height:245 cm',
        'brand:Indes Fuggerhaus',
        'Material:polyester',
        'Type:Single Curtain Panels',
        'Pattern:Solid',
        'Country of Origin:Germany',
        'Fabric Quality:Blackout',
        'Suspension:Eyelets', 
        ],
      },{
        id: 3,
        name: 'DIY Removable Wall Stickers For Living Room Home Decor, Bead curtain',
        description: 'Removable wall stickers for iving and bed rooms, water resistant and totally removable and adhesive.',
        price: '184',
        rate: [0, 0, 0, 0, 0],
        SubcategoryName: 'Decor',
        specifications:[
        'width:70 cm',
        'height:50 cm',
        'brand:Other',
        'Theme:Cartoon',
        'Material:PVC',
        'Installation Type:Self-Adhesive',
        ]
      },{
        id: 4,
        name: 'Pro Hanson Dumbbell Bar Hand With Locks, 40 cm',
        description: 'High quality 2.8 mm diameter, 40 cm long dumbbell bar, Includes 2 spin lock star collars',
        price: '105.50',
        rate: [0, 0, 0, 0, 0],
        SubcategoryName: 'Dumbells',
        specifications:[
          'weight:1594 gm',
          'width:7.3 cm',
          'height:6.1 cm',
          'brand:Pro Hanson',
          'diameter:2.8mm',
          'Material:steel',
        ]
      },{
        id: 5,
        name: 'Double Dumbbells Vinyl, 2 KG',
        description: 'Exercising the main muscles, Suitable for women or kids, Great for home or gym workouts, Great for physiotherapy exercises',
        price: '220',
        rate: [0, 0, 0, 0, 1],
        SubcategoryName: 'Dumbells',
        specifications:[
          'weight:2 kg',
          'width:5 cm',
          'height:5 cm',
          'brand:other',
          'Targeted Group:unisex',
          'Filling Material:steel',
          'Coated Material:Rubber',
        ],
      },{
        id: 6,
        name: 'Neoprene Weight Lifting Belts Gym Belt Fitness',
        description: 'Material: NylonWaist(M):80-95Waist Belt:1. Neoprene Training Belt2. Stainless-Steel Slide Bar Buckle.',
        price: '120',
        rate: [0, 0, 0, 0, 0],
        SubcategoryName: 'Belts',
        specifications:[
          'weight:330 gm',
          'brand: Wolon',
          'MATERIAL: NYLON',
          'WAIST(M):80-95',
        ],
      }], { individualHooks: true });
  },

  down: async() => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return Product.sync({ force: true });
    
  }
};
