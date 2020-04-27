import { IUsuario } from "./types/IUsuario";
import PerfilUsuario from "./enums/PerfilUsuario";
import Empresa from "./Empresa";

class Usuario implements IUsuario {
    id: number;
    nome: string;
    cpfCnpj: string;
    senha: string;
    perfil: PerfilUsuario;
    dataCadastro?: Date;
    ultimoAcesso?: Date;
    inativo?: boolean;
    empresa: Empresa;

    constructor() {}
}

export default Usuario;