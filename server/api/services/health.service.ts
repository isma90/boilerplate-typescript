import { IStatus } from '../interfaces';

export class HealthService {
  public check(): IStatus {
    return {
      general: 'OK', services: [{
        name: 'Health',
        status: true,
      }]
    };
  }
}
