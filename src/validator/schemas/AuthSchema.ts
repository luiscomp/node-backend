import EmpresaSchema from "./EmpresaSchema";

class AuthSchema {
    public usuario = {
        $id: 'auth.usuario',
        type: 'object',
        required: [ 'cpfCnpj', 'senha', 'empresa' ],
        properties: {
            cpfCnpj: { type: 'string', default: null },
            senha: { type: 'string', default: null },
            empresa: { 
                $ref: 'empresa.autenticacao'
            }
        },
        errorMessage: {
            required: {
                cpfCnpj: "O atributo 'Usuario.cpfCnpj' deve ser informado",
                senha: "O atributo 'Usuario.senha' deve ser informado",
                empresa: "O atributo 'Usuario.empresa' deve ser informado"
            }
        },
        referencias: [ EmpresaSchema.autenticacao ]
    }
}

export default new AuthSchema();