import * as HTTPStatus from 'http-status';
import { Response } from 'express';
import { getLogger, Logger } from 'log4js';
import Usuario from '../model/Usuario';
import AuthPersistence from '../persistence/AuthPersistence';
import CodigosResposta from '../utils/CodigosResposta';
import * as jwt from 'jsonwebtoken';
import ObjetoResultado from '../model/ObjetoResultado';
const config = require('../config/config')();

class AuthService {
    
    private authService: AuthPersistence;
    private logger: Logger;

    constructor() {
        this.authService = new AuthPersistence();
        this.logger = getLogger("logger");
    }
    
    async autenticar(usuario: Usuario, res: Response) {
        let resultado: ObjetoResultado = new ObjetoResultado();
        try {
            resultado.item = await this.authService.autenticar(usuario);
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO];
            resultado.mensagem = 'Autenticado com sucesso';

            if(resultado.item) {
                resultado.token = jwt.sign({ id: resultado.item.id }, config.secret, { expiresIn: '30m' });

                res.status(HTTPStatus.OK).json(resultado);
            } else {
                res.sendStatus(HTTPStatus.UNAUTHORIZED)
            }
        } catch(error) {
            this.logger.error(error);

            resultado.status = CodigosResposta[CodigosResposta.FALHA];
            resultado.mensagem = error;

            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(resultado);
        }
        
    }

}

export default AuthService;