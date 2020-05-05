import { Application } from 'express';
import { validador } from '../../validator/Validador';
import AuthSchema from '../../validator/schemas/AuthSchema';
import AuthRoutes from '../../modules/routes/AuthRoutes';
import UsuarioSchema from '../../validator/schemas/UsuarioSchema';
import UsuarioRoutes from '../../modules/routes/UsuarioRoutes';
import EmpresaSchema from '../../validator/schemas/EmpresaSchema';
import EmpresaRoutes from '../../modules/routes/EmpresaRoutes';

class Routes {

    public initRoutes(app: Application, auth: any): void {
        this.initAuthRoutes(app);
        this.initUsuarioRoutes(app, auth);
        this.initEmpresaRoutes(app, auth);
    }
    
    private initAuthRoutes(app: Application): void {
        app.route('/api/v1/auth/token').post(validador(AuthSchema.usuario), AuthRoutes.auth);
    }

    private initUsuarioRoutes(app: Application, auth: any): void {
        app.route('/api/v1/usuario/listar/:pagina*?').all(auth.config().authenticate()).post(UsuarioRoutes.listar);
        app.route('/api/v1/usuario/novo').all(auth.config().authenticate()).post(validador(UsuarioSchema.gravar), UsuarioRoutes.novo);
        app.route('/api/v1/usuario/atualizar').all(auth.config().authenticate()).post(validador(UsuarioSchema.atualizar), UsuarioRoutes.atualizar);
        app.route('/api/v1/usuario/:id').all(auth.config().authenticate()).get(UsuarioRoutes.recuperar);
        app.route('/api/v1/usuario/:id/inativar').all(auth.config().authenticate()).post(UsuarioRoutes.inativar);
    }

    private initEmpresaRoutes(app: Application, auth: any): void {
        app.route('/api/v1/empresa/listar/:pagina*?').all(auth.config().authenticate()).post(EmpresaRoutes.listar);
        app.route('/api/v1/empresa/novo').all(auth.config().authenticate()).post(validador(EmpresaSchema.gravar), EmpresaRoutes.novo);
        app.route('/api/v1/empresa/atualizar').all(auth.config().authenticate()).post(validador(EmpresaSchema.atualizar), EmpresaRoutes.atualizar);
        app.route('/api/v1/empresa/:id').all(auth.config().authenticate()).get(EmpresaRoutes.recuperar);
        app.route('/api/v1/empresa/:id/inativar').all(auth.config().authenticate()).post(EmpresaRoutes.inativar);
    }
}

export default new Routes();