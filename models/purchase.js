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
    return {purchaseDetails, total};
  };

  Purchase.associate = function (models) {
    models.Purchase.belongsTo(models.User);
    models.Purchase.belongsTo(models.Shipment);
    models.Purchase.hasMany(models.PurchaseDetail);
  };
  return Purchase;
};
