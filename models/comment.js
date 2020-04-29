'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  Comment.associate = function (models) {
    models.Comment.belongsTo(models.Product, { onDelete: 'CASCADE' });
    models.Comment.belongsTo(models.User, { onDelete: 'SET NULL' });
  };
  return Comment;
};
