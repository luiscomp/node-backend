import { Request, Response } from 'express';
import UsuarioService from '../services/UsuarioService';
import Usuario from '../model/Usuario';

class UsuarioRoutes {

    constructor() {}

    listar(req: Request, res: Response) {
        return new UsuarioService(req.user as Usuario).listar(req.connection, req.body, parseInt(req.params.pagina), res);
    }

    recuperar(req: Request, res: Response) {
        return new UsuarioService(req.user as Usuario).recuperar(req.connection, parseInt(req.params.id), res);
    }

    novo(req: Request, res: Response) {
        return new UsuarioService(req.user as Usuario).novo(req.connection, req.body, res);
    }

    atualizar(req: Request, res: Response) {
        return new UsuarioService(req.user as Usuario).atualizar(req.connection, req.body, res);
    }

    inativar(req: Request, res: Response) {
        return new UsuarioService(req.user as Usuario).inativar(req.connection, parseInt(req.params.id), res);
    }
}

export default new UsuarioRoutes();