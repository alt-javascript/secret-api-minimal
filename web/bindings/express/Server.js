export default class Server {

    static qualifier = '@alt-javascript/secret-api-minimal/web/bindings/express/Server';

    constructor( options ) {
        this.logger = options?.logger || null;
        this.port = options?.port || '${server.port:8080}';
        this.context = options?.context || '${server.context:null}';
        this.app = options?.app || null;
        this.server = options?.server ||  'autowired';
        this.router = options?.router ||  'autowired';
        this.secret = options?.secret ||  'autowired';
    };

    init () {
        this.logger?.verbose('Initialising server started.')
        this.app.use(this.context,this.router);
        this.router.use((req, res, next) => {
            this.logger?.info('middleware /*:', JSON.stringify(req.body));
            res.append('Access-Control-Allow-Origin', ['*']);
            res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.append("Content-Type", "application/json");
            next();
        });

        this.router.options('/*',
            (req, res) => {
                this.logger?.verbose('OPTIONS /*:', JSON.stringify(req.body));
                res.send(200);
            })

        this.router.get('/guess/:secret', (req, res) => {
            this.logger?.verbose('GET /guess/:secret');
            res.json(this.secret.guess(req.params['secret']));
        });
        this.logger?.verbose('Initialising server completed.')
    }

    async run (){
        this.server = this.app.listen(this.port, () => {
            this.logger?.info(`Express.js server for random api listening at http://127.0.0.1:${this.port}`);
        })
    }

    destroy (self) {
        self.logger.info('Destroying server.')
        self.server.close();
    }

}
