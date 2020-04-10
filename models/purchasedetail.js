'use strict';
module.exports = (sequelize, DataTypes) => {
  const PurchaseDetail = sequelize.define('PurchaseDetail', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        isInteger: true,
      },
    },
  }, {});
  PurchaseDetail.associate = function (models) {
    models.PurchaseDetail.belongsTo(models.Purchase, { onDelete: 'CASCADE' });
    models.PurchaseDetail.belongsTo(models.Product, { onDelete: 'CASCADE' });
  };
  return PurchaseDetail;
};
