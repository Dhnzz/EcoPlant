"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasMany(models.Waste, {
        foreignKey: "company_id",
        as: "company",
      });

      Company.belongsToMany(models.Waste, {
        through: 'Pairing',
        as: 'pair',
        foreignKey: 'buyer_id'
      });
    }
  }
  Company.init(
    {
      company_name: DataTypes.STRING,
      // role: DataTypes.ENUM(0,1)
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
