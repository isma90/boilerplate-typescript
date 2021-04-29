import { Controller } from 'common-clases';
import { Request, Response } from 'express';
import { HealthService } from '../services';

export class HealthController extends Controller {

  private healthService: HealthService;

  constructor(req: Request, res: Response) {
    super(req, res);
    this.healthService = new HealthService();
  }

  public check() {
    this.res.status(200).json(this.healthService.check()).send();
  }

}
