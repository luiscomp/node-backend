export interface IObjetoResultado {
    status: string,
    mensagem: string,
    erros?: Array<string>
    item?: any,
    lista?: Array<any>,
    quantidade?: number,
    token?: string;
}