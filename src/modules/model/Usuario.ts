import { IUsuario } from "./types/IUsuario";
import Empresa from "./Empresa";

class Usuario implements IUsuario {
    id: number;
    nome: string;
    cpfCnpj: string;
    senha: string;
    perfil: string;
    dataCadastro?: Date;
    ultimoAcesso?: Date;
    inativo?: boolean;
    empresa: Empresa;

    constructor() {}
}

export default Usuario;