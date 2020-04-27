import { IEmpresa } from "./types/IEmpresa";

class Empresa implements IEmpresa {
    id: number;
    codigo: string;
    proprietario: string;
    cpfCnpj: string;
    nomeEmpresarial: string;
    nomeFantasia: string;
    dataCadastro: Date;
    inativo: boolean;
}

export default Empresa;