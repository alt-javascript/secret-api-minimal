/* eslint-disable import/extensions */
import express from 'express';
import Server from './Server.js';
import Secret from '../../../service/Secret.js';

export default [
  Server,
  Secret,
  { name: 'app', scope: 'prototype', factory: express },
  { name: 'router', scope: 'prototype', factory: express.Router },
];
