class EmpresaSchema {
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
                codigo: "O atributo 'codigo' deve ser informado",
                proprietario: "O atributo 'proprietario' deve ser informado",
                cpfCnpj: "O atributo 'cpfCnpj' deve ser informado",
                nomeEmpresarial: "O atributo 'nomeEmpresarial' deve ser informado",
                nomeFantasia: "O atributo 'nomeFantasia' deve ser informado"
            }
        }
    }
}

export default EmpresaSchema;