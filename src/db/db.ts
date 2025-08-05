import { Sequelize } from "sequelize";
import config from "../config/config";
import logger from "../common/logger";
import chalk from "chalk";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect as "postgres",
    logging: (msg) => logger.info(`[SEQUELIZE] ${chalk.bgCyan(msg)}`),
  },
);

export default sequelize;
