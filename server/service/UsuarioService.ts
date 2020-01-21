import * as HTTPStatus from 'http-status';
import { Request, Response } from 'express';
import UsuarioPersistence from '../persistence/UsuarioPersistence';
import { IUsuario } from '../model/Usuario';
import { IObjetoResultado } from '../model/ObjetoResultado';

class UsuarioService {

    private usuarioPersistence: UsuarioPersistence;

    constructor() {
        this.usuarioPersistence = new UsuarioPersistence();
    }

    listar(usuario: IUsuario, pagina: Number, res: Response) {
        let resultado: IObjetoResultado;

        this.usuarioPersistence.listar(usuario, pagina).then(lista => {
            resultado = {
                status: 'SUCESSO',
                mensagem: 'Lista recuperada com sucesso',
                lista: lista,
                quantidade: lista.length
            }

            res.status(HTTPStatus.OK).json(resultado);
        }).catch(err => {
            resultado = {
                status: 'FALHA',
                mensagem: 'Falha ao listar usuários',
            }

            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(resultado);
        })
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