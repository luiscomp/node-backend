import { Request, Response } from 'express';
import UsuarioService from '../service/UsuarioService';

class UsuarioRoutes {

    constructor() {}

    listar(req: Request, res: Response) {
        return UsuarioService.listar(req.body, parseInt(req.params.pagina), res);
    }

    recuperar(req: Request, res: Response) {
        return UsuarioService.recuperar(parseInt(req.params.id), res);
    }

    novo(req: Request, res: Response) {
        return UsuarioService.novo(req.body, res);
    }

    atualizar(req: Request, res: Response) {
        return UsuarioService.atualizar(req.body, res);
    }

    deletar(req: Request, res: Response) {
        return UsuarioService.deletar(parseInt(req.params.id), res);
    }
}

export default new UsuarioRoutes();