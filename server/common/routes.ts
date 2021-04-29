import { IrouterConfig } from 'common-clases';
import { config } from './env';
import { HealthRouter } from '../api/routers';

const health = new HealthRouter();

export const ROUTER: IrouterConfig[] = [
  {
    handler: health.router,
    middleware: [],
    path: config.SERVICES_PATH.HEALTH,
  },
];
