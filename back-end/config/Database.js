import { Sequelize } from "sequelize";

const db = new Sequelize("db_pbkk", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
