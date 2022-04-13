export default class Secret {
    static qualifier = '@alt-javascript/secret-api-minimal/Secret';

    constructor(options) {
        this.logger = options?.logger || null;
        this.secret = options?.secret || options || '${secret}';
    };

    guess (secret){
        this.logger?.verbose(`Guessing the secret`);
        let result = false
        if (this.secret === secret){
            result = true
        }
        this.logger?.verbose(`Guess was: ${result}`);
        return result;
    }
}