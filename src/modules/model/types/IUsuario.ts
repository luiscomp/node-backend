import { IBase } from "./IBase";
import Empresa from "../Empresa";

export interface IUsuario extends IBase {
    nome: string;
    cpfCnpj: string;
    senha: string;
    perfil: string;
    dataCadastro?: Date;
    ultimoAcesso?: Date;
    inativo?: boolean;
    empresa: Empresa;
}

