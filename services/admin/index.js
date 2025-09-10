import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import db from "./db.js";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSSequelize from "@adminjs/sequelize";
import AdminJS from "adminjs";
import bodyParser from "body-parser";
import MySQLStore from "express-mysql-session";
import session from "express-session";
import { components, loader } from "./component_loader.js";
dotenv.config();
const DEFAULT_ADMIN = {
  email: process.env.ADMINEMAIL,
  password: process.env.PASSWORD,
};
const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};
// EXPRESS APP
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/public", express.static("public"));
// TODO comment this
// db.sequelize.sync({ force: true });

AdminJS.registerAdapter(AdminJSSequelize);
const admin = new AdminJS({
  rootPath: "/",
  databases: [db],
  settings: {
    defaultPerPage: 10,
  },
  resources: [
    {
      resource: db.products,
      options: {
        navigation: {
          icon: "Heart",
        },
        listProperties: [
          "name",
          "price",
          "trendingOrder",
          "slug",
          "categoryId",
          "collectionId",
        ],
        properties: {
          categoryId: {
            reference: "categories",
          },
          collectionId: {
            reference: "collections",
          },
          description: {
            components: {
              edit: components.DescriptionRichText,
            },
          },
          instructions: {
            components: {
              edit: components.DescriptionRichText,
            },
          },
          productDetails: {
            components: {
              edit: components.KeyValueList,
            },
          },
          images: {
            components: {
              edit: components.UploadMultipleImage,
            },
          },
          sizes: {
            components: {
              edit: components.SizeColorStock,
            },
          },
          sizeChart: {
            components: {
              edit: components.SizeChart,
            },
          },
        },
      },
    },
    // Admin logs resource
    {
      resource: db.adminLogs,
      options: {
        navigation: {
          icon: "Document",
        },
        listProperties: ["adminEmail", "action", "resource", "details", "createdAt"],
        properties: {},
      },
    },

    {
      resource: db.megaCategories,
      options: {
        navigation: {
          icon: "File",
        },
        listProperties: ["name", "active", "showHomeShopByCategory"],
        properties: {
          image: {
            components: {
              edit: components.UploadSingleImage,
              show: components.ViewSingleImage,
            },
          },
        },
      },
    },
    {
      resource: db.styles,
      options: {
        navigation: {
          icon: "File",
        },
        listProperties: ["name", "megaCategoryId", "active", "image"],
        properties: {
          megaCategoryId: {
            reference: "mega_categories",
          },
          image: {
            components: {
              edit: components.UploadSingleImage,
              show: components.ViewSingleImage,
              list: components.ViewSingleImage,
            },
          },
        },
      },
    },
    {
      resource: db.materials,
      options: {
        navigation: {
          icon: "File",
        },
        listProperties: ["name", "megaCategoryId", "active", "image"],
        properties: {
          megaCategoryId: {
            reference: "mega_categories",
          },
          image: {
            components: {
              edit: components.UploadSingleImage,
              show: components.ViewSingleImage,
              list: components.ViewSingleImage,
            },
          },
        },
      },
    },
    {
      resource: db.shopFor,
      options: {
        navigation: {
          icon: "File",
        },
        listProperties: ["startPrice", "endPrice", "megaCategoryId", "active"],
        properties: {
          megaCategoryId: {
            reference: "mega_categories",
          },
        },
      },
    },
    {
      resource: db.occasions,
      options: {
        navigation: {
          icon: "File",
        },
        listProperties: ["name", "megaCategoryId", "active", "image"],
        properties: {
          megaCategoryId: {
            reference: "mega_categories",
          },
          image: {
            components: {
              edit: components.UploadSingleImage,
              show: components.ViewSingleImage,
              list: components.ViewSingleImage,
            },
          },
        },
      },
    },
    {
      resource: db.banners,
      options: {
        navigation: {
          icon: "Bold",
        },
        listProperties: ["image", "active", "url"],
        properties: {
          image: {
            components: {
              edit: components.UploadSingleImage,
              list: components.ViewSingleImage,
              show: components.ViewSingleImage,
            },
          },
        },
      },
    },
    {
      resource: db.subBanners,
      options: {
        navigation: {
          icon: "Bold",
        },
        listProperties: ["heading", "image", "active", "url"],
        properties: {
          image: {
            components: {
              edit: components.UploadSingleImage,
              list: components.ViewSingleImage,
              show: components.ViewSingleImage,
            },
          },
        },
      },
    },
    {
      resource: db.home,
      options: {
        navigation: {
          icon: "Bold",
        },
        listProperties: ["text"],
        properties: {
          otherBannerImage: {
            components: {
              edit: components.UploadSingleImage,
              list: components.ViewSingleImage,
              show: components.ViewSingleImage,
            },
          },
          feedImages: {
            components: {
              edit: components.UploadMultipleImage,
            },
          },
          feedVideos: {
            // TODO
            components: {
              edit: components.UploadMultipleImage,
            },
          },
        },
      },
    },

    {
      resource: db.runningList,
      options: {
        navigation: {
          icon: "ArrowUp",
        },
        listProperties: ["texts"],
        properties: {
          texts: {
            components: {
              edit: components.CreateStringList,
              list: components.ViewStringList,
              show: components.ViewStringList,
            },
          },
        },
      },
    },
  ],
  loginPath: "/login",
  branding: {
    companyName: "Vimal Jewellers",
    favicon: "./public/logo.svg",
    logo: "./public/logo.svg",
    withMadeWithLove: false,
  },
  version: {
    admin: false,
    app: "1.0.0",
  },
  componentLoader: loader,
  dashboard: {
    component: components.DashboardComponent,
  },
  assets: {
    styles: ["./public/custom_style.css"],
  },
  logoutPath: "/logout",
});

await admin.watch();

// MYSQL SESSION
const config = {
  dialect: "mysql",
  host: "127.0.0.1",
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
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
const mysqlStore = MySQLStore(session);
const sessionStore = new mysqlStore({
  host: config.host,
  port: 3306,
  user: config.username,
  password: config.password,
  database: config.database,
});

// building router
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookieName: "getnglow",
    cookiePassword: "sessionsecret",
  },
  null,
  {
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET_KEY,
    cookie: {
      maxAge: 86400000,
    },
  }
);
app.use(admin.options.rootPath, adminRouter);
app.use(bodyParser.json());

const PORT = process.env.PORT || 7503;
app.listen(PORT, () => {
  console.log(
    `🚀 Vimal Jewellers Admin Panel running at http://localhost:${PORT} `
  );
});
