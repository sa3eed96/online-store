const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          min: 2,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          min: 2,
        },
      },
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
      fullName: {
        type: DataTypes.VIRTUAL,
        get: function(){
          return this.getDataValue('firstName') +
            ' ' + this.getDataValue('lastName');
        }
      },
    }, {});

    Admin.beforeSave((admin, options) => {
      if (admin.changed('password')) {
        return bcrypt.hash(admin.password, 10).then((hash) =>
          admin.password = hash);
      }
    });
    
    return Admin
};