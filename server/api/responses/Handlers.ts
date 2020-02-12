import { Request, Response, ErrorRequestHandler, NextFunction } from 'express'
import * as HTTPStatus from 'http-status';
import ObjetoResultado from '../../model/ObjetoResultado';
import CodigosResposta from '../../utils/CodigosResposta';
import { getLogger } from 'log4js';


class Handlers {

    onError(res: Response, message: string, error: any) {
        getLogger("logger").error(error);
        
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

export default new Handlers();