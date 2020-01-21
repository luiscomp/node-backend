import { IUsuario } from "../model/Usuario";

class UsuarioPersistence {
    private lista: Array<IUsuario>;

    constructor() {
        this.lista = [{
            id: 1,
            nome: 'Luis Eduardo',
            email: 'luizeduardo354@gmail.com',
            senha: '123456'
        },{
            id: 1,
            nome: 'Thays Ferreira',
            email: 'thaysferreira@gmail.com',
            senha: '654321'
        }]
    }

    listar(usuario: IUsuario, pagina: Number): Promise<Array<IUsuario>> {
        return new Promise((resolve, reject) => {
            resolve(this.lista);
        })
    }
}

export default UsuarioPersistence;