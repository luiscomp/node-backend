import { IBase } from "./IBase";

export interface IUsuario extends IBase {
    nome: string,
    email: string,
    senha: string
}

