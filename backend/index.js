// express app related
import express from "express";
const app = express();
// cors related
import cors from "cors";
// for connection to db
import sequelize from "./config/db.js";
// for routing
import product from "./routes/products.js";

// middlewares
app.use(cors());
app.use(express.json());

// test sequalize connetion to db
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// ROUTES \\
// using ./routes/products.js any time we encounter /inventories path
app.use("/inventories", product);

// for remote host or local one
const PORT = process.env.PORT || 4000;
app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}...`);
});
