'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pairing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  Pairing.init({
    buyer_id: DataTypes.INTEGER,
    waste_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pairing',
  });
  return Pairing;
};