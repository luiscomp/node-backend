var Ajv = require('ajv');
var ajv = new Ajv({allErrors: true, jsonPointers: true});
require('ajv-errors')(ajv /*, {singleError: true} */);
import * as HTTPStatus from 'http-status';
import ObjetoResultado from '../model/ObjetoResultado';
import CodigosResposta from '../utils/CodigosResposta';
import { Request, Response, NextFunction } from 'express';

export function validador(schema: any) {
    return function(req: Request, res: Response, next: NextFunction) {
        var validate = ajv.compile(schema)
        var isValid = validate(req.body);

        if(isValid) {
            next();
        } else {
            let resultado = new ObjetoResultado();
            resultado.status = CodigosResposta[CodigosResposta.SCHEMA_INVALIDO];
            resultado.mensagem = 'Dados enviados não correspondem com as regras de validação.'
            resultado.erros = validate.errors.map((error: any) => error.message);

            res.status(HTTPStatus.BAD_REQUEST).json(resultado);
        }
    }
}