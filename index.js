/* eslint-disable import/extensions */
import { Application, config } from '@alt-javascript/boot';
import contexts from './web/bindings/aws/contexts.js';

// eslint-disable-next-line import/prefer-default-export
export async function handler(event, context) {
  try {
    const applicationContext = await Application.run({ config, contexts });
    const lambda = applicationContext.get('lambda');
    const result = lambda.handler(event, context);
    return result;
  } catch (err) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(err),
    };
    return response;
  }
}
