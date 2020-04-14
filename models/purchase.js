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
  Purchase.associate = function (models) {
    models.Purchase.belongsTo(models.User);
    models.Purchase.hasMany(models.PurchaseDetail);
  };
  return Purchase;
};
