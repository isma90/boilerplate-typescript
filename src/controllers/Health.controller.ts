import { HealthService } from "../services";
import { Request, Response } from "express";
import {Controller} from "common-clases";

export class HealthController extends Controller {

    private healthService: HealthService;

    constructor(req: Request, res: Response) {
        super(req, res);
        this.healthService = new HealthService();
    }

    public check() {
        return this.response({ payload: this.healthService.check() });
    }
}
