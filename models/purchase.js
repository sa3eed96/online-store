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

  Purchase.associate = function (models) {
    models.Purchase.belongsTo(models.User, { onDelete: 'SET NULL' });
    models.Purchase.belongsTo(models.Shipment);
    models.Purchase.hasMany(models.PurchaseDetail, {onDelete: 'CASCADE'});
  };
  return Purchase;
};
