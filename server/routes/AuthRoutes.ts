import { Request, Response } from 'express';
import AuthService from '../service/AuthService';
let authServ: AuthService;


class AuthRoutes {

    constructor() {
        authServ = new AuthService();
    }

    auth(req: Request, res: Response) {
        return authServ.autenticar(req.body, res);
    }
}

export default AuthRoutes;