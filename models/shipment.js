'use strict';

/**
 * Shipment Model
 * @module models/shipment
 */


/**
 * Shipment model definition
 * @param {object} sequelize - Sequelize object 
 * @param {object} DataTypes - Sequelize Datatypes object
 * @return {object} Shipment Model
 */
module.exports = (sequelize, DataTypes) => {
  const Shipment = sequelize.define('Shipment', {
    delivery: {
        type: DataTypes.DATEONLY,
        validate: {
            isDate: true,
        },
    },
    delivered: {
        type: DataTypes.BOOLEAN,
        default: 0,
    },
  }, {});

  /**
   * calculate shipment delivery time by getting the earliest date where DELIVERYCAPACITY env variable is not reached.
   */
  Shipment.beforeSave(async (shipment, options) => {
    if (!shipment.delivery) {
      const maxDate = await Shipment.max('delivery');
      const c = await Shipment.count({
        where:{
          delivery: maxDate
        }
      });
      const temp = new Date(maxDate.toString());
      if((c === 0) || (temp <= new Date())){
        let time = new Date();
        time = time.setDate(time.getDate()+1);
        shipment.delivery = time;
      }
      else if(c < process.env.DELIVERYCAPACITY){
        shipment.delivery = maxDate;
      }
      else{
        let time = new Date(maxDate.toString());
        time = time.setDate(time.getDate()+1);
        shipment.delivery = time;
      }
    }
  });

  Shipment.associate = function (models) {
    models.Shipment.hasOne(models.Purchase);
    models.Shipment.belongsTo(models.Address, { onDelete: 'SET NULL' });
  };
  return Shipment;
};
