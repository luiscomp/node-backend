import { Application } from 'express';
import UsuarioRoutes from '../../modules/routes/UsuarioRoutes';
import { validador } from '../../validator/Validador';
import AuthSchema from '../../validator/schemas/AuthSchema';
import UsuarioSchema from '../../validator/schemas/UsuarioSchema';
import AuthRoutes from '../../modules/routes/AuthRoutes';

class Routes {

    public initRoutes(app: Application, auth: any) {
        this.initAuthRoutes(app);
        this.initUserRoutes(app, auth);
    }
    
    private initAuthRoutes(app: Application): void {
        app.route('/api/v1/auth/token').post(validador(AuthSchema.usuario), AuthRoutes.auth);
    }

    private initUserRoutes(app: Application, auth: any): void {
        app.route('/api/v1/usuario/listar/:pagina*?').all(auth.config().authenticate()).post(UsuarioRoutes.listar);
        app.route('/api/v1/usuario/novo').all(auth.config().authenticate()).post(validador(UsuarioSchema.gravar), UsuarioRoutes.novo);
        app.route('/api/v1/usuario/atualizar').all(auth.config().authenticate()).post(validador(UsuarioSchema.atualizar), UsuarioRoutes.atualizar);
        app.route('/api/v1/usuario/:id').all(auth.config().authenticate()).get(UsuarioRoutes.recuperar);
        app.route('/api/v1/usuario/:id/inativar').all(auth.config().authenticate()).post(UsuarioRoutes.inativar);
    }
}

export default new Routes();