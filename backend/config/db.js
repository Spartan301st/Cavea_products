import Sequelize from "sequelize";
// for environment vars
import "dotenv/config.js";
// our instance of new DB using Sequelize ORM
const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    dialect: "postgres",
  }
);

export default sequelize;
