/**
 * Admin Model
 * @module models/admin
 */

const bcrypt = require('bcrypt');

/**
 * Admin model definition
 * @param {object} sequelize - Sequelize object 
 * @param {object} DataTypes - Sequelize Datatypes object
 * @return {object} Admin Model
 */
module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8,
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /super|user/,
        },
      }
    }, {});

    /**
     * before save hook to hash password if changed and assign the hashed password to the model instance.
     */
    Admin.beforeSave((admin, options) => {
      if (admin.changed('password')) {
        return bcrypt.hash(admin.password, 10).then((hash) =>
          admin.password = hash);
      }
    });
    
    return Admin
};