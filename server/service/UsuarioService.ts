import * as HTTPStatus from 'http-status';
import { Response } from 'express';
import * as _ from 'lodash';
import { getLogger, Logger } from 'log4js';
import UsuarioPersistence from '../persistence/UsuarioPersistence';
import CodigosResposta from '../utils/CodigosResposta';
import ObjetoResultado from '../model/ObjetoResultado';
import Usuario from '../model/Usuario';
import { onError } from '../api/responses/errorHandler'

class UsuarioService {

    private logger: Logger;

    constructor() {
        this.logger = getLogger("logger");
    }

    async listar(usuario: Usuario, pagina: Number, res: Response) {
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.lista = await UsuarioPersistence.listar(usuario, pagina);
            resultado.quantidade = await UsuarioPersistence.quantidade(usuario, pagina);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Lista recuperada com sucesso';

            res.status(HTTPStatus.OK).json(resultado);

            
        } catch(error) {
            _.partial(onError, res, 'Erro ao listar Usuários', error)
            // this.logger.error(error);

            // resultado.status = CodigosResposta[CodigosResposta.FALHA];
            // resultado.mensagem = error;

            // res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(resultado);
        }
    }

    async recuperar(id: Number, res: Response) {
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await UsuarioPersistence.recuperar(id);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Usuário recuperado com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            this.logger.error(error);

            resultado.status = CodigosResposta[CodigosResposta.FALHA];
            resultado.mensagem = error;

            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(resultado);
        }
    }

    async novo(usuario: Usuario, res: Response) {
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await UsuarioPersistence.novo(usuario);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Usuário gravado com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            this.logger.error(error);

            resultado.status = CodigosResposta[CodigosResposta.FALHA];
            resultado.mensagem = error;

            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(resultado);
        }
    }

    async atualizar(usuario: Usuario, res: Response) {
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await UsuarioPersistence.atualizar(usuario);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Usuário atualizado com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            this.logger.error(error);

            resultado.status = CodigosResposta[CodigosResposta.FALHA];
            resultado.mensagem = error;

            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(resultado);
        }
    }

    async deletar(id: Number, res: Response) {
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await UsuarioPersistence.deletar(id);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Usuário deletado com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            this.logger.error(error);

            resultado.status = CodigosResposta[CodigosResposta.FALHA];
            resultado.mensagem = error;

            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(resultado);
        }
    }
}

export default new UsuarioService();