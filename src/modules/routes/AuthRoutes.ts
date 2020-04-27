import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
let authServ: AuthService;


class AuthRoutes {

    constructor() {
        authServ = new AuthService();
    }

    auth(req: Request, res: Response) {
        return authServ.autenticar(req.connection, req.body, res);
    }
}

export default new AuthRoutes();