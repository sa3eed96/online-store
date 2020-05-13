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
    rate: {
      type: DataTypes.INTEGER,
      validate: {
        min:0,
        max:4,
        isInt: true,
      },
    },
    comment: {
      type: DataTypes.TEXT,
    },
  }, {});
  PurchaseDetail.associate = function (models) {
    models.PurchaseDetail.belongsTo(models.Purchase, { onDelete: 'CASCADE' });
    models.PurchaseDetail.belongsTo(models.Product, { onDelete: 'SET NULL' });
  };
  return PurchaseDetail;
};
