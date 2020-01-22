import Usuario from "../model/Usuario";

class UsuarioPersistence {
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

    listar(usuario: Usuario, pagina: Number): Promise<Array<Usuario>> {
        return new Promise((resolve, reject) => {
            resolve(this.lista);
        })
    }

    quantidade(usuario: Usuario, pagina: Number): Promise<Number> {
        return new Promise((resolve, reject) => {
            resolve(this.lista.length);
        })
    }

    recuperar(id: Number): Promise<Usuario> {
        return new Promise((resolve, reject) => {
            let usuario: Usuario = this.lista.map(u => {
                if(u.id === id) return u;
            })[0];

            resolve(usuario);
        })
    }
}

export default UsuarioPersistence;