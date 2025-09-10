import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "collections",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "collections",
      paranoid: true,
      omitNull: true,
      freezeTableName: true,
    }
  );
};
