/* eslint-disable import/extensions */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { LoggerFactory } from '@alt-javascript/logger';
import Secret from '../service/Secret.js';

const logger = LoggerFactory.getLogger('@alt-javascript/secret-api-minimal/test/RandomNumber_spec');
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

describe('Secret Specification', () => {
  it('Matches a guessed secret', () => {
    const secret = new Secret({
      secret: 'value',
      logger: LoggerFactory.getLogger(Secret.qualifier),
    });

    const result = secret.guess('value');
    const result2 = secret.guess('sdfsdfsdf');

    assert.isTrue(result, 'guess result is true');
    assert.isFalse(result2, 'guess result2 is false');
  });
});
