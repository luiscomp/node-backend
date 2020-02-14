import { IUsuario } from "./types/IUsuario";

class Usuario implements IUsuario {
    id: number;
    nome: string;    
    email: string;
    senha: string;

    constructor() {}
}

export default Usuario;