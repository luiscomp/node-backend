import EmpresaSchema from "./EmpresaSchema";

class UsuarioSchema {
    public gravar = {
        $id: 'usuario.gravar',
        type: 'object',
        required: [ 'nome', 'cpfCnpj', 'senha', 'perfil', 'empresa' ],
        properties: {
            id: { type: 'integer', default: null },
            nome: { type: 'string', default: null },
            cpfCnpj: { type: 'string', default: null },
            senha: { type: 'string', default: null },
            perfil: { type: 'string', default: null },
            dataCadastro: { type: 'string', default: null },
            ultimoAcesso: { type: 'string', default: null },
            inativo: { type: 'boolean', default: null },
            empresa: { 
                $ref: 'empresa.gravarRelacionamento'
            }
        },
        errorMessage: {
            required: {
                nome: "O atributo 'nome' deve ser informado",
                cpfCnpj: "O atributo 'cpfCnpj' deve ser informado",
                senha: "O atributo 'senha' deve ser informado",
                perfil: "O atributo 'perfil' deve ser informado",
                empresa: "O atributo 'empresa' deve ser informado"
            }
        },
        referencias: [ EmpresaSchema.gravarRelacionamento ]
    }

    public atualizar = {
        $id: 'usuario.atualizar',
        type: 'object',
        required: [ 'id', 'nome', 'cpfCnpj', 'perfil', 'empresa' ],
        properties: {
            id: { type: 'integer', default: null },
            nome: { type: 'string', default: null },
            cpfCnpj: { type: 'string', default: null },
            senha: { type: 'string', default: null },
            perfil: { type: 'string', default: null },
            dataCadastro: { type: 'string', default: null },
            ultimoAcesso: { type: 'string', default: null },
            inativo: { type: 'boolean', default: null },
            empresa: { 
                $ref: 'empresa.gravarRelacionamento'    
            }
        },
        errorMessage: {
            required: {
                id: "O atributo 'id' deve ser informado",
                nome: "O atributo 'nome' deve ser informado",
                cpfCnpj: "O atributo 'cpfCnpj' deve ser informado",
                perfil: "O atributo 'perfil' deve ser informado",
                empresa: "O atributo 'empresa' deve ser informado"
            }
        },
        referencias: [ EmpresaSchema.gravarRelacionamento ]
    }
}

export default new UsuarioSchema();