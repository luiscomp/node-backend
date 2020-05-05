import * as passport from 'passport';
import { Request } from 'express'
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import UsuarioPersistence from '../../modules/persistence/UsuarioPersistence';
const config = require('../../config/config')();


class Auth {
    
    config(): any {
        const opts = {
            secretOrKey: config.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true
        }
    
        passport.use(new Strategy(opts, (req: Request, jwtPayload: any, done: VerifiedCallback) => {
            const usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(req.connection)

            usuarioPersistence.recuperar(jwtPayload.id).then(usuario => {
                if(usuario) {
                    return done(null, {
                        id: usuario.id,
                        cpfCnpj: usuario.cpfCnpj,
                        empresa: usuario.empresa
                    });
                }
                return done(null, false);
            });
        }));

        return {
            initialize: (): any => passport.initialize(),
            authenticate: (): any => passport.authenticate('jwt', { session: false })
        }
    }
}

export default new Auth();