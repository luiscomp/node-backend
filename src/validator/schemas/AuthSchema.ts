class AuthSchema {
    public autenticar = {
        $id: 'Autenticar',
        type: 'object',
        required: [ 'cpfCnpj', 'senha', 'empresa' ],
        properties: {
            cpfCnpj: { type: 'string', default: null },
            senha: { type: 'string', default: null },
            empresa: { type: 'object', default: null }
        },
        errorMessage: {
            required: {
                cpfCnpj: "O atributo 'cpfCnpj' deve ser informado",
                senha: "O atributo 'senha' deve ser informado",
                empresa: "O atributo 'empresa' deve ser informado"
            }
        }
    }
}

export default new AuthSchema();