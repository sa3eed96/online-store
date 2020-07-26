'use strict';
module.exports = (sequelize, DataTypes) => {
  const PurchaseDetail = sequelize.define('PurchaseDetail', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        isInt: true,
      },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  PurchaseDetail.associate = function (models) {
    models.PurchaseDetail.belongsTo(models.Purchase, { onDelete: 'CASCADE' });
    models.PurchaseDetail.belongsTo(models.Product, { onDelete: 'SET NULL' });
    models.PurchaseDetail.belongsTo(models.UserRate, {onDelete: 'CASCADE'});
  };
  return PurchaseDetail;
};
