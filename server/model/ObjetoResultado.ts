import { IObjetoResultado } from "./types/IObjetoResultado";

class ObjetoResultado implements IObjetoResultado {
    status: String;    
    mensagem: String;
    item?: any;
    lista?: any[];
    quantidade?: Number;

    constructor() {}
}

export default ObjetoResultado;