// var Ajv = require('ajv');
// var ajv = new Ajv({allErrors: true, jsonPointers: true});
// require('ajv-errors')(ajv /*, {singleError: true} */);
import * as Ajv from 'ajv'
import * as HTTPStatus from 'http-status';
import ObjetoResultado from '../utils/requests/ObjetoResultado';
import CodigosResposta from '../utils/requests/CodigosResposta';
import { Request, Response, NextFunction } from 'express';

var ajv = new Ajv({allErrors: true, jsonPointers: true})
require('ajv-errors')(ajv);

export function validador(schema : any) {
    
    ajv.addSchema(schema);
    if(schema.referencias) {
        schema.referencias.forEach(schema => ajv.addSchema(schema))
    }

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