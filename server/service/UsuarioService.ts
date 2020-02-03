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
            resultado.mensagem = 'Lista recuperada com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            resultado.status = CodigosResposta[CodigosResposta.FALHA];
            resultado.mensagem = error;

            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(resultado);
        }
    }

    async recuperar(id: Number, res: Response) {
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await this.usuarioPersistence.recuperar(id);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Usuário recuperado com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            resultado.status = CodigosResposta[CodigosResposta.FALHA];
            resultado.mensagem = error;

            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(resultado);
        }
    }

    async novo(usuario: Usuario, res: Response) {
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await this.usuarioPersistence.novo(usuario);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Usuário gravado com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            resultado.status = CodigosResposta[CodigosResposta.FALHA];
            resultado.mensagem = error;

            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(resultado);
        }
    }

    async atualizar(usuario: Usuario, res: Response) {
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await this.usuarioPersistence.atualizar(usuario);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Usuário atualizado com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            resultado.status = CodigosResposta[CodigosResposta.FALHA];
            resultado.mensagem = error;

            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(resultado);
        }
    }

    async deletar(id: Number, res: Response) {
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await this.usuarioPersistence.deletar(id);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Usuário deletado com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            resultado.status = CodigosResposta[CodigosResposta.FALHA];
            resultado.mensagem = error;

            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(resultado);
        }
    }
}

export default UsuarioService;