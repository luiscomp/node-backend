import { Request, Response } from 'express';
import UsuarioService from '../service/UsuarioService';
let usuarioServ: UsuarioService;

class UsuarioRoutes {

    constructor() {
        usuarioServ = new UsuarioService();
    }

    listar(req: Request, res: Response) {
        return usuarioServ.listar(req.body, parseInt(req.params.pagina), res);
    }

    recuperar(req: Request, res: Response) {
        return usuarioServ.recuperar(parseInt(req.params.id), res);
    }

    novo(req: Request, res: Response) {
        return usuarioServ.novo(req.body, res);
    }

    atualizar(req: Request, res: Response) {
        return usuarioServ.atualizar(req.body, res);
    }

    deletar(req: Request, res: Response) {
        return usuarioServ.deletar(parseInt(req.params.id), res);
    }
}

export default UsuarioRoutes;