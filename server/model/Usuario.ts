import { IBase } from "./Base";

export interface IUsuario extends IBase {
    nome: String,
    email: String,
    senha: String
}

