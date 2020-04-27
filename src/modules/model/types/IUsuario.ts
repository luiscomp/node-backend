import { IBase } from "./IBase";
import PerfilUsuario from "../enums/PerfilUsuario";
import Empresa from "../Empresa";

export interface IUsuario extends IBase {
    nome: string,
    cpfCnpj: string,
    senha: string,
    perfil: PerfilUsuario,
    dataCadastro?: Date,
    ultimoAcesso?: Date,
    inativo?: boolean,
    empresa: Empresa,
}

