class AuthSchema {
    public autenticar = {
        type: 'object',
        required: [ 'email', 'senha' ],
        properties: {
            email:{ type: 'string', default: null },
            senha:{ type: 'string', default: null }
        },
        errorMessage: {
            required: {
                email: "O atributo 'email' deve ser informado",
                senha: "O atributo 'senha' deve ser informado"
            }
        }
    }
}

export default new AuthSchema();