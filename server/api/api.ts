import * as express from 'express';
import { Application } from 'express';
import { errorHandlerApi } from './errorHandlerApi';
import { corsConfig } from './corsConfig';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes';
import { configure, connectLogger, getLogger } from 'log4js';

class Api {
    public express: Application;

    constructor() {
        this.express = express();
        this.configurarLogger();
        this.middleware();
    }
    
    configurarLogger() {
        configure({
            appenders: { logger: { type: "file", filename: "logger.log" } },
            categories: { default: { appenders: ["logger"], level: "error" } }
        });
    }

    middleware(): void {
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded( { extended: true} ));
        this.express.use(bodyParser.json());
        this.express.use(errorHandlerApi);
        this.express.use(corsConfig);
        this.express.use(connectLogger(getLogger("logger"), { level: "auto" }));
        
        this.router(this.express);
    }

    private router(app: Application): void {
        new Routes(app);
    }
}

export default new Api().express;