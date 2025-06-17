import dotnet from "dotenv";

dotnet.config();

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    migrationStorageTableName: "sequelize_meta",
    seederStorageTableName: "sequelize_seeds",
    migrations: ["src/app/migrations/*.js"],
    seeders: ["src/app/seeders/*.js"]
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    migrationStorageTableName: "sequelize_meta",
    seederStorageTableName: "sequelize_seeds",
    migrations: ["src/app/migrations/*.js"],
    seeders: ["src/app/seeders/*.js"]
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    migrationStorageTableName: "sequelize_meta",
    seederStorageTableName: "sequelize_seeds",
    migrations: ["src/app/migrations/*.js"],
    seeders: ["src/app/seeders/*.js"]
  },
};