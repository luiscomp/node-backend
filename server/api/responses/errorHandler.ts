import { Response } from 'express';
import * as HTTPStatus from 'http-status';
import ObjetoResultado from '../../model/ObjetoResultado';
import CodigosResposta from '../../utils/CodigosResposta';

export function onError(res: Response, message: string, error: any) {
    let resultado: ObjetoResultado = new ObjetoResultado();

    resultado.status = CodigosResposta[CodigosResposta.FALHA];
    resultado.mensagem = message;
    resultado.erros.push(error);

    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(resultado);
}