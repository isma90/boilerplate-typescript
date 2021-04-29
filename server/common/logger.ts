import winston from 'winston';
import { env } from 'process';
import { CommonUtils } from '../api/utils/common.utils';

const myFormat = winston.format.printf(({ level, message, timestamp}) => {
  return `${ timestamp } [${ env.NODE_ENV }] [${ level }]: ${ CommonUtils.isJson(message) ? JSON.stringify(message) : message }`;
});

export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.prettyPrint(),
    myFormat
  ),
  transports: [new winston.transports.Console()],
});

export const httpFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  return `${ timestamp } [${ level }] : ${ CommonUtils.isJson(message) ? JSON.stringify(message) : message } ${ CommonUtils.isJson(metadata) ? JSON.stringify(metadata) : metadata } `;
});
