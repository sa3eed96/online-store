'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /(\w|'|-|\s)+/,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        isFloat: true,
      },
    },
    discount: {
      type: DataTypes.INTEGER,
      default: 0,
      validate: {
        min: 0,
        max: 100,
        isInt: true,
      },
    },
    stockCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        isInt: true,
      },
    },
    discountPrice: {
      type: DataTypes.VIRTUAL,
      get: function(){
        return this.getDataValue('price') +
          this.getDataValue('price') * this.getDataValue('discount');
      },
    }
  }, {});
  

  Product.getUpdateQuery = function(purchaseDetails){
    const query = 'update product set stockCount = ';
    const ids = '';
    if(purchaseDetails.length === 1){
      query+='case ';
      for (const detail of purchaseDetails) {
        query+=`when id=${detail.ProductId} then stockCount-${detail} `;
        ids+=`${detail.id},`;
      }
      query+= 'end ';
    }else{
      query+=`stockCount-${purchaseDetails[0].quantity} `;
    }
    ids = ids.substring(0, ids.length -1);
    query+=`where id in (${ids})`;
  };

  Product.associate = function (models) {
    models.Product.hasMany(models.Image);
    models.Product.hasMany(models.Comment);
    models.Product.hasOne(models.Rate);
    models.Product.hasMany(models.PurchaseDetail);
  };
  return Product;
};
