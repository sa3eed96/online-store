'use strict';
/**
 * User Model
 * @module models/user
 */

const bcrypt = require('bcrypt');

/**
 * User model definition
 * @param {object} sequelize - Sequelize object 
 * @param {object} DataTypes - Sequelize Datatypes object
 * @return {object} User Model
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLength: {
          min:2
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLength: {
          min:2
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLength: {
          min:2
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        validator: function(v) {
          return /[0-9]{11}/.test(v);
        },
      },
    },
    loginCount: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        min: 0,
        max: 5,
      },
    },
    lockUntil: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        isAfter: Date(),
      },
    },
    verified: {
      type: DataTypes.BOOLEAN,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get: function(){
        return this.getDataValue('firstName') +
          ' ' + this.getDataValue('lastName');
      }
    },
    isLocked: {
      type: DataTypes.VIRTUAL,
      get: function(){
        return this.getDataValue('lockUntil') > new Date();
      }
    }
  },{});

  User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
  
    delete values.password;
    delete values.loginCount;
    delete values.lockUntil;
    return values;
  }

  /**
   * function to lock account if 5 consecutive failed login attempts reached, if not increase loginCount by 1
   */
  User.prototype.incLoginCountAndLock = function(){
    const loginCount = this.getDataValue('loginCount');
    if (loginCount === 5) {
      this.setDataValue('loginCount', 0);

      let time = new Date();
      this.setDataValue('lockUntil', new Date(time.setTime(time.getTime() + 3600000 * 3)));
    }
    else
      this.setDataValue('loginCount', loginCount + 1);
    return this.save();
  };

  /**
   * reset loginCount counter to 0 on successful login.
   */
  User.prototype.successfulLogin = function(){
    this.setDataValue('loginCount', 0);
    return this.save();
  };

  /**
   * before save hook to hash password if changed and assign the hashed password to the model instance.
   */
  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      return bcrypt.hash(user.password, 10).then((hash) =>
        user.password = hash);
    }
  });

  User.associate = function (models) {
    models.User.hasMany(models.Address);
    models.User.hasMany(models.Refund);
    models.User.hasMany(models.Purchase);
  };
  return User;
};
