import * as HTTPStatus from 'http-status';
import { Response } from 'express';
import * as _ from 'lodash';
import EmpresaPersistence from '../persistence/EmpresaPersistence';
import CodigosResposta from '../../utils/requests/CodigosResposta';
import ObjetoResultado from '../../utils/requests/ObjetoResultado';
import ResponseHandlers from '../../core/handlers/ResponseHandlers';
import Empresa from '../model/Empresa';
import Usuario from '../model/Usuario';

class EmpresaService {
    
    private usuario: Usuario;

    constructor(usuario: Usuario) {
        this.usuario = usuario;
    }

    async listar(conexao: any, empresa: Empresa, pagina: number, res: Response) {
        let empresaPersistence: EmpresaPersistence = new EmpresaPersistence(conexao);
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.lista = await empresaPersistence.listar(empresa, pagina);
            resultado.quantidade = await empresaPersistence.quantidade(empresa);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Lista recuperada com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            _.partial(ResponseHandlers.onError, res, 'Erro ao listar Empresas')(error, this.usuario);
        }
    }

    async recuperar(conexao: any, id: number, res: Response) {
        let empresaPersistence: EmpresaPersistence = new EmpresaPersistence(conexao);
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await empresaPersistence.recuperar(id);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Empresa recuperada com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            _.partial(ResponseHandlers.onError, res, 'Erro ao recuperar Empresa')(error, this.usuario);
        }
    }

    async novo(conexao: any, empresa: Empresa, res: Response) {
        let empresaPersistence: EmpresaPersistence = new EmpresaPersistence(conexao);
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await empresaPersistence.novo(empresa);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Empresa gravada com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            _.partial(ResponseHandlers.onError, res, 'Erro ao criar nova Empresa')(error, this.usuario);
        }
    }

    async atualizar(conexao: any, empresa: Empresa, res: Response) {
        let empresaPersistence: EmpresaPersistence = new EmpresaPersistence(conexao);
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await empresaPersistence.atualizar(empresa);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Empresa atualizada com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            _.partial(ResponseHandlers.onError, res, 'Erro ao atualizar Empresa')(error, this.usuario);
        }
    }

    async inativar(conexao: any, id: number, res: Response) {
        let empresaPersistence: EmpresaPersistence = new EmpresaPersistence(conexao);
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await empresaPersistence.inativar(id);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Empresa inativada com sucesso';

            res.status(HTTPStatus.OK).json(resultado);
        } catch(error) {
            _.partial(ResponseHandlers.onError, res, 'Erro ao inativar Empresa')(error, this.usuario);
        }
    }
}

export default EmpresaService;