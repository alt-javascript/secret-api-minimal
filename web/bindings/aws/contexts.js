/* eslint-disable import/extensions */
import AWS from 'aws-sdk/lib/aws.js';
import Lambda from './Lambda.js';
import Secret from '../../../service/Secret.js';

export default [
  Lambda,
  Secret,
  { name: 'aws', scope: 'prototype', Reference: AWS },
];
