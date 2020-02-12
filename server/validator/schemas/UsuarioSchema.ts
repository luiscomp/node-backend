class UsuarioSchema {
    public gravar = {
        type: 'object',
        required: [ 'nome', 'email', 'senha' ],
        properties: {
            id: { type: 'integer', default: null },
            nome: { type: 'string', default: null },
            email:{ type: 'string', default: null },
            senha:{ type: 'string', default: null }
        },
        errorMessage: {
            required: {
                nome: "O atributo 'nome' deve ser informado",
                email: "O atributo 'email' deve ser informado",
                senha: "O atributo 'senha' deve ser informado"
            }
        }
    }

    public atualizar = {
        type: 'object',
        required: [ 'id', 'nome', 'email', 'senha' ],
        properties: {
            id: { type: 'integer', default: null },
            nome: { type: 'string', default: null },
            email:{ type: 'string', default: null },
            senha:{ type: 'string', default: null }
        },
        errorMessage: {
            required: {
                id: "O atributo 'id' deve ser informado",
                nome: "O atributo 'nome' deve ser informado",
                email: "O atributo 'email' deve ser informado",
                senha: "O atributo 'senha' deve ser informado"
            }
        }
    }
}

export default new UsuarioSchema();