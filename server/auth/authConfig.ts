import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import UsuarioPersistence from '../persistence/UsuarioPersistence';
const config = require('../config/config')();


export default function AuthConfig() {
    const usuarioPers: UsuarioPersistence = new UsuarioPersistence();
    let opts = {
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    passport.use(new Strategy(opts, (jwtPayload, done) => {
        usuarioPers.recuperar(jwtPayload.id).then(usuario => {
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
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate('jwt', { session: false });
        }
    }
}