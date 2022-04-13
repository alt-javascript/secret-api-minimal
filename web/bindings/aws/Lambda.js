export default class Lambda {

    static qualifier = '@alt-javascript/secret-api-minimal/web/bindings/aws/Lambda';

    constructor( options ) {
        this.logger = null;
        this.aws = options?.aws || 'autowired';
        this.region = options?.region || '${aws.region}';
        this.context = options?.context || '${server.context}';
        this.secret = options?.secret || 'autowired';
    }

    init(){
        this.logger?.verbose('Initialising lambda started.')
        this.aws.config.update({region: 'ap-southeast-2'});
        this.logger?.verbose('Initialising lambda completed.')
    }

    handler(event, context) {
        this.logger?.verbose(`Event handler started`);
        let body = ''
        let statusCode = 400;

        const headers = {
            'Content-Type': 'application/json',
           'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        };

        try {
            switch (event.routeKey) {

                case `OPTIONS ${this.context}`:
                    this.logger?.info(`OPTIONS ${this.context}`, event.body);
                    statusCode = 200;
                    break;

                case `GET ${this.context}guess/{secret}`:
                    this.logger?.info(`GET ${this.context}guess/{secret}`, event.body);
                    // JSON.parse(event.body);

                    let result = this.secret.guess(event.pathParameters.secret);

                    body = JSON.stringify(result);
                    statusCode = 200;
                    break;

                default:
                    statusCode = 400;
                    this.logger?.error(`Unsupported route: "${event.routeKey}"`);
                    throw new Error(`Unsupported route: "${event.routeKey}"`);
            }
        } catch (err) {
            body = JSON.stringify([err.message,event]);
            this.logger?.error(`Unexpected error: "${body}"`);
        } finally {
            //body = body ;
        }

        this.logger?.verbose(`Event handler completed`);

        return {
            statusCode,
            body,
            headers
        };
    }
}