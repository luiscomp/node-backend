import * as express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from '../routes/Routes';
import { configure, connectLogger, getLogger } from 'log4js';
import Auth from '../auth/Auth';
import Handlers from '../handlers/ResponseHandlers';
import { connectionMySQL } from '../db/ConnectionMySQL';

class Api {
    public express: Application;

    constructor() {
        this.express = express();
        this.configurarLogger();
        this.configurarExpress();
        this.removeNullsResponse();
        this.router();
    }
    
    configurarLogger() {
        configure({
            appenders: { logger: { type: "file", filename: "logger.log" } },
            categories: { default: { appenders: ["logger"], level: "error" } }
        });
    }

    configurarExpress(): void {
        this.express.use(this.configHeaders.bind(this));
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded( { extended: true} ));
        this.express.use(bodyParser.json());
        this.express.use(connectionMySQL)
        this.express.use(Handlers.errorHandlerApi);
        this.express.use(connectLogger(getLogger("logger"), { level: "auto" }));
        this.express.use(Auth.config().initialize());
    }

    private configHeaders(req: Request, res: Response, next: NextFunction) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.setHeader('Content-Type', 'application/json; charset=UTF-8');
        res.setHeader('Accept', 'application/json; charset=UTF-8');
        next();
    }

    private removeNullsResponse() {
        this.express.set('json replacer', function (key: any, value: any) {
            if (value) {
                return value;
            }
        });
    }

    private router(): void {
        Routes.initRoutes(this.express, Auth);
    }
}

export default new Api().express;