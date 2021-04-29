import supertest from 'supertest';
import { expect } from 'chai';
import { config, Server } from '../server/common';
import * as express from 'express';


const basePath = config.SERVICES_PATH.HEALTH;
const server: Server = new Server();
let app: express.Application;

describe('Health controller', () => {
  before((done) => {
    server.Start().then(() => {
      app = server.App();
      done();
    })
  });

  it('should health check', function (done) {
    supertest(app).get(basePath).end((_err: Error, res: supertest.Response) => {
      expect(res.status).to.be.eq(200);
      done();
    });
  });

  it("Random Url gives 404", (done) => {
    supertest(app).get("/random-url")
      .end((_err: Error, res: supertest.Response) => {
        expect(res.status).to.be.a("number");
        expect(res.status).to.eq(404);
        done();
      });
  });
});
