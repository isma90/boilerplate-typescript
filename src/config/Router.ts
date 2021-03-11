import { HealthRouter } from "../routers";
import {IrouterConfig} from "common-clases";

const HEALTH = new HealthRouter();

export const ROUTER: IrouterConfig[] = [{
    handler: HEALTH.router,
    middleware: [],
    path: "/healthz"
}];
