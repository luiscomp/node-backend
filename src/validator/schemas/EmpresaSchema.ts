class EmpresaSchema {
    public autenticacao = {
        $id: 'empresa.autenticacao',
        type: 'object',
        required: [ 'codigo' ],
        properties: {
            codigo: { type: 'string', default: null },
        },
        errorMessage: {
            required: {
                codigo: "O atributo 'Empresa.codigo' deve ser informado"
            }
        }
    }

    public gravarRelacionamento = {
        $id: 'empresa.gravarRelacionamento',
        type: 'object',
        required: [ 'id' ],
        properties: {
            id: { type: 'number', default: null }
        },
        errorMessage: {
            required: {
                id: "O atributo 'Empresa.id' deve ser informado",
            }
        }
    }

    public gravar = {
        $id: 'empresa.gravar',
        type: 'object',
        required: [ 'codigo', 'proprietario', 'cpfCnpj', 'nomeEmpresarial', 'nomeFantasia' ],
        properties: {
            id: { type: 'string', default: null },
            codigo: { type: 'string', default: null },
            proprietario: { type: 'string', default: null },
            cpfCnpj: { type: 'string', default: null },
            nomeEmpresarial: { type: 'string', default: null },
            nomeFantasia: { type: 'string', default: null },
            dataCadastro: { type: 'string', default: null },
            inativo: { type: 'string', default: null }
        },
        errorMessage: {
            required: {
                codigo: "O atributo 'Empresa.codigo' deve ser informado",
                proprietario: "O atributo 'Empresa.proprietario' deve ser informado",
                cpfCnpj: "O atributo 'Empresa.cpfCnpj' deve ser informado",
                nomeEmpresarial: "O atributo 'Empresa.nomeEmpresarial' deve ser informado",
                nomeFantasia: "O atributo 'Empresa.nomeFantasia' deve ser informado"
            }
        }
    }

    public atualizar = {
        $id: 'empresa.atualizar',
        type: 'object',
        required: [ 'id', 'codigo', 'proprietario', 'cpfCnpj', 'nomeEmpresarial', 'nomeFantasia' ],
        properties: {
            id: { type: 'string', default: null },
            codigo: { type: 'string', default: null },
            proprietario: { type: 'string', default: null },
            cpfCnpj: { type: 'string', default: null },
            nomeEmpresarial: { type: 'string', default: null },
            nomeFantasia: { type: 'string', default: null },
            dataCadastro: { type: 'string', default: null },
            inativo: { type: 'string', default: null }
        },
        errorMessage: {
            required: {
                id: "O atributo 'Empresa.id' deve ser informado",
                codigo: "O atributo 'Empresa.codigo' deve ser informado",
                proprietario: "O atributo 'Empresa.proprietario' deve ser informado",
                cpfCnpj: "O atributo 'Empresa.cpfCnpj' deve ser informado",
                nomeEmpresarial: "O atributo 'Empresa.nomeEmpresarial' deve ser informado",
                nomeFantasia: "O atributo 'Empresa.nomeFantasia' deve ser informado"
            }
        }
    }
}

export default new EmpresaSchema();