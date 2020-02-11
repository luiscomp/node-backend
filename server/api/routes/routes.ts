import { Application } from 'express';
import UsuarioRoutes from '../../routes/UsuarioRoutes';
import { validator } from '../../validator/Validator';
import UsuarioSchema from '../../validator/schemas/UsuarioSchema';
import AuthRoutes from '../../routes/AuthRoutes';

class Routes {
    private userRouters: UsuarioRoutes;
    private authRouters: AuthRoutes;
    private auth: any;

    constructor(app: Application, auth: any) {
        this.userRouters = new UsuarioRoutes();
        this.authRouters = new AuthRoutes();
        this.auth = auth;

        this.setAuthRoutes(app);
        this.setUserRoutes(app);
    }
    
    setAuthRoutes(app: Application): void {
        app.route('/api/auth/token').post(this.authRouters.auth);
    }

    setUserRoutes(app: Application): void {
        app.route('/api/usuario/listar/:pagina*?').all(this.auth.authenticate()).post(this.userRouters.listar);
        app.route('/api/usuario/novo').all(this.auth.authenticate()).post(validator(UsuarioSchema.gravar), this.userRouters.novo);
        app.route('/api/usuario/atualizar').all(this.auth.authenticate()).post(validator(UsuarioSchema.atualizar), this.userRouters.atualizar);
        app.route('/api/usuario/:id').all(this.auth.authenticate()).get(this.userRouters.recuperar);
        app.route('/api/usuario/:id/deletar').all(this.auth.authenticate()).delete(this.userRouters.deletar);
    }
}

export default Routes;