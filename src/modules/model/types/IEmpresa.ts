import { IBase } from "./IBase";

export interface IEmpresa extends IBase {
    codigo: string;
    proprietario: string;
    cpfCnpj: string;
    nomeEmpresarial: string;
    nomeFantasia: string;
    dataCadastro: Date;
    inativo: boolean;
}