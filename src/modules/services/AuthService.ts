import * as HTTPStatus from 'http-status'
import { Response } from 'express'
import { getLogger, Logger } from 'log4js'
import Usuario from '../model/Usuario'
import AuthPersistence from '../persistence/AuthPersistence'
import * as jwt from 'jsonwebtoken'
import ObjetoResultado from '../../utils/requests/ObjetoResultado'
import CodigosResposta from '../../utils/requests/CodigosResposta'
const config = require('../../config/config')()

class AuthService {
    private logger: Logger;

    constructor () {
        this.logger = getLogger('logger')
    }

    async autenticar (conexao: any, usuario: Usuario, res: Response): Promise<any> {
        const resultado: ObjetoResultado = new ObjetoResultado()
        const authPersistence: AuthPersistence = new AuthPersistence(conexao)
        try {
            resultado.item = await authPersistence.autenticar(usuario)
            resultado.status = CodigosResposta[CodigosResposta.SUCESSO]
            resultado.mensagem = 'Autenticado com sucesso'

            if (resultado.item) {
                resultado.token = jwt.sign({ id: resultado.item.id }, config.secret, { expiresIn: '30m' })
                res.status(HTTPStatus.OK).json(resultado)
            } else {
                res.sendStatus(HTTPStatus.UNAUTHORIZED)
            }
        } catch (error) {
            this.logger.error(error)

            resultado.status = CodigosResposta[CodigosResposta.FALHA]
            resultado.mensagem = error

            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(resultado)
        }
    }
}

export default AuthService
