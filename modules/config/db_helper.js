import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import banners from "../models/banners.js";
import users from "../models/users.js";
import orders from "../models/orders.js";
import categories from "../models/categories.js";
import collections from "../models/collections.js";
import megaCategories from "../models/mega_categories.js";
import home from "../models/home.js";
import products from "../models/products.js";
import runningList from "../models/runningList.js";
import materials from "../models/materials.js";
import occasions from "../models/occasions.js";
import shopFor from "../models/shopFor.js";
import styles from "../models/styles.js";
import subBanners from "../models/sub_banners.js";
import adminLogs from "../models/admin_logs.js";
import wishlist from "../models/wishlist.js";

// CREATEs A DATABASE CONNECTION AND INSTANCE
const createDatabaseReference = () => {
  dotenv.config();
  const config = {
    dialect: "mysql",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
    username: process.env.DATABASE_USER || "",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_NAME || "",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    migrations: {
      path: "./migrations",
    },
  };

  //SETTING UP SEQUELIZE
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
      },
      dialectOptions: {
        ssl: process.env.DATABASE_SSL === "true" ? {
          require: true,
          rejectUnauthorized: false
        } : undefined
      }
    }
  );

  // CREATE COMMON DB INSTANCE
  const db = {
    config: config,
    sequelize: sequelize,
    banners: banners(sequelize),
    subBanners: subBanners(sequelize),
    megaCategories: megaCategories(sequelize),
    styles: styles(sequelize),
    materials: materials(sequelize),
    shopFor: shopFor(sequelize),
    occasions: occasions(sequelize),
    home: home(sequelize),
    products: products(sequelize),
    runningList: runningList(sequelize),
    categories: categories(sequelize),
    collections: collections(sequelize),
    orders: orders(sequelize),
    users: users(sequelize),
    adminLogs: adminLogs(sequelize, Sequelize.DataTypes),
    wishlist: wishlist(sequelize),
  };

  // MAPPINGs
  db.megaCategories.hasMany(db.styles, {
    as: "styles",
    foreignKey: "megaCategoryId",
  });
  db.styles.belongsTo(db.megaCategories, {
    as: "styleMegaCategory",
    foreignKey: "megaCategoryId",
  });
  db.megaCategories.hasMany(db.materials, {
    as: "materials",
    foreignKey: "megaCategoryId",
  });
  db.materials.belongsTo(db.megaCategories, {
    as: "materialMegaCategory",
    foreignKey: "megaCategoryId",
  });
  db.megaCategories.hasMany(db.shopFor, {
    as: "shopFors",
    foreignKey: "megaCategoryId",
  });
  db.shopFor.belongsTo(db.megaCategories, {
    as: "shopForMegaCategory",
    foreignKey: "megaCategoryId",
  });
  db.megaCategories.hasMany(db.occasions, {
    as: "occassions",
    foreignKey: "megaCategoryId",
  });
  db.occasions.belongsTo(db.megaCategories, {
    as: "occasionMegaCategory",
    foreignKey: "megaCategoryId",
  });

  db.categories.hasMany(db.products, {
    as: "products",
    foreignKey: "categoryId",
  });
  db.products.belongsTo(db.categories, {
    as: "productCategory",
    foreignKey: "categoryId",
  });
  db.collections.hasMany(db.products, {
    as: "products",
    foreignKey: "collectionId",
  });
  db.products.belongsTo(db.collections, {
    as: "productCollection",
    foreignKey: "collectionId",
  });

  return db;
};

export default createDatabaseReference;
