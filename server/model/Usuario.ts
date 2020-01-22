import { IUsuario } from "./types/IUsuario";

class Usuario implements IUsuario {
    id: Number;
    nome: String;    
    email: String;
    senha: String;

    constructor() {}
}
export default Usuario;