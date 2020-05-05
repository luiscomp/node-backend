import { Request, Response } from 'express';
import EmpresaService from '../services/EmpresaService';
import Usuario from '../model/Usuario';

class EmpresaRoutes {

    listar(req: Request, res: Response): any {
        return new EmpresaService(req.user as Usuario).listar(req.connection, req.body, parseInt(req.params.pagina), res);
    }

    recuperar(req: Request, res: Response): any {
        return new EmpresaService(req.user as Usuario).recuperar(req.connection, parseInt(req.params.id), res);
    }

    novo(req: Request, res: Response): any {
        return new EmpresaService(req.user as Usuario).novo(req.connection, req.body, res);
    }

    atualizar(req: Request, res: Response): any {
        return new EmpresaService(req.user as Usuario).atualizar(req.connection, req.body, res);
    }

    inativar(req: Request, res: Response): any {
        return new EmpresaService(req.user as Usuario).inativar(req.connection, parseInt(req.params.id), res);
    }
}

export default new EmpresaRoutes();