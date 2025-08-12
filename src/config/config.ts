import dotenv from "dotenv";
dotenv.config();

interface dbConfig {
  username: string;
  password: string;
  database: string;
  dialect: string;
  host: string;
  port: number;
}

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const config: dbConfig = {
  username: getEnvVar("DB_USER"),
  password: getEnvVar("DB_PASSWORD"),
  database: getEnvVar("DB_NAME"),
  port: parseInt(getEnvVar("DB_PORT")),
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
};

const exportConfig = {
  development: config,
};

export default exportConfig;
module.exports = exportConfig;
