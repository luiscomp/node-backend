import { Application } from 'express';
import UsuarioRoutes from '../../routes/UsuarioRoutes';
import { validador } from '../../validator/Validador';
import AuthSchema from '../../validator/schemas/AuthSchema';
import UsuarioSchema from '../../validator/schemas/UsuarioSchema';
import AuthRoutes from '../../routes/AuthRoutes';

class Routes {

    public initRoutes(app: Application, auth: any) {
        this.initAuthRoutes(app);
        this.initUserRoutes(app, auth);
    }
    
    private initAuthRoutes(app: Application): void {
        app.route('/api/auth/token').post(validador(AuthSchema.autenticar), AuthRoutes.auth);
    }

    private initUserRoutes(app: Application, auth: any): void {
        app.route('/api/usuario/listar/:pagina*?').all(auth.config().authenticate()).post(UsuarioRoutes.listar);
        app.route('/api/usuario/novo').all(auth.config().authenticate()).post(validador(UsuarioSchema.gravar), UsuarioRoutes.novo);
        app.route('/api/usuario/atualizar').all(auth.config().authenticate()).post(validador(UsuarioSchema.atualizar), UsuarioRoutes.atualizar);
        app.route('/api/usuario/:id').all(auth.config().authenticate()).get(UsuarioRoutes.recuperar);
        app.route('/api/usuario/:id/deletar').all(auth.config().authenticate()).delete(UsuarioRoutes.deletar);
    }
}

export default new Routes();