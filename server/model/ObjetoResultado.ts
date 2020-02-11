import { IObjetoResultado } from "./types/IObjetoResultado";

class ObjetoResultado implements IObjetoResultado {
    status: String;    
    mensagem: String;
    erros?: Array<String>;
    item?: any;
    lista?: any[];
    quantidade?: Number;
    token?: String;

    constructor() {}
}

export default ObjetoResultado;