/* eslint-disable import/extensions */
import { Application, config } from '@alt-javascript/boot';
import contexts from './web/bindings/express/contexts.js';

Application.run({ config, contexts });
