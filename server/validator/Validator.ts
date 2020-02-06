var Ajv = require('ajv');
var ajv = new Ajv({allErrors: true, jsonPointers: true});
require('ajv-errors')(ajv /*, {singleError: true} */);
import * as HTTPStatus from 'http-status';
import ObjetoResultado from '../model/ObjetoResultado';
import CodigosResposta from '../utils/CodigosResposta';

export function validator(schema) {
    return function(req, res, next) {
        var validate = ajv.compile(schema)
        var isValid = validate(req.body);

        if(isValid) {
            next();
        } else {
            let resultado = new ObjetoResultado();
            resultado.status = CodigosResposta[CodigosResposta.SCHEMA_INVALIDO];
            resultado.mensagem = validate.errors.map(error => {
                return error.message;
            });

            res.status(HTTPStatus.BAD_REQUEST).json(resultado);
        }
    }
}