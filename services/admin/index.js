import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import db from "./db.js";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSSequelize from "@adminjs/sequelize";
import AdminJS from "adminjs";
// use express.json() instead of body-parser to avoid extra dependency at root
import MySQLStore from "express-mysql-session";
import session from "express-session";
import { components, loader } from "./component_loader.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
// Factory to build Admin router; allows mounting under another Express app
export async function buildAdminRouter({
  rootPath = "/admin",
  corsOrigins = ["http://localhost:3000"],
} = {}) {
  const router = express.Router();
  router.use(
    cors({
      origin: corsOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  // static assets for custom components, served under the admin path
  router.use(`${rootPath}/public`, express.static(path.join(__dirname, "public")));
// TODO comment this
// db.sequelize.sync({ force: true });

  AdminJS.registerAdapter(AdminJSSequelize);
  const admin = new AdminJS({
    rootPath,
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
  loginPath: `${rootPath}/login`,
  branding: {
    companyName: "Vimal Jewellers",
    favicon: `${rootPath}/public/logo.svg`,
    logo: `${rootPath}/public/logo.svg`,
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
    styles: [`${rootPath}/public/custom_style.css`],
  },
  logoutPath: `${rootPath}/logout`,
  });

  // Build AdminJS frontend bundles before mounting
  if (typeof admin.initialize === "function") {
    await admin.initialize();
  }
  // In dev, rebuild AdminJS bundle when components change (non-blocking)
  if (process.env.ADMIN_WATCH === "true" && typeof admin.watch === "function") {
    admin.watch().catch((e) => {
      console.warn("AdminJS watch failed:", e?.message || e);
    });
  }

// MYSQL SESSION
const config = {
  dialect: "mysql",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
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
  ssl: {
    rejectUnauthorized: true
  },
};
const mysqlStore = MySQLStore(session);
const sessionStore = new mysqlStore({
  host: config.host,
  port: config.port,
  user: config.username,
  password: config.password,
  database: config.database,
  ssl: {
    rejectUnauthorized: true
  },
});

// building router (debug middleware can be added here if needed)

  // Quick health check and debug logs for admin mount
  router.get(`${rootPath}/health`, (req, res) => {
    res.json({ ok: true, rootPath, time: new Date().toISOString() });
  });
  router.use(rootPath, (req, _res, next) => {
    if (process.env.DEBUG_ADMIN === "true") {
      console.log(`[Admin] ${req.method} ${req.originalUrl}`);
    }
    next();
  });

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
  router.use(admin.options.rootPath, adminRouter);
  router.use(express.json());

  // Debugging: log errors
  router.use((err, req, res, next) => {
    console.error("AdminJS error:", err);
    next(err);
  });

  return router;
}
