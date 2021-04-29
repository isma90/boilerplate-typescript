import { HealthController } from '../controllers';
import { Router } from 'common-clases';

export class HealthRouter extends Router {
  constructor() {
    super(HealthController);
    this.router.get('', this.handler(this.Controller.check));
  }
}