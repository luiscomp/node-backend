import { Request, Response, ErrorRequestHandler, NextFunction } from 'express'
import * as HTTPStatus from 'http-status';
import ObjetoResultado from '../../utils/requests/ObjetoResultado';
import CodigosResposta from '../../utils/requests/CodigosResposta';
import { getLogger } from 'log4js';
import Usuario from '../../modules/model/Usuario';


class ResponseHandlers {

    onError(res: Response, message: string, error: any, usuario: Usuario) {
        getLogger("logger").error(`${usuario.nome} - ${usuario.empresa.nomeFantasia}: ${error}`);

        let resultado: ObjetoResultado = new ObjetoResultado();
        resultado.status = CodigosResposta[CodigosResposta.FALHA];
        resultado.mensagem = message;
    
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(resultado);
    } 

    errorHandlerApi(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
        getLogger("logger").error(`API error handler foi executado: ${err}`);

        res.status(500).json({
            errorCode: 'ERR-001',
            message: 'Erro Interno do Servidor'
        })
    }
}

export default new ResponseHandlers();