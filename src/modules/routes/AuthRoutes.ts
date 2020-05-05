import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthRoutes {

    auth(req: Request, res: Response): any {
        return  new AuthService().autenticar(req.connection, req.body, res);
    }
}

export default new AuthRoutes();