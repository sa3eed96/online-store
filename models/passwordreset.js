'use strict';

/**
 * PasswordReset Model
 * @module models/passwordreset
 */

/**
 * PasswordReset model definition
 * @param {object} sequelize - Sequelize object 
 * @param {object} DataTypes - Sequelize Datatypes object
 * @return {object} PasswordReset Model
 */
module.exports = (sequelize, DataTypes) => {
  const PasswordReset = sequelize.define('PasswordReset', {
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  PasswordReset.associate = function (models) {
    models.PasswordReset.belongsTo(models.User, { onDelete: 'CASCADE' });
  };
  return PasswordReset;
};
