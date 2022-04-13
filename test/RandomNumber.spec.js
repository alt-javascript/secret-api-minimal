/* eslint-disable import/extensions */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { LoggerFactory } from '@alt-javascript/logger';
import RandomNumber from '../service/RandomNumber.js';

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

describe('RandomNumber Specification', () => {
  it('Generates a random number between 1 and zero', () => {
    const randomNumber = new RandomNumber({
      maximum: 1,
      logger: LoggerFactory.getLogger(RandomNumber.qualifier),
    });

    const random = randomNumber.get();

    assert.isAtLeast(random, 0, 'Random Number is at least 0');
    assert.isAtMost(random, 1, 'Random Number is at most 1');
  });
});
