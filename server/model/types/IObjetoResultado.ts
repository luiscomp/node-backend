export interface IObjetoResultado {
    status: String,
    mensagem: String,
    erros?: Array<String>
    item?: any,
    lista?: Array<any>,
    quantidade?: Number,
    token?: String;
}