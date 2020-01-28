import { Request, Response } from 'express';
import UsuarioService from '../service/UsuarioService';
let UsuarioServ;

class UsuarioRoutes {
    constructor() {
        UsuarioServ = new UsuarioService();
    }

    listar(req: Request, res: Response) {
        return UsuarioServ.listar(req.body, req.params.pagina, res)
    }

    recuperar(req: Request, res: Response) {
        return UsuarioServ.recuperar(req.params.id, res)
    }

    novo(req: Request, res: Response) {
        return UsuarioServ.novo(req.body, res)
    }

    atualizar(req: Request, res: Response) {
        return UsuarioServ.atualizar(req, res)
    }

    deletar(req: Request, res: Response) {
        return UsuarioServ.deletar(req, res)
    }
}

export default UsuarioRoutes;