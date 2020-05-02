'use strict';
module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define('Purchase', {
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        isFloat: true,
      },
    },
    paymentType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
    }
  }, {});

  Purchase.parseCart = function(cart){
    const purchaseDetails = [];
    let total = 0;
    for (const key in cart) {
      const ProductId = key.split('-')[0];
      const quantityPrice = cart[key].split('-');
      const quantity = quantityPrice[0];
      total += quantity * quantityPrice[1];
      purchaseDetails.push({ProductId, quantity});
    }
    if(purchaseDetails.length === 0){
      throw new Error('cart is empty');
    }
    return {purchaseDetails, total};
  };

  Purchase.associate = function (models) {
    models.Purchase.belongsTo(models.User, { onDelete: 'SET NULL' });
    models.Purchase.belongsTo(models.Shipment, { onDelete: 'SET NULL' });
    models.Purchase.hasMany(models.PurchaseDetail);
  };
  return Purchase;
};
