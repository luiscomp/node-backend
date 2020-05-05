import * as Ajv from 'ajv'
import * as HTTPStatus from 'http-status';
import ObjetoResultado from '../utils/requests/ObjetoResultado';
import CodigosResposta from '../utils/requests/CodigosResposta';
import { Request, Response, NextFunction } from 'express';

const ajv = new Ajv({allErrors: true, jsonPointers: true})
require('ajv-errors')(ajv);

function adicionarReferencias(schema: any): void {
    schema.referencias.forEach((schema: any) => {
        if(!ajv.getSchema(schema.$id)) {
            ajv.addSchema(schema)
        }
        if(schema.referencias) {
            adicionarReferencias(schema)
        }
    })
    return;
}

export function validador(schema: any): any {
    
    if(!ajv.getSchema(schema.$id)) {
        ajv.addSchema(schema)
    }
    if(schema.referencias) {
        adicionarReferencias(schema)
    }

    return function(req: Request, res: Response, next: NextFunction): void {
        const validate = ajv.compile(schema)
        const isValid = validate(req.body);

        if(isValid) {
            next();
        } else {
            const resultado = new ObjetoResultado();
            resultado.status = CodigosResposta[CodigosResposta.SCHEMA_INVALIDO];
            resultado.mensagem = 'Dados enviados não correspondem com as regras de validação.'
            resultado.erros = validate.errors.map((error: any) => error.message);

            res.status(HTTPStatus.BAD_REQUEST).json(resultado);
        }
    }
}