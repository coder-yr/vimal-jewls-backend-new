import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "categories",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "categories",
      paranoid: true,
      omitNull: true,
      freezeTableName: true,
    }
  );
};
