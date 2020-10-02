'use strict';

/**
 * Purchase Model
 * @module models/purchase
 */


/**
 * Purchase model definition
 * @param {object} sequelize - Sequelize object 
 * @param {object} DataTypes - Sequelize Datatypes object
 * @return {object} Purchase Model
 */
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

  /**
   * this function parses the cart
   * @param {object} cart - cart object
   * @returns {object} -json object containing total:number and purchaseDetails:PurchaseDetail[]
   */
  Purchase.parseCart = function(cart){
    const purchaseDetails = [];
    let total = 0;
    for (const key in cart) {
      const ProductId = key.split('-')[0];
      const color = key.split('-')[2];
      const quantityPrice = cart[key].split('-');
      const quantity = quantityPrice[0];
      total += quantity * quantityPrice[1];
      purchaseDetails.push({ProductId, quantity, color});
    }
    if(purchaseDetails.length === 0){
      throw new Error('cart is empty');
    }
    return {purchaseDetails, total};
  };

  Purchase.associate = function (models) {
    models.Purchase.belongsTo(models.User, { onDelete: 'SET NULL' });
    models.Purchase.belongsTo(models.Shipment);
    models.Purchase.hasMany(models.PurchaseDetail, {onDelete: 'CASCADE'});
  };
  return Purchase;
};
