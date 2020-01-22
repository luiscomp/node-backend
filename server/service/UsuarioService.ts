import * as HTTPStatus from 'http-status';
import { Request, Response } from 'express';
import UsuarioPersistence from '../persistence/UsuarioPersistence';
import CodigosResposta from '../utils/CodigosResposta';
import ObjetoResultado from '../model/ObjetoResultado';
import Usuario from '../model/Usuario';

class UsuarioService {

    private usuarioPersistence: UsuarioPersistence;

    constructor() {
        this.usuarioPersistence = new UsuarioPersistence();
    }

    async listar(usuario: Usuario, pagina: Number, res: Response) {
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.lista = await this.usuarioPersistence.listar(usuario, pagina);
            resultado.quantidade = await this.usuarioPersistence.quantidade(usuario, pagina);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Lista recuperada com sucesso'

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            resultado.status = CodigosResposta[CodigosResposta.FALHA];
            resultado.mensagem = error;

            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(resultado);
        }
    }

    recuperar(req: Request, res: Response) {
        res.status(HTTPStatus.OK).json({
            message: 'OK'
        });
    }

    novo(req: Request, res: Response) {
        res.status(HTTPStatus.OK).json({
            message: 'OK'
        });
    }

    atualizar(req: Request, res: Response) {
        res.status(HTTPStatus.OK).json({
            message: 'OK'
        });
    }

    deletar(req: Request, res: Response) {
        res.status(HTTPStatus.OK).json({
            message: 'OK'
        });
    }
}

export default UsuarioService;