/* eslint-disable import/extensions */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import request from 'supertest';

import express from 'express';

import { LoggerFactory } from '@alt-javascript/logger';
import RandomNumber from '../service/RandomNumber.js';
import Server from '../web/bindings/express/Server.js';

const logger = LoggerFactory.getLogger('@alt-javascript/secret-api-minimal/test/Server_spec');
const { assert } = chai;
chai.use(chaiAsPromised);

before(async () => {
  logger.verbose('before spec setup started');

  logger.verbose('before spec setup completed');
});

beforeEach(async () => {
  logger.verbose('before each setup started');
  // ..
  logger.verbose('before each setup completed');
});

after(async () => {
  logger.verbose('after teardown started');
  // ...
  logger.verbose('after teardown completed');
});

beforeEach(async () => {
  logger.verbose('before each setup started');
  // ..
  logger.verbose('before each setup completed');
});

describe('Server Specification', () => {
  it('Generates a random number between 1 and zero', (done) => {
    const server = new Server(
      {
        logger: LoggerFactory.getLogger(Server.qualifier),
        app: express(),
        router: express.Router(),
        context: '/',
        randomNumber: new RandomNumber({
          maximum: 1,
          logger: LoggerFactory.getLogger(RandomNumber.qualifier),
        }),
      },
    );
    server.init();

    request(server.app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const code = res.statusCode;
        const random = res.body;
        assert.equal(code, 200, 'GET response code is 200');
        assert.isAtLeast(random, 0, 'Random Number is at least 0');
        assert.isAtMost(random, 1, 'Random Number is at most 1');
        return done();
      })
      .catch((err) => done(err));
  });
});
