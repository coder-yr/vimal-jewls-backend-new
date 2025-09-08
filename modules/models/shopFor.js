/* eslint-disable import/no-anonymous-default-export */
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "shopfor",
    {
      startPrice: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      endPrice: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      megaCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "mega_categories",
          key: "id",
        },
      },
    },
    {
      tableName: "shopfor",
      paranoid: true,
      omitNull: true,
      freezeTableName: true,
    }
  );
};
