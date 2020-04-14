'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  Comment.associate = function (models) {
    // associations can be defined here
    models.Comment.Product = models.Comment.belongsTo(models.Product, { onDelete: 'CASCADE' });
    models.Comment.User = models.Comment.belongsTo(models.User);
  };
  return Comment;
};
