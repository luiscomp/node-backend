import { Application } from 'express';
import UsuarioRoutes from '../../routes/UsuarioRoutes';
import { validator } from '../../validator/Validator';
import UsuarioSchema from '../../validator/schemas/UsuarioSchema';

class Routes {
    private userRouters: UsuarioRoutes;

    constructor(app: Application) {
        this.userRouters = new UsuarioRoutes();
        this.setUserRoutes(app);
    }

    setUserRoutes(app: Application): void {
        app.route('/api/usuario/listar/:pagina*?').post(this.userRouters.listar);
        app.route('/api/usuario/novo').post(validator(UsuarioSchema.gravar), this.userRouters.novo);
        app.route('/api/usuario/atualizar').post(validator(UsuarioSchema.atualizar), this.userRouters.atualizar);
        app.route('/api/usuario/:id').get(this.userRouters.recuperar);
        app.route('/api/usuario/:id/deletar').delete(this.userRouters.deletar);
    }
}

export default Routes;