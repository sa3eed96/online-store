'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Image.associate = function (models) {
    models.Image.belongsTo(models.Product, { onDelete: 'CASCADE' });
  };
  return Image;
};
