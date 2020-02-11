import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import UsuarioPersistence from '../persistence/UsuarioPersistence';
const config = require('../config/config')();


class Auth {
    
    config() {
        let opts = {
            secretOrKey: config.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        }
    
        passport.use(new Strategy(opts, (jwtPayload, done) => {
            UsuarioPersistence.recuperar(jwtPayload.id).then(usuario => {
                if(usuario) {
                    return done(null, {
                        id: usuario.id,
                        email: usuario.email
                    });
                }
                return done(null, false);
            });
        }));

        return {
            initialize: () => passport.initialize(),
            authenticate: () => passport.authenticate('jwt', { session: false })
        }
    }
}

export default new Auth();