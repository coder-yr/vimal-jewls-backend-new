import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "orders",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      items: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      total: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      address: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      tableName: "orders",
      paranoid: true,
      omitNull: true,
      freezeTableName: true,
    }
  );
};
