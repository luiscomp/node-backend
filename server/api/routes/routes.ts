import { Application } from 'express';
import UsuarioRoutes from '../../routes/UsuarioRoutes';
import { validator } from '../../validator/Validator';
import UsuarioSchema from '../../validator/schemas/UsuarioSchema';

class Routes {
    private router: UsuarioRoutes;

    constructor(app: Application) {
        this.router = new UsuarioRoutes();
        this.getRoutes(app);
    }

    getRoutes(app: Application): void {
        app.route('/api/usuario/listar/:pagina*?').post(this.router.listar);
        app.route('/api/usuario/novo').post(validator(UsuarioSchema.gravar), this.router.novo);
        app.route('/api/usuario/atualizar').post(validator(UsuarioSchema.atualizar), this.router.atualizar);
        app.route('/api/usuario/:id').get(this.router.recuperar);
        app.route('/api/usuario/:id/deletar').delete(this.router.deletar);
    }
}

export default Routes;