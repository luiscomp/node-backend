import Usuario from "../model/Usuario";

class AuthPersistence {
    private lista: Array<Usuario>;

    constructor() {
        this.lista = [{
            id: 1,
            nome: 'Luis Eduardo',
            email: 'luizeduardo354@gmail.com',
            senha: '123456'
        },{
            id: 2,
            nome: 'Thays Ferreira',
            email: 'thaysferreira@gmail.com',
            senha: '654321'
        }]
    }

    autenticar(usuario: Usuario): Promise<Usuario> {
        return new Promise((resolve, reject) => {
            let usuarioRecuperado: Usuario = this.lista.find(u => {
                return u.email === usuario.email && u.senha === usuario.senha;
            });
            
            resolve(usuarioRecuperado);
        })
    }
}

export default AuthPersistence;