import * as HTTPStatus from 'http-status';
import { Response } from 'express';
import * as _ from 'lodash';
import UsuarioPersistence from '../persistence/UsuarioPersistence';
import CodigosResposta from '../utils/CodigosResposta';
import ObjetoResultado from '../model/ObjetoResultado';
import Usuario from '../model/Usuario';
import Handlers from '../api/responses/Handlers';

class UsuarioService {

    constructor() {}

    async listar(usuario: Usuario, pagina: number, res: Response) {
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.lista = await UsuarioPersistence.listar(usuario, pagina);
            resultado.quantidade = await UsuarioPersistence.quantidade(usuario, pagina);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Lista recuperada com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            _.partial(Handlers.onError, res, 'Erro ao listar Usuários')(error);
        }
    }

    async recuperar(id: number, res: Response) {
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await UsuarioPersistence.recuperar(id);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Usuário recuperado com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            _.partial(Handlers.onError, res, 'Erro ao recuperar Usuário')(error);
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
            _.partial(Handlers.onError, res, 'Erro ao criar novo Usuário')(error);
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
            _.partial(Handlers.onError, res, 'Erro ao atualizar Usuário')(error);
        }
    }

    async deletar(id: number, res: Response) {
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await UsuarioPersistence.deletar(id);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Usuário deletado com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            _.partial(Handlers.onError, res, 'Erro ao deletar Usuário')(error);
        }
    }
}

export default new UsuarioService();