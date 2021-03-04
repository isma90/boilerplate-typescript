import { env } from "process";
import * as log4js from "log4js";

const HEADERS = {
  "Content-Type": "application/json",
};

const COMMON = {
  HEADERS,
};

const LOCAL_CONFIGURATION = {
  ...COMMON,
  SECRET: "12345",
  PORT_APP: 8085,
};

const PRODUCTION_CONFIGURATION = {
  ...COMMON,
  SECRET: env.SECRET,
  PORT_APP: 8080,
};
const LOG_CONFIG = {
  appenders: { 'out': { type: 'stdout', layout: { type: 'coloured' } } },
  categories: { default: { appenders: ['out'], level: env.LOG_LEVEL } }
};

log4js.configure(LOG_CONFIG);
export const logger: log4js.Logger = log4js.getLogger();

export const isProd = env.NODE_ENV === "PRODUCTION";
export const config = isProd ? PRODUCTION_CONFIGURATION : LOCAL_CONFIGURATION;
