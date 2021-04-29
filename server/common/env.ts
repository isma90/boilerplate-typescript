import { env } from 'process';

const common = {
  REQUEST_LIMIT: '50mb',
  SERVICES_PATH: {
    HEALTH: '/service/v1/health'
  }
};

const LOCAL_CONFIGURATION = {
  ...common,
  SECRET: '12345',
  PORT_APP: 8085,
  REDIS_CONNECTION: {
    auth_pass: "",
    host: "127.0.0.1",
  },
};

const PRODUCTION_CONFIGURATION = {
  ...common,
  SECRET: env.SECRET,
  PORT_APP: 8080,
  REDIS_CONNECTION: {
    auth_pass: "",
    host: env.ENDPOINT_REDIS,
  },
};

export const isProd = env.NODE_ENV === 'PRODUCTION';
export const config = isProd ? PRODUCTION_CONFIGURATION : LOCAL_CONFIGURATION;
