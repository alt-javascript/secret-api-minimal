/* eslint-disable import/extensions */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { LoggerFactory } from '@alt-javascript/logger';
import { handler } from '../index.js';

const logger = LoggerFactory.getLogger('@alt-javascript/secret-api-minimal/test/Lambda_spec');
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

describe('Lambda Specification', () => {
  it('Matches a guessed secret', async () => {
    const result = await handler({ routeKey: 'GET /guess/{secret}', pathParameters: {secret:'ajdhasdhj'} }, null);
    const body = JSON.parse(result.body);
    assert.equal(result.statusCode, 200, 'GET response code is 200');
    assert.isFalse(body, 'result is false');
  });
});
