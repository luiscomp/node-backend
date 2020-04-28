import * as HTTPStatus from 'http-status';
import { Response } from 'express';
import * as _ from 'lodash';
import UsuarioPersistence from '../persistence/UsuarioPersistence';
import CodigosResposta from '../../utils/requests/CodigosResposta';
import ObjetoResultado from '../../utils/requests/ObjetoResultado';
import Usuario from '../model/Usuario';
import ResponseHandlers from '../../core/handlers/ResponseHandlers';

class UsuarioService {
    
    private usuario: Usuario;

    constructor(usuario: Usuario) {
        this.usuario = usuario;
    }

    async listar(conexao: any, usuario: Usuario, pagina: number, res: Response) {
        let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.lista = await usuarioPersistence.listar(usuario, pagina);
            resultado.quantidade = await usuarioPersistence.quantidade(usuario);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Lista recuperada com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            _.partial(ResponseHandlers.onError, res, 'Erro ao listar Usuários')(error, this.usuario);
        }
    }

    async recuperar(conexao: any, id: number, res: Response) {
        let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await usuarioPersistence.recuperar(id);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Usuário recuperado com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            _.partial(ResponseHandlers.onError, res, 'Erro ao recuperar Usuário')(error, this.usuario);
        }
    }

    async novo(conexao: any, usuario: Usuario, res: Response) {
        let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await usuarioPersistence.novo(usuario);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Usuário gravado com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            console.log(error);
            

            _.partial(ResponseHandlers.onError, res, 'Erro ao criar novo Usuário')(error, this.usuario);
        }
    }

    async atualizar(conexao: any, usuario: Usuario, res: Response) {
        let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await usuarioPersistence.atualizar(usuario);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Usuário atualizado com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            _.partial(ResponseHandlers.onError, res, 'Erro ao atualizar Usuário')(error, this.usuario);
        }
    }

    async inativar(conexao: any, id: number, res: Response) {
        let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await usuarioPersistence.inativar(id);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Usuário inativado com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            _.partial(ResponseHandlers.onError, res, 'Erro ao inativar Usuário')(error, this.usuario);
        }
    }
}

export default UsuarioService;