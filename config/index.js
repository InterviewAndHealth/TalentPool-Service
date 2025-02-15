const dotEnv = require("dotenv");
const { EVENT_TYPES, RPC_TYPES } = require("./types");

if (process.env.NODE_ENV !== "production") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT || 8000,
  APP_SECRET: process.env.APP_SECRET,

  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  DATABASE_URL:
    process.env.DATABASE_URL ||
    `postgresql://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}`,
  DATABASE_NAME: process.env.DATABASE_NAME || process.env.TALENTPOOL_SERVICE_DB,

  RABBITMQ_USERNAME: process.env.RABBITMQ_USERNAME,
  RABBITMQ_PASSWORD: process.env.RABBITMQ_PASSWORD,
  RABBITMQ_HOST: process.env.RABBITMQ_HOST,
  RABBITMQ_PORT: process.env.RABBITMQ_PORT,
  RABBITMQ_URL:
    process.env.RABBITMQ_URL ||
    `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,

  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  SERVICE_NAME: process.env.SERVICE_NAME || "TALENTPOOL_SERVICE",
  SERVICE_QUEUE: process.env.SERVICE_QUEUE || process.env.TALENTPOOL_QUEUE,
  RPC_QUEUE: process.env.RPC_QUEUE || process.env.TALENTPOOL_RPC,

  INTERVIEW_QUEUE: process.env.INTERVIEW_QUEUE,
  INTERVIEW_RPC: process.env.INTERVIEW_RPC,

  PAYMENT_QUEUE: process.env.PAYMENT_QUEUE,
  PAYMENT_RPC: process.env.PAYMENT_RPC,
  EVENT_TYPES,
  RPC_TYPES,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

  AWS_ACCESS_KEY_ID:
    process.env.AWS_ACCESS_KEY_ID || process.env.USER_SERVICE_AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY:
    process.env.AWS_SECRET_ACCESS_KEY ||
    process.env.USER_SERVICE_AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION || process.env.USER_SERVICE_AWS_REGION,
  AWS_S3_BUCKET_NAME:
    process.env.AWS_S3_BUCKET_NAME ||
    process.env.USER_SERVICE_AWS_S3_BUCKET_NAME,
};
