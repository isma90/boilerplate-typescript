import * as express from "express";
import { HealthRouter } from "../routers";

interface IROUTER {
    path: string;
    middleware: any[];
    handler: express.Router;
}

const HEALTH = new HealthRouter();

export const ROUTER: IROUTER[] = [{
    handler: HEALTH.router,
    middleware: [],
    path: "/healthz"
}];
