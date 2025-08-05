import express from "express";
import dotenv from "dotenv";
import sequelize from "./db/db";
import logger from "./common/logger";
import chalk from "chalk";
import productRouter from "./routs/productRoute";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/products", productRouter);

(async () => {
  await sequelize.authenticate();
})();

app.listen(port, () => {
  logger.info(chalk.bgCyanBright(`Server running on port: ${port}`));
});
