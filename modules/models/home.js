/* eslint-disable import/no-anonymous-default-export */
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "home_data",
    {
      youtubeVideoUrl: {
        type: DataTypes.STRING,
      },
      exploreUrl: {
        type: DataTypes.STRING,
      },
      text: {
        type: DataTypes.TEXT,
      },
      otherBannerImage: {
        type: DataTypes.STRING,
      },
      feedImages: {
        type: DataTypes.JSON,
      },
      feedVideos: {
        type: DataTypes.JSON,
      },
    },
    {
      tableName: "home_data",
      paranoid: true,
      omitNull: true,
      freezeTableName: true,
    }
  );
};
