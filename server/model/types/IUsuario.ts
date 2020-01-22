import { IBase } from "./IBase";

export interface IUsuario extends IBase {
    nome: String,
    email: String,
    senha: String
}

