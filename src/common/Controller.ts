import * as express from "express";
import { Iresponse } from "./inteface";

export abstract class Controller {

    protected req: express.Request;
    protected res: express.Response;

    constructor(req: express.Request, res: express.Response) {
        this.req = req;
        this.res = res;
    }

    protected response(body: Iresponse, code: number = 200): express.Response {
        const response = this.res.status(code).send({
            payload: { ...body.payload },
            status: { code, description: "", techCode: "", ...body.status },
        });
        return response;
    }

}
