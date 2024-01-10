"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Waste extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Waste.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });

      Waste.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }
  Waste.init(
    {
      waste_name: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Waste",
    }
  );
  return Waste;
};
