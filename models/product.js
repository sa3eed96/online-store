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
  
  Product.associate = function (models) {
    models.Product.hasMany(models.Image);
    models.Product.hasMany(models.Comment);
    models.Product.hasOne(models.Comment);
    models.Product.hasMany(models.PurchaseDetail);
  };
  return Product;
};
