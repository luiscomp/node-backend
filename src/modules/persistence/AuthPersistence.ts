import Usuario from "../model/Usuario";
import PersistenceUtils from '../../utils/PersistenceUtils';

const CAMPOS = `Usuario.id, Usuario.nome, Usuario.cpfCnpj, Usuario.senha, Usuario.perfil, Usuario.dataCadastro, Usuario.ultimoAcesso, Usuario.idEmpresa`;
const SELECT = `SELECT ${CAMPOS} FROM Usuario`;

class AuthPersistence extends PersistenceUtils {
    private conexao: any;

    constructor(conexao: any) {
        super()
        this.conexao = conexao;
    }

    autenticar(usuario: Usuario): Promise<Usuario> {
        return new Promise(async (resolve, reject) => {
            let results: Array<Usuario>;
            let sql: string = SELECT;

            sql = sql.concat(` JOIN Empresa ON Empresa.id = Usuario.idEmpresa `)

            sql = this.incluirClausulaNoWhereAND(sql, ' Usuario.cpfCnpj = ? ');
            sql = this.incluirClausulaNoWhereAND(sql, ' Usuario.senha = ? ');
            sql = this.incluirClausulaNoWhereAND(sql, ' Empresa.codigo = ? ');

            try {
                results = await this.conexao.query(sql, [ usuario.cpfCnpj, usuario.senha, usuario.empresa.codigo ]);
                resolve(results[0]);
            } catch(error) {
                reject(error.sqlMessage);
            }
        })
    }
}

export default AuthPersistence;