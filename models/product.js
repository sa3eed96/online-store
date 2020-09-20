'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLength:{min: 2},
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
    rate: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      default: [0, 0, 0, 0, 0],
    },
    specifications: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      default: [],
    },
  }, {
    indexes: [
      {
        using: 'BTREE',
        fields: ['SubcategoryName', 'name']
      }
    ]
  });
  

  Product.getUpdateQuery = function(purchaseDetails){
    let query = 'update "Colors" set "stockCount" = ';
    let ids = '';
    if(purchaseDetails.length > 1){
      query+='case ';
      for (const detail of purchaseDetails) {
        query+=`when "ProductId"=${detail.ProductId} and "Color"='${detail.color}' then "stockCount"-${detail.quantity} `;
        ids+=`${detail.ProductId},`;
      }
      query+= 'end ';
      ids = ids.substring(0, ids.length -1);
      return query+=`where "ProductId" in (${ids})`;
    }else{
      return query+=`"stockCount"-${purchaseDetails[0].quantity} where "ProductId"=${purchaseDetails[0].ProductId} and "Color"='${purchaseDetails[0].color}'`;
    }
  };

  Product.getDeleteQuery = function(purchaseDetails){
    let query = 'update "Colors" set "stockCount" = ';
    let ids = '';
    if(purchaseDetails.length > 1){
      query+='case ';
      for (const detail of purchaseDetails) {
        query+=`when "ProductId"=${detail.ProductId} and "Color"='${detail.color}' then "stockCount"+${detail.quantity} `;
        ids+=`${detail.ProductId},`;
      }
      query+= 'end ';
      ids = ids.substring(0, ids.length -1);
      return query+=`where "ProductId" in (${ids})`;
    }else{
      return query+=`"stockCount"+${purchaseDetails[0].quantity} where "ProductId"=${purchaseDetails[0].ProductId} and "Color"='${purchaseDetails[0].color}'`;
    }
  };

  Product.associate = function (models) {
    models.Product.hasMany(models.Color);
    models.Product.hasMany(models.PurchaseDetail);
    models.Product.belongsTo(models.Subcategory);
    models.Product.belongsTo(models.Discount);

  };
  return Product;
};
