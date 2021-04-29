import { errors, notFound, unauthorized } from '../api/middlewares';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as http from 'http';
import methodOverride from 'method-override';
import { ROUTER } from './routes';
import { config } from './env';
import winston from 'winston';
import expressWinston from 'express-winston';
import { httpFormat } from './logger';

export class Server {
  private readonly app: express.Application;
  private readonly server: http.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
  }

  public async Start(): Promise<http.Server> {
    this.ExpressConfiguration();
    this.ConfigurationRouter();
    return this.server;
  }

  public App(): express.Application {
    return this.app;
  }

  private ExpressConfiguration(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: config.REQUEST_LIMIT }));
    this.app.use(bodyParser.text({ limit: config.REQUEST_LIMIT }));
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: config.REQUEST_LIMIT,
      })
    );

    this.app.use(
      expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.splat(),
          winston.format.timestamp(),
          httpFormat
        ),
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: (_req, _res) => {
          return false;
        }, // optional: allows to skip some log messages based on request and/or response
        level: (req, res) => {
          let level = '';
          if (res.statusCode >= 100) {
            level = 'info';
          }
          if (res.statusCode >= 400) {
            level = 'warn';
          }
          if (res.statusCode >= 500) {
            level = 'error';
          }
          // Ops is worried about hacking attempts so make Unauthorized and Forbidden critical
          if (res.statusCode == 401 || res.statusCode == 403) {
            level = 'critical';
          }
          // No one should be using the old path, so always warn for those
          if (req.path === '/v0' && level === 'info') {
            level = 'warn';
          }
          return level;
        },
      })
    );
    this.app.use(methodOverride());
    this.app.use((_req, res, next): void => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
      next();
    });
    this.app.use(cors());
    this.app.use((err: any, _req: express.Request, _res: express.Response, next: express.NextFunction): void => {
      err.status = 404;
      next(err);
    });
  }

  private ConfigurationRouter(): void {
    for (const route of ROUTER) {
      this.app.use(route.path, route.middleware, route.handler);
    }
    this.app.use(
      expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.colorize(), winston.format.json())
      })
    );
    this.app.use(notFound);
    this.app.use(unauthorized);
    this.app.use(errors);
  }
}
