import { IObjetoResultado } from "./types/IObjetoResultado";

class ObjetoResultado implements IObjetoResultado {
    status: string;    
    mensagem: string;
    erros?: Array<string>;
    item?: any;
    lista?: any[];
    quantidade?: number;
    token?: string;
}

export default ObjetoResultado;